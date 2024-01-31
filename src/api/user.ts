import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const baseUrl = import.meta.env.VITE_SERVER_API

export interface FormData {
  email: string
  password: string
  name: string
}

export const loginUser = async (formData: Partial<FormData>) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/users/signin`, formData)
    $toast.success(`Welcome ${data.name}`)
    return data
  } catch (error) {
    console.log(error)
    $toast.error((error as Error).message)
  }
}

export const signUpUser = async (formData: FormData) => {
  // console.log(formData)
  try {
    const { data } = await axios.post(`${baseUrl}/api/users/signup`, formData)
    $toast.success(`Create Account Successful`)
    return data
  } catch (error) {
    console.log(error)
    $toast.error((error as Error).message)
  }
}
