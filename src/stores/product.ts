import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getProducts, getProduct } from '@/api/getProduct'
import type { Product } from '@/api/types'
import { useRoute } from 'vue-router'
import type { QueryParams } from '@/api/getProduct'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const queryParams = ref<Partial<QueryParams>>({
    category: 'all',
    price: 'all',
    rating: 'all',
    query: 'all'
  })
  const route = useRoute()

  const fetchProducts = async () => {
    try {
      const data = await getProducts(queryParams.value as QueryParams)
      products.value = data.products
      console.log(products.value)
    } catch (error) {
      console.log(error)
    }
  }
  watch(route, () => {
    if (route.name === 'Home') {
      queryParams.value = {
        category: route.query.category as string,
        price: route.query.price as string,
        rating: route.query.rating as string
      }
      fetchProducts()
    }
  })

  // const handleQueryChange = () => {
  //   queryParams.value = { ...route.query }
  //   fetchProducts()
  // }
  const clearQuery = () => {
    queryParams.value = {}
    fetchProducts()
  }

  return { products, queryParams, fetchProducts, clearQuery }
})
