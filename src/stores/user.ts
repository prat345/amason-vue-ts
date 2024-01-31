import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { loginUser, signUpUser } from '@/api/user'
import type { FormData } from '@/api/user'
import type { Address } from '@/api/types'
import { useToast } from 'vue-toast-notification'

export interface UserData {
  _id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
  token: string
}

const $toast = useToast()

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
    const data = await loginUser(formData)
    console.log(data)
    localStorage.setItem('userData', JSON.stringify(data))
    userData.value = data
    router.push({ name: 'Home' })
  }

  const handleSignUp = async (formData: FormData) => {
    const data = await signUpUser(formData)
    console.log(data)
    localStorage.setItem('userData', JSON.stringify(data))
    userData.value = data
    router.push({ name: 'Home' })
  }

  const handleLogOut = () => {
    localStorage.removeItem('userData')
    userData.value = null
    router.push({ name: 'Home' })
    $toast.success('You have been logged out')
    // localStorage.removeItem('cartItems')
  }
  return { userData, address, handleLogin, handleSignUp, handleLogOut }
})
