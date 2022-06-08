<template>
  <div class="pb-10 md:pb-3 px-1 md:px-5 py-3 border-b border-lighter flex">
    <div class="flex-none">
      <router-link :to="`/profile/${$store.state.loggedInUser}`"><img src="../assets/display-picture.png" class="flex-none w-12 h-12 rounded-full border border-lighter"/></router-link>
    </div>
    <form @submit.prevent = "addNewTweet" class="w-full px-4 relative">
      <textarea ref="input" v-model="tweet.content" @keypress="isTweeting" @keyup.delete="isTweeting" placeholder="What's happening?" 
        class="mt-3 w-full pb-1 resize-none focus:outline-none placeholder:text-dark placeholder:text-xl"/>
      <p class="-mt-2 pb-3 pl-1 border-b border-lighter text-sm font-bold text-blue"><i class="pr-2 fas fa-globe-americas"></i>Everyone can reply</p>
      <div class="pt-2 flex items-center">
        <i v-for="icon in icons" :key=icon.id :class="`text-lg text-blue p-2 px-3 rounded-full cursor-pointer ${icon.icon} hover:bg-lightblue`"></i>
      </div>
      <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute -bottom-8 md:bottom-0 right-6 md:right-0 disabled:bg-blue/50" :disabled="tweetDisabled">
        Tweet
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'TweetSection',
    emits: ['tweetmade'],
    data() {
      return {
        icons: this.$store.state.icons,
        tweetDisabled: true,
        tweet: {content: ''}
      }
    },
    mounted() {
      this.$refs.input.focus()
    },
    methods: {
      isTweeting () {
        if (this.tweet.content) {
          this.tweetDisabled = false;
        } else {
          this.tweetDisabled = true;
        }
      },
      addNewTweet () {
        let newTweet = {
          content: this.tweet.content,
        };
        this.tweet.content = '';
        this.$store.dispatch('addTweet', newTweet)
        this.tweetDisabled = true;
        this.$emit('tweetmade');
      },
    }
  }
</script>