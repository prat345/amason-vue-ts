import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/api/types'
import { useRouter } from 'vue-router'
import { useUserStore } from './user'
import type { Order } from '@/api/types'
import { placeOrder, getOrderHistory, getOrderData } from '@/api/order'

export interface CartItems extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const router = useRouter()
  const userStore = useUserStore()
  const initialState = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') as string)
    : null
  const cartItems = ref<CartItems[]>(initialState)
  const address = computed(() => userStore.address)
  const userData = computed(() => userStore.userData)
  const orderHistory = ref<Order[]>()
  const prevOrderData = ref<Order>()

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
    const orderData = {
      orderItems: cartItems.value,
      shippingAddress: address.value,
      paymentMethod: 'paypal',
      itemsPrice: totalItemsPrice.value,
      shippingPrice: shippingFee.value,
      taxPrice: TaxFee.value,
      totalPrice: totalPurchasedPrice.value
    }
    const token = userData.value?.token as string
    const data = await placeOrder(orderData, token)

    console.log('Order created', data)
    router.push({ name: 'OrderSummary', params: { orderId: data._id } })
  }

  const fetchOrderHistory = async () => {
    const data = await getOrderHistory(userData.value?.token as string)
    orderHistory.value = data
  }

  const fetchOrderData = async (orderId: string) => {
    const data = await getOrderData(orderId, userData.value?.token as string)
    prevOrderData.value = data
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
    prevOrderData,
    addItemToCart,
    decreaseQuantity,
    increaseQuantity,
    removeItemFromCart,
    handlePlaceOrder,
    fetchOrderHistory,
    fetchOrderData,
    totalItemsPrice,
    totalPurchasedPrice,
    shippingFee
  }
})
