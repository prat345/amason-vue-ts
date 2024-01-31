<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/Navigation/NavBar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <main class="relative">
    <header class="h-16">
      <nav-bar />
    </header>
    <div class="container">
      <RouterView />
    </div>
    <the-footer />
  </main>
</template>

<style scoped>
.container {
  min-height: 500px;
}
</style>
