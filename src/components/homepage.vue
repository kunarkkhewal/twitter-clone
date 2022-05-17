<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="px-5 py-3 flex items-center justify-between">
      <h1 class="text-xl font-bold">Home</h1>
      <i class="far fa-star text-xl text-blue hover:bg-lighter py-1 px-2 rounded-full"></i>
    </div>
    <div class="pb-10 md:pb-3 px-5 py-3 border-b border-lighter flex">
      <div class="flex-none">
        <router-link :to="`/profile/${$store.state.loggedInUser}`"><img src="display-picture.png" class="flex-none w-12 h-12 rounded-full border border-lighter"/></router-link>
      </div>
      <form @submit.prevent = "addNewTweet" class="w-full px-4 relative">
        <textarea v-model="tweet.content" @keypress="isTweeting" @keyup.delete="isTweeting" placeholder="What's happening?" 
          class="mt-3 w-full pb-1 resize-none focus:outline-none placeholder:text-dark placeholder:text-xl"/>
        <p class="-mt-2 pb-3 pl-1 border-b border-lighter text-sm font-bold text-blue"><i class="pr-2 fas fa-globe-americas"></i>Everyone can reply</p>
        <div class="pt-2 flex items-center">
          <i v-for="icon in icons" :key=icon.id :class="`text-lg text-blue p-2 px-3 rounded-full cursor-pointer ${icon.icon} hover:bg-lightblue`"></i>
        </div>
        <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute -bottom-8 md:bottom-0 right-0 disabled:bg-blue/50" :disabled="tweetDisabled">
          Tweet
        </button>
      </form>
    </div>
    <div v-for="tweet in tweets" :key=tweet.timestamp class="w-full p-4 border-b hover:bg-lightest flex">
      <div class="mr-4">
        <router-link :to="`/profile/${tweet.username}`">
          <img src="display-picture.png" class="h-12 w-12 rounded-full"/>
        </router-link>
      </div>
      <div class="w-full">
        <div class="flex items-center w-full">
          <p class="font-semibold"> {{ tweet.name }} </p>
          <p class="text-sm text-dark ml-2"> @{{ tweet.username }} </p>
          <p class="text-sm text-dark ml-2"><span class="mr-1 font-extrabold">.</span> {{ moment(tweet.timestamp).fromNow() }} </p>
          <i class="fas fa-ellipsis-h text-dark ml-auto cursor-pointer p-2 rounded-full hover:bg-blue/20 hover:text-blue"></i>
        </div>
        <p class="py">
          {{ tweet.content }}
        </p>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center text-sm text-dark cursor-pointer -ml-2 hover:text-blue">
            <i class="far fa-comment mr-1 p-2 rounded-full hover:bg-blue/20"></i>
            <p> 0 </p>
          </div>
          <div class="flex items-center text-sm text-dark cursor-pointer -ml-2 hover:text-green-500">
            <i class="fas fa-retweet mr-1 p-2 rounded-full hover:bg-green-500/20"></i>
            <p> 0 </p>
          </div>
          <div class="flex items-center text-sm text-dark cursor-pointer -ml-2 hover:text-rose-500">
            <i class="fas fa-heart mr-1 p-2 rounded-full hover:bg-rose-500/20"></i>
            <p> 0 </p>
          </div>
          <div class="flex items-center text-sm text-dark cursor-pointer -ml-2 hover:text-blue">
            <i class="fas fa-share-square mr-1 p-2 rounded-full hover:bg-blue/20"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    name: 'HomePage',
    components: {
    },
    data() {
      return {
        moment: moment,
        icons: this.$store.state.icons,
        tweetDisabled: true,
        tweet: {content: ''}
      }
    },
    methods: {
      isTweeting () {
        if (this.tweet.content) {
          this.tweetDisabled = false;
        } else {
          this.tweetDisabled = true;
        }
      },
      updateFeed() {
        this.tweets = this.$store.getters.getFeed.sort((a,b) => {return b.timestamp - a.timestamp});
      },
      addNewTweet () {
        let newTweet = {
          content: this.tweet.content,
          timestamp: moment().valueOf()
        };
        this.tweet.content = '';
        this.$store.commit('addTweet', newTweet)
        this.tweetDisabled = true;
        this.updateFeed()
      },
      sortedTweets (tweets) {
        return tweets.sort((a,b) => {return b.timestamp - a.timestamp});
      }
    },
    computed: {
      tweets() {
        let tweets = this.$store.getters.getFeed 
          ? this.sortedTweets(this.$store.getters.getFeed) 
          : [];
        return tweets;
      }
    }
  }
</script>