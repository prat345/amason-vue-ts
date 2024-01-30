<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()
const userData = computed(() => userStore.userData)
</script>

<template>
  <main class="py-8">
    <h1 class="title">profile</h1>
    <div>
      <p>{{ userData.name }}</p>
      <p>{{ userData.email }}</p>
      <p>{{ userData.password }}</p>
      <p>{{ userData.token }}</p>
    </div>
    <router-link :to="{ name: 'OrderHistory' }" class="button">Order History</router-link>
  </main>
</template>

<style scoped></style>
