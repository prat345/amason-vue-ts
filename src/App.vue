<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/Navigation/NavBar.vue'
</script>

<template>
  <main>
    <header>
      <nav-bar />
    </header>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
