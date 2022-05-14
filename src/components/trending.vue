<template>
  <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
    <input class="pl-12 rounded-full w-full p-2 bg-lighter placeholder:text-dark placeholder:font-normal mb-4" placeholder="Search Twitter" />
    <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-dark"></i>
    
    <div class="w-full rounded-lg bg-lightest">
      <p class="p-3 text-xl font-bold">What's happening</p>
      <button v-for="trend in trending" :key=trend class="w-full flex justify-between hover:bg-lighter p-3">
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

    <div class="w-full rounded-lg bg-lightest my-4">
      <p class="p-3 text-xl font-bold">Who to Follow</p>
      <button v-for="friend in friends" :key=friend class="w-full flex hover:bg-lighter p-3">
        <img :src="`${ friend.src }`" class="w-12 h-12 rounded-full border border-lighter" />
        <div class="hidden lg:block ml-4">
          <p class="text-md font-semibold leading-tight"> {{ friend.name }} </p>
          <p class="text-md text-dark leading-tight"> {{ friend.handle }} </p>
        </div>
        <button class="ml-auto text-sm text-white font-medium bg-black py-1 px-4 rounded-full">
          Follow
        </button>
      </button>
      <button class="p-3 w-full hover:bg-lighter text-left text-blue rounded-b-lg">
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
        trending: [
          {top: 'Trending in TX', title: 'Gigi', bottom: 'Trending with: Rip Gigi'},
          {top: 'Music', title: 'We Won', bottom: '135K Tweets'},
          {top: 'Pop', title: 'Blue Ivy', bottom: '40k tweets'},
          {top: 'Trending in US', title: 'Denim Day', bottom: '40k tweets'},
          {top: 'Trending', title: 'When Beyonce', bottom: '25.4k tweets'},
        ],
        friends: [
          {src: 'display-picture.png', name: 'Elon Musk', handle: '@teslaBoy'},
          {src: 'display-picture.png', name: 'Adrian Monk', handle: '@detective:)'},
          {src: 'display-picture.png', name: 'Kevin Hart', handle: '@miniRock'}
        ],
      }
    }
  }
</script>