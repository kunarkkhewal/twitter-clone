<template>
  <div id="app">
    <nav class="p-4 font-bold text-blue-600">
      <router-link class="hover:text-green-400" to="/">Home</router-link> |
      <router-link class="hover:text-green-400" to="/login">Login</router-link>
    </nav>
    <router-view/>
  </div>
</template>

