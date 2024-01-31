<script lang="ts" setup>
import ProductFilter from '../components/Product/ProductFilter.vue'
import ProductGallery from '../components/Product/ProductGallery.vue'
</script>

<template>
  <main>
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-2">
        <product-filter />
      </div>
      <div class="order-[-1] col-span-12 md:order-1 md:col-span-10">
        <product-gallery />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
