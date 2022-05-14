<template>
  <div class="flex container mx-auto h-screen w-full">
    <Sidenav />
    <ProfilePage />
    <TrendingPage />
  </div>
</template>

<script>
// @ is an alias to /src
import ProfilePage from '@/components/profilepage.vue';
import Sidenav from '../components/sidenav.vue';
import TrendingPage from '../components/trending.vue'

export default {
  name: 'HomeView',
  components: {
    ProfilePage,
    Sidenav,
    TrendingPage
}
}
</script>
