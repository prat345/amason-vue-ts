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

export interface OrderHistory {
  _id: string
  createdAt: string
  isDelivered: boolean
  isPaid: boolean
  itemsPrice: number
  orderItems: Product[]
  paymentMethod: string
  shippingAddress: Object
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  updatedAt: string
  user: string
}
