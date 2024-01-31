<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getProduct } from '@/api/getProduct'
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/api/types'

const router = useRoute()
const product = ref<Product>()
const cartStore = useCartStore()

onMounted(async () => {
  product.value = await getProduct(router.params.slug as string)
})

const handleAddItemToCart = (product: Product | undefined) => {
  product ? cartStore.addItemToCart(product) : {}
}
</script>

<template>
  <main class="py-8">
    <div>
      <a-row :gutter="[32, 32]">
        <a-col :xs="24" :md="12" class="text-center"><img :src="product?.image" alt="" /></a-col>
        <a-col :xs="24" :md="12" class="border">
          <div class="px-4 py-8">
            <p class="mb-6 text-4xl">{{ product?.name }}</p>
            <p class="mb-3">
              {{ product?.rating }} <span class="text-teal-700">({{ product?.numReviews }})</span>
            </p>
            <p class="clear-start mb-3 text-2xl font-light">${{ product?.price }}</p>
            <p class="mb-3">{{ product?.countInStock }} In Stock</p>
            <a-row :gutter="[0, 16]">
              <a-col :xs="6"> Brand </a-col>
              <a-col :xs="18">
                {{ product?.brand }}
              </a-col>
              <a-col :xs="6"> Description </a-col>
              <a-col :xs="18">
                {{ product?.description }}
              </a-col>
            </a-row>
            <a-button class="button my-6 w-full" @click="handleAddItemToCart(product)"
              >Add to cart</a-button
            >
          </div></a-col
        >
      </a-row>
    </div>
  </main>
</template>

<style scoped></style>
