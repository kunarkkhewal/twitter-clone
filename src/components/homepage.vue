<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="px-5 py-3 flex items-center justify-between">
      <h1 class="text-xl font-bold">Home</h1>
      <i class="far fa-star text-xl text-blue hover:bg-lighter py-1 px-2 rounded-full"></i>
    </div>
    <div class="px-5 py-3 border-b border-lighter flex">
      <div class="flex-none">
        <img src="display-picture.png" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
      </div>
      <form v-on:submit.prevent = "addNewTweet" class="w-full px-4 relative">
        <textarea v-model="tweet.content" placeholder="What's happening?" 
          class="mt-3 w-full pb-1 resize-none focus:outline-none placeholder:text-dark placeholder:text-xl"/>
        <p class="-mt-2 pb-3 pl-1 border-b border-lighter text-sm font-bold text-blue"><i class="pr-2 fas fa-globe-americas"></i>Everyone can reply</p>
        <div class="pt-2 flex items-center">
          <i v-for="icon in icons" :key=icon.id :class="`text-lg text-blue p-2 px-3 rounded-full cursor-pointer ${icon.icon} hover:bg-lightblue`"></i>
        </div>
        <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0">
          Tweet
        </button>
      </form>
    </div>
    <div v-for="follow in following" :key=follow.handle class="w-full p-4 border-b hover:bg-lightest flex">
      <div class="mr-4">
        <img :src="`${follow.src}`" class="h-12 w-12 rounded-full"/>
      </div>
      <div class="w-full">
        <div class="flex items-center w-full">
          <p class="font-semibold"> {{ follow.name }} </p>
          <p class="text-sm text-dark ml-2"> {{ follow.handle }} </p>
          <p class="text-sm text-dark ml-2"><span class="mr-1 font-extrabold">.</span> {{ follow.time }} </p>
          <i class="fas fa-ellipsis-h text-dark ml-auto cursor-pointer p-2 rounded-full hover:bg-blue/20 hover:text-blue"></i>
        </div>
        <p class="py">
          {{ follow.tweet }}
        </p>
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center text-sm text-dark cursor-pointer -ml-2 hover:text-blue">
            <i class="far fa-comment mr-1 p-2 rounded-full hover:bg-blue/20"></i>
            <p> {{ follow.comments }} </p>
          </div>
          <div class="flex items-center text-sm text-dark cursor-pointer -ml-2 hover:text-green-500">
            <i class="fas fa-retweet mr-1 p-2 rounded-full hover:bg-green-500/20"></i>
            <p> {{ follow.retweets }} </p>
          </div>
          <div class="flex items-center text-sm text-dark cursor-pointer -ml-2 hover:text-rose-500">
            <i class="fas fa-heart mr-1 p-2 rounded-full hover:bg-rose-500/20"></i>
            <p> {{ follow.like }} </p>
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
export default {
  name: 'HomePage',
  components: {
  },
  data() {
    return {
      icons: [
        {icon: 'far fa-image', id:'image'},
        {icon: 'fas fa-poll-h', id: 'poll'},
        {icon: 'far fa-smile', id: 'smile'},
        {icon: 'fas fa-calendar-alt', id: 'calendar'},
        {icon: 'fas fa-map-marker-alt', id: 'marker'}
      ],
      following: [
        {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '20 min', tweet: 'Should I just quarantine on mars??', comments: '1,000', retweets: '550', like: '1,000,003'},
        {src: 'display-picture.png', name: 'Kevin Hart', handle: '@miniRock', time: '55 min', tweet: 'Should me and the rock do another sub-par movie together????', comments: '2,030', retweets: '50', like: '20,003'},
        {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Haha just made a flame thrower. Shld I sell them?', comments: '100,000', retweets: '1,000,002', like: '5,000,003'},
        {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy', time: '1.4 hr', tweet: 'Just did something crazyyyyyyy', comments: '100,500', retweets: '1,000,032', like: '5,000,103'}
      ],
      tweets: [
        {content: 'It is so nice outside!'}
      ],
      tweet: {content: ''}
    }
  },
  methods: {
    addNewTweet () {
      let newTweet = {
        content: this.tweet.content
      };
      this.tweet.content = '';
      this.tweets.push (newTweet)
    }
  }
}
</script>