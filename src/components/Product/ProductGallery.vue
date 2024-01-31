<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { CloseCircleOutlined } from '@ant-design/icons-vue'

const productStore = useProductStore()
const route = useRoute()
const products = computed(() => productStore.products)
const queryParams = computed(() => productStore.queryParams)
const fetchProducts = productStore.fetchProducts

onMounted(fetchProducts)
</script>

<template>
  <main class="px-4 py-8">
    <div class="mb-3">
      <ul class="flex items-center gap-x-2">
        <span v-if="Object.keys(queryParams).length > 0">Filters: </span>
        <li v-for="(v, k) in queryParams" :key="k">
          <span v-if="v && v != 'all'" class="pills">{{ k }}: {{ v }}</span>
        </li>
        <li
          v-if="queryParams.category || queryParams.price || queryParams.rating"
          class="flex items-center"
          @click="productStore.clearQuery"
        >
          <CloseCircleOutlined class="cursor-pointer text-xl text-stone-500 hover:text-red-600" />
        </li>
      </ul>
    </div>

    <div v-if="products.length === 0" class="flex items-center justify-center">No Results</div>
    <a-row :gutter="[18, 24]">
      <a-col v-for="(product, idx) in products" :key="idx" :xs="12" :sm="12" :md="8" :lg="6">
        <router-link :to="`/product/${product.slug}`">
          <div class="card">
            <div class="img-wrapper">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="content">
              <p class="font-base mb-2 text-lg text-black">{{ product.name }}</p>
              <p class="mb-2 flex gap-x-1">
                <span>{{ product.rating }}</span>
                <span class="text-teal-700">({{ product.numReviews }})</span>
              </p>
              <p class="mb-2 text-2xl font-light">${{ product.price }}</p>
            </div>
          </div>
        </router-link>
      </a-col>
    </a-row>
  </main>
</template>

<style scoped>
img {
  max-height: 220px;
}
a {
  @apply !text-black;
}
.pills {
  @apply rounded-xl border border-stone-400 bg-stone-100 px-3 text-sm text-stone-400;
}
.card {
  @apply overflow-hidden rounded-sm border bg-white;
}
.card:hover {
  @apply border border-orange-500;
}
.card .content {
  @apply bg-stone-50 px-4 py-2;
}
.card .img-wrapper {
  @apply overflow-hidden text-center;
}
</style>
