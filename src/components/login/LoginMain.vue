<template>
  <div class="bg-neutral-400 md:min-h-screen md:py-8">
    <div class="flex flex-col justify-center md:border md:rounded-xl  min-w-full md:max-w-min min-h-min md:min-w-[600px] m-auto bg-white py-3 px-2">
      <!-- header -->
      <div class="text-center flex flex-row w-[400px]">
        <div class="w-[40%] md:w-[70%] pl-2 text-left"><button class="w-8 h-8"><i class="fas fa-times text-2xl"></i></button></div>
        <i class="fab fa-twitter h-12 w-12 text-3xl text-blue"></i>
      </div>

      <!-- main -->
      <div class="w-72 text-center m-auto my-12 md:my-6">
        <h2 class="text-3xl font-bold">Sign in to Twitter</h2>
        <button class="block w-full border rounded-full border-slate-300 my-4 py-1 hover:bg-emerald-50/30">Sign in with Google</button>
        <button class="block w-full border rounded-full border-slate-300 my-2 py-1 hover:bg-stone-300 font-bold">Sign in with Apple</button>
        <div class="relative">
          <hr class="my-6">
          <span class="absolute -top-3.5 left-[45%] px-2 bg-white">or</span>
        </div>
        <form>
          <input @keypress="isLoggingIn" @keyup.delete="isLoggingIn" @blur="$emit('updateUserName', username)" class="border border-slate-300 rounded-md w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-dark 
          focus:outline-none focus:border-blue focus:border-2 focus:placeholder:text-blue focus:mb-1.5" type="text" v-model="username" placeholder="Phone, email or username">
          <button @click="$emit('changeComponent', 'LoginFormPage')" class="block w-full rounded-full my-2 py-2 bg-black text-white font-bold
          text-md hover:bg-gray-900 disabled:bg-dark" :disabled="loginDisabled">Next</button>
        </form>
        <button class="block w-full border rounded-full border-slate-300 my-4 py-2 hover:bg-stone-300 font-bold">Forgot password?</button>
      </div>

      <!-- footer -->
      <div class="w-72 text-left m-auto my-6">
        <h3 class="text-dark">Don't have an account? <router-link class="text-blue hover:underline hover:underline-offset-1" to="/signup">Sign up</router-link></h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginMainPage',
    data() {
      return {
        username: '',
        loginDisabled: true
      };
    },
    methods: {
      isLoggingIn () {
        if (this.username) {
          this.loginDisabled = false;
        } else {
          this.loginDisabled = true;
        }
      }
    }
  }
</script>