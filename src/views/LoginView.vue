<template>
  <component :is=componentToShow 
    @changeComponent = this.changeComponent
    @updateUserName = this.updateUserName
    :username="username"
  ></component>
</template>

<script>
  import LoginMainPage from '../components/login/LoginMain.vue';
  import LoginFormPage from '../components/login/LoginForm.vue';
  export default {
    name: 'LoginPage',
    components: {
      LoginMainPage,
      LoginFormPage
    },
    data() {
      return {
        componentToShow: 'LoginMainPage',
        username: ''
      };
    },
    methods: {
      changeComponent(value) {
        this.componentToShow = value;
      },
      updateUserName(value) {
        this.username = value;
      }
    }
  }
</script>
