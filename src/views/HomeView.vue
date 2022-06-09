<template>
  <div class="flex container mx-auto h-screen w-full">
    <Sidenav />
    <HomePage />
    <TrendingPage />
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/homepage.vue';
import Sidenav from '../components/sidenav.vue';
import TrendingPage from '../components/trending.vue'

export default {
  name: 'HomeView',
  components: {
    HomePage,
    Sidenav,
    TrendingPage
  }
}
</script>
