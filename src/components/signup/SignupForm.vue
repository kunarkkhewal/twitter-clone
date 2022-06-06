<template>
  <div class="bg-neutral-400 md:min-h-screen md:py-8">
    <div class="flex flex-col justify-center md:border md:rounded-xl min-w-full md:max-w-min md:min-w-[600px] m-auto bg-white py-3 px-2">
      <!-- header -->
      <div class="text-center flex flex-row w-[400px]">
        <div @click="$emit('changeComponent', 'SignupMainPage')" class="w-[40%] md:w-[70%] pl-2 text-left"><button class="w-8 h-8"><i class="fas fa-times text-2xl"></i></button></div>
        <i class="fab fa-twitter h-12 w-12 text-3xl text-blue"></i>
      </div>

      <form @submit.prevent="createUser">
        <!-- main -->
        <div class="px-4 md:px-20 text-center m-auto my-12 md:my-6 overflow-y-scroll h-[50%]">
          <h2 class="text-3xl font-bold mb-4 text-left">Create your account</h2>
          <input @keypress="isSigningUp" @keyup.delete="isSigningUp" v-model="userInfo.name" ref="input" class="border border-slate-300 rounded-md w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" type="text" placeholder="Name">
          <input @keypress="isSigningUp" @keyup.delete="isSigningUp" @blur='checkUserExists' v-model="userInfo.username" :class="`border border-slate-300 rounded-md w-full ${!ifUserExists ? 'mb-2 focus:mb-1.5' : 'mb-0 focus:mb-0 focus:border-rose-500/90 focus:placeholder:text-rose-500'} py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500`" type="text" placeholder="Username">
          <label v-if="ifUserExists" class="block text-left text-sm text-rose-500 mb-2 focus:mb-1.5">username already exists</label>
          <select @change="isSigningUp" class="border border-slate-300 rounded-md w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" v-model="userInfo.location">
            <option value="" selected disabled hidden>Choose Location</option>
            <option v-for="location in locations" :key="location" :value="location"> {{location}}</option>
          </select>
          <input @keypress="isSigningUp" @keyup.delete="isSigningUp" v-model="userInfo.password" class="border border-slate-300 rounded-md w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" type="password" placeholder="Password">
        </div>

        <!-- footer -->
        <div class="w-full text-left m-auto my-6">
          <button class="block w-full md:w-96 rounded-full m-auto my-2 py-2 bg-black text-white font-bold text-md hover:bg-gray-900 disabled:bg-dark" :disabled="signupDisabled">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'SignupFormPage',
    data() {
      return {
        userInfo: {
          name: '',
          username: '',
          password: '',
          location: ''
        },
        locations: ['New Delhi', 'Mumbai', 'Kolkata', 'Bengaluru'],
        signupDisabled: true,
        ifUserExists: false
      };
    },
    mounted() {
      this.$refs.input.focus()
    },
    methods: {
      isSigningUp () {
        if (this.userInfo.name && this.userInfo.username && this.userInfo.location && this.userInfo.password && !this.ifUserExists) {
          this.signupDisabled = false;
        } else {
          this.signupDisabled = true;
        }
      },
      async checkUserExists () {
        const user = await axios.get(`${this.$store.state.server_host}/user/ifusernameexists/${this.userInfo.username}`);
        if (user.data === true) {
          this.ifUserExists = true;
          this.userInfo.password = '';
        } else {
          this.ifUserExists = false;
          this.userInfo.password = '';
        }
      },
      createUser () {
        this.$store.dispatch('createUser', this.userInfo);
      }
    }
  }
</script>
