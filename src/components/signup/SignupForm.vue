<template>
  <div class="bg-neutral-400 min-h-screen py-8">
    <div class="flex flex-col justify-center border rounded-xl max-w-min min-w-[600px] m-auto bg-white py-3 px-2">
      <!-- header -->
      <div class="text-center flex flex-row w-[400px]">
        <div @click="$emit('changeComponent', 'SignupMainPage')" class="w-[70%] pl-2 text-left"><button class="w-4 h-5"><img src="../../assets/close.png" alt="close"></button></div>
        <img class="w-auto h-6" src="../../assets/Twitter-logo.png" alt="logo">
      </div>

      <!-- main -->
      <div class="px-20 text-center m-auto my-6 overflow-y-scroll h-[50%]">
        <h2 class="text-3xl font-bold mb-4 text-left">Create your account</h2>
        <input class="border border-slate-300 rounded-md w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
          focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" type="text" placeholder="Name">
        <input class="border border-slate-300 rounded-md w-full mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
          focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" type="text" placeholder="Email">
        <label class="block font-bold text-sm text-left" for="DOB">Date of birth</label>
        <p class="text-gray-500 text-sm font-normal text-left ">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
        <div class="flex justify-between">
          <select class="border border-slate-300 rounded-md w-1/2 mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" placeholder="Month">
            <option v-for="month in months" :value=month :key=month>{{month}}</option>
          </select>
          <select class="border border-slate-300 rounded-md w-1/5 mb-2 mx-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" type="text" placeholder="Day">
            <option v-for="day in days" :value=day :key=day>{{day}}</option>
          </select>
          <select class="border border-slate-300 rounded-md w-1/3 mb-2 py-4 px-2 cursor-pointer placeholder:text-gray-500 
            focus:outline-none focus:border-cyan-500 focus:border-2 focus:placeholder:text-cyan-500 focus:mb-1.5" type="text" placeholder="Year">
            <option v-for="year in years" :value=year :key=year>{{year}}</option>
          </select>
        </div>
      </div>

      <!-- footer -->
      <div class="w-full text-left m-auto my-6">
        <button class="block w-96 rounded-full m-auto my-2 py-2 bg-black text-white font-bold text-md hover:bg-gray-900">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignupFormPage',
    data() {
      return {
        months: ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
        //todo: feb mai 29 days ka check
        days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        years: [2001,2002,2003,2004,2005]
      };
    },
    methods: {
    }
  }
</script>
