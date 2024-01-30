<script lang="ts" setup>
import { useRoute } from 'vue-router'
import SearchBox from './SearchBox.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()
const isActive = (currentPath: string) => {
  // console.log(route.path, currentPath)
  return route.path === currentPath ? 'active' : ''
}
</script>

<template>
  <div class="border-b border-stone-300">
    <nav class="container mx-auto flex py-0">
      <ul class="flex justify-center">
        <li>
          <RouterLink to="/" :class="['nav-item', isActive('/')]">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/cart" :class="['nav-item', isActive('/cart')]">
            <a-badge :count="cartStore.countCartItems" :offset="[12, 0]">
              <span>Cart</span>
            </a-badge>
          </RouterLink>
        </li>
        <li v-if="!userStore.userData">
          <RouterLink to="/signin" :class="['nav-item', isActive('/signin')]">Sign In</RouterLink>
        </li>
        <!-- <li>
          <RouterLink to="/signup" :class="['nav-item', isActive('/signup')]">Sign up</RouterLink>
        </li> -->
        <li v-if="userStore.userData">
          <RouterLink to="/profile" :class="['nav-item', isActive('/profile')]">Profile</RouterLink>
        </li>
        <li v-if="userStore.userData">
          <span class="nav-item" @click="userStore.handleLogOut">Log Out</span>
        </li>
        <li class="my-auto">
          <search-box />
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.active {
  @apply border-b-4 border-gray-500 font-medium;
}
.nav-item {
  @apply block cursor-pointer p-5 hover:border-b-4 hover:border-gray-300;
}
.badge {
  @apply absolute bottom-2 left-7 flex h-4 w-4  items-center justify-center rounded-full bg-red-500 text-sm text-white;
}
</style>
