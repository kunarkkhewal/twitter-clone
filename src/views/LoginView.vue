<template>
  <div class="bg-neutral-400 min-h-screen py-8">
    <div class="flex flex-col justify-center border rounded-xl max-w-min min-h-min min-w-[600px] m-auto bg-white py-3 px-2">
      <!-- header -->
      <div class="text-center flex flex-row w-[400px]">
        <div class="w-[70%] pl-2 text-left"><button class="w-4 h-5"><img src="../assets/close.png" alt="close"></button></div>
        <img class="w-auto h-6" src="./../assets/Twitter-logo.png" alt="logo">
      </div>

      <!-- main -->
      <div class="w-72 text-center m-auto my-6">
        <h2 class="text-3xl font-bold">Sign in to Twitter</h2>
        <button class="block w-full border rounded-full border-slate-300 my-4 py-1 hover:bg-emerald-50/30">Sign in with Google</button>
        <button class="block w-full border rounded-full border-slate-300 my-2 py-1 hover:bg-stone-300 font-bold">Sign in with Apple</button>
        <div class="relative">
          <hr class="my-6">
          <span class="absolute -top-3.5 left-[45%] px-2 bg-white">or</span>
        </div>
        <input class="border border-slate-300 rounded-md w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 " type="text" placeholder="Phone, email or username">
        <button class="block w-full rounded-full my-2 py-2 bg-black text-white font-bold text-md hover:bg-gray-900">Next</button>
        <button class="block w-full border rounded-full border-slate-300 my-4 py-2 hover:bg-stone-300 font-bold">Forgot password?</button>
      </div>

      <!-- footer -->
      <div class="w-72 text-left m-auto my-6">
        <h3 class="text-gray-500">Don't have an account? <router-link class="text-cyan-500 hover:underline hover:underline-offset-1" to="/signup">Sign up</router-link></h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: ''
      }
    },
    method: {
    }
  }
</script>
