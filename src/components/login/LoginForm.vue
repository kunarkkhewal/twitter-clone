<template>
  <div class="bg-neutral-400 md:min-h-screen md:py-8">
    <div class="flex flex-col justify-center md:border md:rounded-xl min-w-full md:max-w-min md:min-w-[600px] m-auto bg-white py-3 px-2">
      <!-- header -->
      <div class="text-center flex flex-row w-[400px]">
        <div @click="$emit('changeComponent', 'LoginMainPage')" class="w-[40%] md:w-[70%] pl-2 text-left"><button class="w-8 h-8"><i class="fas fa-times text-2xl"></i></button></div>
        <i class="fab fa-twitter h-12 w-12 text-3xl text-blue"></i>
      </div>

      <form @submit.prevent="loginUser">
        <!-- main -->
        <div class="px-4 md:px-20 text-center m-auto my-12 md:my-6 overflow-y-scroll h-[50%]">
          <h2 class="text-3xl font-bold mb-4 text-left">Enter your password</h2>
          <input class="rounded-sm w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-light" type="text" :placeholder="username" disabled> 
          <input @keypress="isLoggingIn" @keyup.delete="isLoggingIn" class="border border-lighter rounded-sm w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" type="password"
            v-model="password" ref="input" placeholder="Password">
          <button class="text-blue text-sm font-normal text-left flex hover:underline">Forgot password?</button>
        </div>

        <!-- footer -->
        <div class="w-full text-left m-auto my-6 mt-16">
          <button @click="loginUser" class="block w-full md:w-96 rounded-full m-auto my-2 py-4 bg-black text-white font-bold text-md hover:bg-gray-900 disabled:bg-dark" 
            :disabled="loginDisabled">
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import swal from 'sweetalert';
  import axios from 'axios';

  export default {
    name: 'LoginFormPage',
    props: [
      'username'
    ],
    emits: ['changeComponent'],
    data() {
      return {
        password: '',
        loginDisabled: true
      };
    },
    mounted() {
      this.$refs.input.focus()
    },
    methods: {
      isLoggingIn () {
        if (this.password) {
          this.loginDisabled = false;
        } else {
          this.loginDisabled = true;
        }
      },
      async loginUser () {
        const user = await axios.get(`${this.$store.state.server_host}/user/username/${this.username}`);
        if (user.data && user.data.username) {
          const userPassword = user.data.password;
          if (userPassword !== '' && userPassword === this.password) {
            this.$store.dispatch('login', {username: this.username, userData: user.data});
          } else {
            this.password = '';
            this.loginDisabled = true;
            this.$emit('changeComponent', 'LoginMainPage');
            swal("", "Incorrect Username and Password", "error");
          }
        } else {
          this.password = '';
          this.loginDisabled = true;
          this.$emit('changeComponent', 'LoginMainPage');
          swal("", "Incorrect Username and Password", "error");
        }
      }
    }
  }
</script>