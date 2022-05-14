<template>
  <div class="bg-neutral-400 min-h-screen py-8">
    <div class="flex flex-col justify-center border rounded-xl max-w-min min-h-min min-w-[600px] m-auto bg-white py-3 px-2">
      <!-- header -->
      <div class="text-center flex flex-row w-[400px]">
        <div class="w-[70%] pl-2 text-left"><button class="w-8 h-8"><i class="fas fa-times text-2xl"></i></button></div>
        <i class="fab fa-twitter h-12 w-12 text-3xl text-blue"></i>
      </div>

      <!-- main -->
      <div class="w-72 text-center m-auto my-6">
        <h2 class="text-3xl font-bold mb-10">Join Twitter today</h2>
        <button class="block w-full border rounded-full border-slate-300 my-6 py-2 hover:bg-emerald-50/30">Sign up with Google</button>
        <button class="block w-full border rounded-full border-slate-300 my-2 py-2 hover:bg-stone-300 font-bold">Sign up with Apple</button>
        <div class="relative">
          <hr class="my-6">
          <span class="absolute -top-3.5 left-[45%] px-2 bg-white">or</span>
        </div>
        <button @click="$emit('changeComponent', 'SignupFormPage')" class="block w-full rounded-full my-2 py-2 bg-black text-white font-bold text-md hover:bg-gray-900">Sign up with phone or email</button>
        <p class="text-sm text-left font-normal text-gray-500">By signing up, you agree to the <span class="text-cyan-500">Terms of Service</span> and 
        <span class="text-cyan-500">Privacy Policy</span>, including <span class="text-cyan-500">Cookie Use</span>.</p>
      </div>

      <!-- footer -->
      <div class="w-72 text-left m-auto my-6">
        <h3 class="text-gray-500">Have an account already? <router-link class="text-cyan-500 hover:underline hover:underline-offset-1" to="/login">Log In</router-link></h3>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
    name: 'SignupMainPage',
    data() {
      return {
      };
    },
    methods: {
    }
  }
</script>
