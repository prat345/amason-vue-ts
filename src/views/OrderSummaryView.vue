<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRoute } from 'vue-router'
import { getDeliveredDate } from '@/utils/formatDate'
import type { Address, Order } from '@/api/types'
import type { CartItems } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const fetchOrderData = cartStore.fetchOrderData
onBeforeMount(() => fetchOrderData(route.params.orderId as string))

const prevOrderData = computed<Order | undefined>(() => cartStore.prevOrderData)
// const prevOrderItems = computed<CartItems | undefined>(() => prevOrderData.value.orderItems)
const address = computed<Address | undefined>(() => prevOrderData?.value?.shippingAddress)
</script>

<template>
  <main class="py-8">
    <h1 class="title">Order Summary</h1>
    <p class="text-stone-500">Order ID {{ route.params.orderId }}</p>
    <div class="flex flex-col items-center justify-center gap-y-4">
      <div class="w-full border">
        <div class="text-teal-600">
          <p class="flex gap-x-3">
            <span>{{ address?.fullName }}</span>
            <span>{{ address?.address }}</span>
            <span>{{ address?.city }}</span>
            <span>{{ address?.country }}</span>
            <span>{{ address?.postalCode }}</span>
          </p>
          <p>
            Receive by
            {{ prevOrderData ? getDeliveredDate(new Date(prevOrderData.createdAt)) : '' }}
          </p>
        </div>
      </div>
      <div class="w-full border">
        <h2>Items</h2>
        <div
          v-for="(item, idx) in prevOrderData?.orderItems"
          :key="idx"
          class="mb-3 grid grid-cols-12 border py-2 shadow-md"
        >
          <div class="card-column col-span-2">
            <div class="img-wrapper"><img :src="item.image" alt="" /></div>
          </div>
          <div class="card-column col-span-4 flex">{{ item?.name }}</div>
          <div class="card-column col-span-2 flex">{{ item?.quantity }}</div>
          <div class="card-column col-span-2 gap-x-1">
            ${{ (item?.price * item?.quantity).toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="flex w-full items-center justify-between border">
        <div>
          Total: <span>{{ prevOrderData?.totalPrice }}</span>
        </div>

        <a-button class="button">I have received my Order</a-button>
      </div>
    </div>
  </main>
</template>

<style scoped>
img {
  max-height: 100px;
}
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
