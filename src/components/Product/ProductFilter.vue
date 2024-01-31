<script lang="ts" setup>
import { getCategories } from '@/api/getProduct'
import { computed, onMounted, ref, watch } from 'vue'
import { prices, ratings } from '@/api/data'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'

const route = useRoute()
const productStore = useProductStore()
const queryParams = computed(() => productStore.queryParams)
const categories = ref<string[]>([])

// const queryParams = computed(() => ({ category: '', price: '', rating: '', ...route.query }))
watch(route, () => {
  console.log(queryParams.value)
})

onMounted(async () => {
  categories.value = (await getCategories()) as string[]
})
</script>

<template>
  <main class="py-8">
    <div class="flex flex-row justify-between gap-y-6 md:flex-col">
      <div>
        <h3>Category</h3>
        <ul>
          <router-link
            :to="{ name: 'Home', query: { ...queryParams, category: category } }"
            v-for="category in categories"
            :key="category"
            ><li>{{ category }}</li>
          </router-link>
        </ul>
      </div>
      <div>
        <h3>Prices</h3>
        <ul>
          <router-link
            :to="{ name: 'Home', query: { ...queryParams, price: price.value } }"
            v-for="price in prices"
            :key="price.name"
            ><li>{{ price.name }}</li>
          </router-link>
        </ul>
      </div>
      <div>
        <h3>Ratings</h3>
        <ul>
          <router-link
            :to="{ name: 'Home', query: { ...queryParams, rating: rating.rating } }"
            v-for="rating in ratings"
            :key="rating.name"
            ><li>{{ rating.name }}</li>
          </router-link>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
a {
  @apply text-teal-700;
}
a:hover {
  @apply text-orange-700;
}
h3 {
  @apply mb-1 text-base font-semibold;
}
ul li {
  @apply mb-1 font-light;
}
</style>
