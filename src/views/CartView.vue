<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)
</script>

<template>
  <main class="py-8">
    <h1 class="title">Cart</h1>

    <div class="flex flex-col gap-y-4">
      <div
        v-for="(item, idx) in cartItems"
        :key="idx"
        class="grid grid-cols-12 border py-2 shadow-md"
      >
        <div class="card-column col-span-2">
          <div class="img-wrapper"><img :src="item.image" alt="" /></div>
        </div>
        <div class="card-column col-span-4 flex">{{ item.name }}</div>
        <div class="card-column col-span-2 flex">{{ item.quantity }}</div>
        <div class="card-column col-span-2 gap-x-1">
          <a-button
            @click="cartStore.increaseQuantity(item.name)"
            :disabled="item.quantity === item.countInStock"
          >
            +</a-button
          ><a-button @click="cartStore.decreaseQuantity(item.name)" :disabled="item.quantity === 1">
            -
          </a-button>
        </div>
        <div class="card-column col-span-2">
          <a-button danger @click="cartStore.removeItemFromCart(item.name)">delete</a-button>
        </div>
      </div>
      <router-link :to="{ path: '/placeorder' }" class="text-end"
        ><a-button class="button">Check Out</a-button>
      </router-link>
    </div>
  </main>
</template>

<style scoped>
img {
  max-height: 100px;
}
.img-wrapper {
  max-height: 150px;
  overflow: hidden;
}
.card-column {
  @apply flex items-center justify-center;
}
button.button:disabled {
  opacity: 0.5;
}
</style>
