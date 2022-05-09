<template>
  <div class="flex">
    <Sidenav />
    <HomePage msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/homepage.vue'
import Sidenav from '../components/sidenav.vue'

export default {
  name: 'HomeView',
  components: {
    HomePage,
    Sidenav
}
}
</script>
