import type { Order } from './types'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const baseUrl = import.meta.env.VITE_SERVER_API
const $toast = useToast()

export const placeOrder = async (orderData: Partial<Order>, token: string) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    $toast.success(`Order has been placed ${data.order._id}`)
    return data.order
  } catch (error) {
    $toast.error('Create order failed')
    console.log((error as Error).message)
  }
}

export const getOrderHistory = async (token: String) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/orders/history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}

export const getOrderData = async (orderId: string, token: string) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (error) {
    $toast.error('Order not found')
    console.log((error as Error).message)
  }
}
