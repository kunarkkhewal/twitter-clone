<template>
  <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
    <input class="pl-12 rounded-full w-full p-2 bg-lighter placeholder:text-dark placeholder:font-normal mb-4" placeholder="Search Twitter" />
    <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-dark"></i>
    
    <div class="w-full rounded-lg bg-lightest">
      <p class="p-3 text-xl font-bold">What's happening</p>
      <button v-for="trend in trending" :key=trend.top class="w-full flex justify-between hover:bg-lighter p-3">
        <div>
          <p class="text-xs text-left leading-tight text-dark"> {{ trend.top}} </p>
          <p class="text-sm text-left font-bold leading-tight"> {{ trend.title}} </p>
          <p class="text-sm text-left leading-tight text-dark"> {{ trend.bottom}} </p>
        </div>
        <i class="fas fa-ellipsis-h text-dark ml-auto cursor-pointer p-2 rounded-full hover:bg-blue/20 hover:text-blue"></i>
      </button>
      <button class="p-3 w-full text-left text-blue hover:bg-lighter rounded-b-lg">
        Show More
      </button>
    </div>

    <div v-if="getNotFollowedUsers.length" class="w-full rounded-lg bg-lightest my-4">
      <p class="p-3 text-xl font-bold">Who to Follow</p>
      <button v-for="user in getNotFollowedUsers" :key=user.id class="w-full flex hover:bg-lighter p-3">
        <img src="../assets/display-picture.png" class="w-12 h-12 rounded-full border border-lighter" />
        <div class="hidden lg:block ml-4">
          <p class="text-md font-semibold leading-tight"> {{user.name}} </p>
          <p class="text-md text-dark leading-tight"> {{user.username}} </p>
        </div>
        <button @click="followUser(user.id)" class="rounded-full text-sm text-white font-medium ml-auto px-4 py-1 bg-black hover:bg-dark">Follow</button>
      </button>
      <button @click="seeMoreUser()" class="p-3 w-full hover:bg-lighter text-left text-blue rounded-b-lg">
        Show More
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TrendingPage',
    data() {
      return {
        trending: this.$store.state.trending
      }
    },
    mounted () {
      this.$store.dispatch('getNotFollowingUsers');
    },
    methods: {
      seeMoreUser() {
        this.$store.dispatch('getNotFollowingUsers');
      },
      followUser(userid) {
        this.$store.dispatch('followUser', {userid, profilePage: false});
      }
    },
    computed: {
      getNotFollowedUsers() {
        return this.$store.state.notFollowingUsers;
      }
    }
  }
</script>