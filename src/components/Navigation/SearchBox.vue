<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'

const searchText = ref()

const router = useRouter()
const productStore = useProductStore()
const queryParams = computed(() => productStore.queryParams)

// const handleSearchBox = () => {
//   router.push({ path: '/home', query: { query: searchText.value } })
//   productStore.fetchProducts()
// }
</script>

<template>
  <div>
    <input v-model="queryParams.query" type="text" placeholder="Search product" />
    <button class="button" @click="productStore.fetchProducts">search</button>
  </div>
</template>

<style scoped>
input {
  @apply rounded-md border px-2 py-1;
}
</style>
