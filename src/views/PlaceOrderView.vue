<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import type { FormData } from '@/stores/user'

const userStore = useUserStore()
const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)
const address = computed(() => userStore.address)
</script>

<template>
  <main class="py-8">
    <h1 class="title">Place Order</h1>
    <div class="flex flex-col items-center justify-center gap-y-4">
      <div class="w-full border">
        <h2>Address</h2>
        <div>
          <p class="flex gap-x-3 text-emerald-600">
            <span>{{ address.fullName }}</span>
            <span>{{ address.address }}</span>
            <span>{{ address.city }}</span>
            <span>{{ address.country }}</span>
            <span>{{ address.postalCode }}</span>
          </p>
          <p>Receive by....</p>
        </div>
      </div>
      <div class="border">
        <h2>Items</h2>
        <div
          v-for="(item, idx) in cartItems"
          :key="idx"
          class="mb-3 grid grid-cols-12 border shadow-md"
        >
          <div class="card-column col-span-2">
            <div class="img-wrapper"><img :src="item.image" alt="" /></div>
          </div>
          <div class="card-column col-span-4 flex">{{ item.name }}</div>
          <div class="card-column col-span-2 flex">{{ item.quantity }}</div>
          <div class="card-column col-span-2 gap-x-1">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="w-full">
        Shipping fee : <span>${{ cartStore.shippingFee }}</span>
      </div>
      <div class="flex w-full items-center justify-between border">
        <div>
          Total: <span>{{ cartStore.totalPurchasedPrice }}</span>
        </div>

        <button class="button" @click="cartStore.handlePlaceOrder">Place Order</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
h2 {
  @apply text-xl font-medium;
}
.img-wrapper {
  max-height: 150px;
  overflow: hidden;
}
.card-column {
  @apply flex items-center justify-center;
}
</style>
