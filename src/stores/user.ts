import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getProducts, getProduct } from '@/api/getProduct'
import type { Product } from '@/api/types'
import { useRouter } from 'vue-router'
import type { QueryParams } from '@/api/getProduct'
import axios from 'axios'

export interface UserData {
  _id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  token: string
}
export interface FormData {
  email: string
  password: string
  name: string
}
export interface Address {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}
const baseUrl = import.meta.env.VITE_SERVER_API
export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const initialState = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData') as string)
    : null
  const userData = ref<UserData | null>(initialState)
  const address = ref<Address>({
    fullName: 'John Doe',
    address: '7/77',
    city: 'Bangkok',
    postalCode: '19999',
    country: 'Asgard'
  })

  const handleLogin = async (formData: Partial<FormData>) => {
    console.log(formData)
    try {
      const { data } = await axios.post(`${baseUrl}/api/users/signin`, formData)
      console.log(data)
      localStorage.setItem('userData', JSON.stringify(data))
      userData.value = data
      alert(`Welcome ${data.name}`)
      router.push({ name: 'Home' })
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    }
  }

  const handleSignUp = async (formData: FormData) => {
    console.log(formData)
    try {
      const { data } = await axios.post(`${baseUrl}/api/users/signup`, formData)
      console.log(data)
      localStorage.setItem('userData', JSON.stringify(data))
      userData.value = data
      alert(`Create Account Successful`)
      router.push({ name: 'Home' })
    } catch (error) {
      console.log(error)
      alert((error as Error).message)
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('userData')
    userData.value = null
    router.push({ name: 'Home' })
    // localStorage.removeItem('cartItems')
  }
  return { userData, address, handleLogin, handleSignUp, handleLogOut }
})
