<template>
  <div class="lg:w-[22%] border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
    <div>
      <button class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue">
        <i class="fab fa-twitter"></i>
      </button>
      <div>
        <button v-for="tab in tabs" @click="id = tab.id" :key=tab.id :class="`focus:outline-none flex items-center py-1 px-4 font-normal hover:bg-lighter 
        rounded-full mr-auto mb-3 ${ id === tab.id ? 'font-extrabold' : ''}`">
          <i :class="`${ tab.icon } ${ id === tab.id ? 'font-bold' : ''} text-2xl mr-4 text-left`"></i>
          <p class="text-xl text-left hidden lg:block"> {{ tab.title }} </p>
        </button>
      </div>
      <button class="text-white bg-blue rounded-full font-bold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 px-5 hover:bg-darkblue">
        <p class="hidden lg:block">Tweet</p>
        <i class="fas fa-plus lg:hidden"></i>
      </button>
    </div>
    <div class="lg:w-full relative">
      <button @click="dropdown = true" class="flex items-center w-full hover:bg-lighter rounded-full p-5 focus:outline-none">
        <img src="display-picture.png" class="w-10 h-10 rounded-full border border-lighter" />
        <div class="hidden lg:block ml-4">
          <!-- make this dynamic for logged in user -->
          <p class="text-sm font-bold leading-tight"> Kunark Khewal </p>
          <p class="text-sm leading-tight"> @kunarkkhewal </p>
        </div>
        <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
      </button>
      <div v-if="dropdown === true" class="absolute bottom-5 left-0 w-64 rounded-lg shadow-xl border-2 border-lightest bg-white mb-16">
        <button @click="dropdown = false" class="p-3 flex items-center w-full p-2 focus:outline-none">
          <img src="display-picture.png" class="w-10 h-10 rounded-full border border-lighter" />
          <div class="ml-4 cursor-default">
            <!-- make this dynamic -->
            <p class="text-sm font-bold leading-tight"> Kunark Khewal </p>
            <p class="text-sm leading-tight"> @kunarkkhewal </p>
          </div>
          <i class="fas fa-check ml-auto text-blue"></i>
        </button>
        <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 focus:outline-none">
          Add an existing account
        </button>
        <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 focus:outline-none">
          <!-- make dynamic -->
          Log out @kunarkkhewal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideNav',
  data() {
    return {
      tabs: [
        {icon: 'fas fa-home', title: 'Home', id:'home'},
        {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
        {icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
        {icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
        {icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
        {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
        {icon: 'far fa-user', title: 'Profile', id: 'profile'},
        {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
      ],
      id: 'home',
      dropdown: false,
    }
  }
}
</script>
