<template>
  <div
    class="lg:w-[22%] border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between"
  >
    <div>
      <button
        class="h-12 w-12 hover:bg-lightblue text-3xl border-0 rounded-full text-blue"
      >
        <i class="fab fa-twitter"></i>
      </button>
      <div class="flex flex-col justify-between">
        <button
          v-for="tab in tabs"
          @click="id = tab.id"
          :key="tab.id"
          :title="tab.title"
        >
          <router-link
            :to="
              tab.id === 'profile'
                ? `/profile/${$store.state.loggedInUser}`
                : '/'
            "
            :class="`focus:outline-none flex items-center py-1 px-4 font-normal hover:bg-lighter 
            rounded-full mr-auto mb-3 ${id === tab.id ? 'font-extrabold' : ''}`"
          >
            <i
              :class="`${tab.icon} ${
                id === tab.id ? 'font-bold' : ''
              } text-2xl mr-4 text-left`"
            ></i>
            <p class="text-xl text-left hidden lg:block">{{ tab.title }}</p>
          </router-link>
        </button>
      </div>
      <div
        v-if="tweetClicked"
        class="z-10 fixed inset-0 w-full h-screen flex items-center justify-center bg-dark/50"
      >
        <div
          class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8"
        >
          <div @click="tweetClicked = false" class="absolute top-0 left-0">
            <button class="w-8 h-8">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          <TweetSection @tweetmade="tweetClicked = false" />
        </div>
      </div>
      <button
        @click="tweetClicked = true"
        class="text-white bg-blue rounded-full font-bold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 px-5 hover:bg-darkblue"
      >
        <p class="hidden lg:block">Tweet</p>
        <i class="fas fa-plus lg:hidden"></i>
      </button>
    </div>
    <div class="lg:w-full relative">
      <button
        @click="dropdown = true"
        class="flex items-center w-full hover:bg-lighter rounded-full p-5 focus:outline-none"
      >
        <img
          src="../assets/display-picture.png"
          class="w-10 h-10 rounded-full border border-lighter"
        />
        <div class="hidden lg:block ml-4">
          <p class="text-sm font-bold leading-tight">{{ userInfo.name }}</p>
          <p class="text-sm leading-tight">@{{ $store.state.loggedInUser }}</p>
        </div>
        <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
      </button>
      <div
        v-if="dropdown === true"
        class="absolute bottom-5 left-0 w-64 rounded-lg shadow-xl border-2 border-lightest bg-white mb-16"
      >
        <button
          @click="dropdown = false"
          class="p-3 flex items-center w-full p-2 focus:outline-none"
        >
          <img
            src="../assets/display-picture.png"
            class="w-10 h-10 rounded-full border border-lighter"
          />
          <div class="ml-4 cursor-default">
            <p class="text-sm font-bold leading-tight">{{ userInfo.name }}</p>
            <p class="text-sm leading-tight">
              @{{ $store.state.loggedInUser }}
            </p>
          </div>
          <i class="fas fa-check ml-auto text-blue"></i>
        </button>
        <button
          @click="dropdown = false"
          class="w-full text-left hover:bg-lightest border-t border-lighter p-3 focus:outline-none"
        >
          Add an existing account
        </button>
        <button
          @click="logout"
          class="w-full text-left hover:bg-lightest border-t border-lighter p-3 focus:outline-none"
        >
          Log out@{{ $store.state.loggedInUser }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import TweetSection from "../components/tweet.vue";

  export default {
    name: "SideNav",
    components: {
      TweetSection,
    },
    data() {
      return {
        tabs: this.$store.state.tabs,
        id: "home",
        dropdown: false,
        userInfo: this.$store.getters.getUserInfo(this.$store.state.loggedInUser),
        tweetClicked: false,
      };
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      },
    },
  };
</script>
