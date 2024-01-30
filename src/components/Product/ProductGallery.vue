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
  <main class="border-l px-4 py-8">
    <div class="mb-3">
      <ul class="flex items-center gap-x-2">
        <li v-for="(v, k) in queryParams" :key="v">
          <span v-if="v != 'all'" class="pills">{{ k }}: {{ v }}</span>
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

    <div v-if="products.length === 0" class="flex- items-center justify-center">No Results</div>
    <div class="grid grid-cols-12 gap-y-4">
      <div
        v-for="(product, idx) in products"
        :key="idx"
        class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2"
      >
        <router-link :to="`/product/${product.slug}`">
          <a-card hoverable style="width: 240px">
            <template #cover>
              <div class="img-wrapper">
                <img :src="product.image" :alt="product.name" />
              </div>
            </template>
            <a-card-meta>
              <template #description>
                <p class="font-base text-xl text-black">{{ product.name }}</p>
                <p>
                  <span>{{ product.rating }}</span> <span>({{ product.numReviews }})</span>
                </p>
                <p class="text-2xl font-light">${{ product.price }}</p></template
              >
            </a-card-meta>
          </a-card>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.img-wrapper {
  max-height: 250px;
  overflow: hidden;
}
.pills {
  @apply rounded-xl border border-stone-400 bg-stone-100 px-3 text-sm text-stone-400;
}
</style>
