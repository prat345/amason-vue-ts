import type { CartItems } from '@/stores/cart'

export interface Product {
  name: string
  slug: string
  image: string
  brand: string
  category: string
  description: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
}

export interface Order {
  _id: string
  createdAt: string
  isDelivered: boolean
  isPaid: boolean
  itemsPrice: number
  orderItems: CartItems[]
  paymentMethod: string
  shippingAddress: Address
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  updatedAt: string
  user: string
}
export interface Address {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}
