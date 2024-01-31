<script lang="ts" setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/product'
import { h } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const productStore = useProductStore()
const queryParams = computed(() => productStore.queryParams)
</script>

<template>
  <span class="flex w-full">
    <span class="relative grow">
      <a-input v-model:value="queryParams.query" placeholder="Search product" />
      <p
        v-if="queryParams.query && queryParams.query?.length < 3"
        class="absolute bottom-[-10] text-sm text-red-500"
      >
        Required at least 3 characters
      </p>
    </span>

    <a-button
      shape=""
      danger
      type="primary"
      @click="productStore.fetchProducts"
      :icon="h(SearchOutlined)"
      class="flex items-center justify-center"
    />
  </span>
</template>

<style scoped>
input {
  @apply rounded-md border px-2 py-1;
  min-width: 200px;
}
</style>
