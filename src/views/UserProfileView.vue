<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import SmallContainerSlot from '../components/Shared/SmallContainerSlot.vue'

const userStore = useUserStore()
const userData = computed(() => userStore.userData)
</script>

<template>
  <main class="py-8">
    <small-container-slot>
      <template v-slot:title><h1 class="title text-center">profile</h1></template>
      <template v-slot:content>
        <div class="m-6">
          <p class="grid grid-cols-4">
            <span class="col-start-2">Username </span
            ><span class="col-start-3">{{ userData?.name }}</span>
          </p>
          <p class="grid grid-cols-4">
            <span class="col-start-2">Email </span
            ><span class="col-start-3">{{ userData?.email }}</span>
          </p>
          <!-- <p>{{ userData?.password }}</p> -->
          <!-- <p>{{ userData?.token }}</p> -->
        </div>
        <div class="flex justify-center gap-x-2">
          <router-link :to="{ name: 'OrderHistory' }"
            ><a-button>Order History</a-button></router-link
          >

          <a-button type="primary" danger @click="userStore.handleLogOut">Log Out</a-button>
        </div>
      </template>
    </small-container-slot>
  </main>
</template>

<style scoped></style>
