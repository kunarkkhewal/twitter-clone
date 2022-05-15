<template>
  <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="px-5 py-3 flex items-center justify-start">
      <router-link to='/'><i class="fas fa-arrow-left text-xl text-black hover:bg-lighter py-1 px-2 rounded-full"></i></router-link>
      <div class="ml-5">
        <h1 class="text-xl font-bold">{{userInfo.name}}</h1>
        <p class="text-sm text-dark font-normal">{{tweets.length}} Tweets</p>
      </div>
    </div>
    <div class="py-3 border-b border-lighter flex flex-col relative">
      <div class="h-32 bg-green-900 after:content-['']">
      </div>
      <div class="flex justify-end h-48 p-4">
        <div class="absolute top-20 left-8">
          <img src="../assets/display-picture.png" class="flex-none w-28 h-28 mb-4 rounded-full border-4 border-white"/>
          <p class="text-xl font-bold">{{userInfo.name}}</p>
          <p class="text-md text-dark font-normal mb-2">@{{$route.params.username}}</p>
          <p class="text-dark font-medium">
            <span><i class="fas fa-map-marker-alt"></i> {{userInfo.location}}</span> 
            <span class="ml-4"><i class="fas fa-calendar-alt"></i> Joined {{userInfo.joined}}</span>
          </p>
          <p class="text-dark">
            <span><span class="text-black font-semibold">{{following.length}}</span> Following</span> 
            <span class="ml-4"><span class="text-black font-semibold">{{followers.length}}</span> Followers</span>
          </p>
        </div>
        <div>
          <button v-if='!differentUser' class="border border-light rounded-full text-black font-medium px-3 py-1 hover:bg-light">Edit Profile</button>
          <button v-if='differentUser' class="border border-light rounded-full text-black font-medium px-3 py-1 hover:bg-light">Follow</button>
        </div>
      </div>
    </div>
    <!-- need to see for col-reverse -->
    <div class="flex flex-col-reverse"> 
      <!-- {{tweets}} -->
      <div v-for="tweet in tweets" :key=tweet.timestamp class="w-full p-4 border-b hover:bg-lightest flex">
        <div class="mr-4">
          <!-- todo: dp -->
          <img src="../assets/display-picture.png" class="h-12 w-12 rounded-full"/>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <!-- make this all dynamic -->
            <p class="font-semibold"> {{userInfo.name}} </p>
            <p class="text-sm text-dark ml-2"> @{{$route.params.username}} </p>
            <p class="text-sm text-dark ml-2"><span class="mr-1 font-extrabold">.</span> {{moment(tweet.timestamp).fromNow()}} </p>
            <i class="fas fa-ellipsis-h text-dark ml-auto cursor-pointer p-2 rounded-full hover:bg-blue/20 hover:text-blue"></i>
          </div>
          <p class="py">
            {{ tweet.content }}
          </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark   cursor-pointer -ml-2 hover:text-blue">
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
            <div class="flex items-center text-sm text-dark   cursor-pointer -ml-2 hover:text-blue">
              <i class="fas fa-share-square mr-1 p-2 rounded-full hover:bg-blue/20"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'ProfilePage',
    components: {
    },
    data() {
      return {
        moment: moment,
        differentUser: this.$route.params.username !== this.$store.state.loggedInUser,
        userInfo: this.$store.getters.getUserInfo(this.$route.params.username),
        tweets: this.$store.getters.getUserTweets(this.$route.params.username),
        following: this.$store.getters.getFollowing(this.$route.params.username),
        followers: this.$store.getters.getFollowers(this.$route.params.username),
      }
    },
    methods: {
    }
  }
</script>