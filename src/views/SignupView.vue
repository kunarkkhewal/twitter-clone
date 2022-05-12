<template>
  <component :is=componentToShow v-on:changeComponent = this.changeComponent></component>
</template>

<script>
  import SignupMainPage from '../components/signup/SignupMain.vue';
  import SignupFormPage from '../components/signup/SignupForm.vue';
  export default {
    name: 'SignupPage',
    components: {
      SignupMainPage,
      SignupFormPage
    },
    data() {
      return {
        componentToShow: 'SignupMainPage'
      };
    },
    methods: {
      changeComponent(value) {
        this.componentToShow = value;
      }
    }
  }
</script>
