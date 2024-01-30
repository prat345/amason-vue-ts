import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getProducts, getProduct } from '@/api/getProduct'
import type { Product } from '@/api/types'
import { useRoute, useRouter } from 'vue-router'
import type { QueryParams } from '@/api/getProduct'
import { useUserStore } from './user'
import axios from 'axios'
import type { OrderHistory } from '@/api/types'

interface CartItems extends Product {
  quantity: number
}
const baseUrl = import.meta.env.VITE_SERVER_API
export const useCartStore = defineStore('cart', () => {
  const router = useRouter()
  const userStore = useUserStore()
  const initialState = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') as string)
    : null
  const cartItems = ref<CartItems[]>(initialState)
  const address = computed(() => userStore.address)
  const userData = computed(() => userStore.userData)
  const orderHistory = ref<OrderHistory[]>([])

  const addItemToCart = (newItem: Product) => {
    const existItem = cartItems.value.find((item) => item.name === newItem.name)
    if (existItem) {
      existItem.quantity++
    } else {
      const updateNewItem = { ...newItem, quantity: 1 }
      cartItems.value = [...cartItems.value, updateNewItem]
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }
  const decreaseQuantity = (itemName: string) => {
    const existItem = cartItems.value.find((item) => item.name === itemName)
    if (existItem?.quantity) {
      existItem.quantity--
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }
  const increaseQuantity = (itemName: string) => {
    const existItem = cartItems.value.find((item) => item.name === itemName)
    if (existItem?.quantity) {
      existItem.quantity++
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }
  const removeItemFromCart = (itemName: string) => {
    cartItems.value = cartItems.value.filter((item) => item.name !== itemName)
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }

  const handlePlaceOrder = async () => {
    console.log('place order')
    console.log(`Bearer ${userData.value?.token}`)
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/orders`,
        {
          orderItems: cartItems.value,
          shippingAddress: address.value,
          paymentMethod: 'paypal',
          itemsPrice: totalItemsPrice.value,
          shippingPrice: shippingFee.value,
          taxPrice: TaxFee.value,
          totalPrice: totalPurchasedPrice.value
        },
        {
          headers: {
            Authorization: `Bearer ${userData.value?.token}`
          }
        }
      )
      console.log('Order created', data)
      router.push({ name: 'OrderSummary', params: { orderId: data._id } })
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  const fetchOrderHistory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/orders/history`, {
        headers: {
          Authorization: `Bearer ${userData.value?.token}`
        }
      })
      orderHistory.value = data
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  // getter
  const countCartItems = computed(() => cartItems.value.reduce((a, c) => a + c.quantity, 0))

  const totalItemsPrice = computed(
    () => +cartItems.value.reduce((a, c) => c.price * c.quantity + a, 0).toFixed(2)
  )

  const shippingFee = computed(() => (totalItemsPrice.value >= 100 ? 0 : 10))
  const TaxFee = computed(() => +(totalItemsPrice.value * 0.15).toFixed(2))

  const totalPurchasedPrice = computed(() => totalItemsPrice.value + shippingFee.value)
  return {
    cartItems,
    countCartItems,
    orderHistory,
    addItemToCart,
    decreaseQuantity,
    increaseQuantity,
    removeItemFromCart,
    handlePlaceOrder,
    fetchOrderHistory,
    totalItemsPrice,
    totalPurchasedPrice,
    shippingFee
  }
})
