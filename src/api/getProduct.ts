import axios from 'axios'
import type { Product } from './types'

const baseUrl = import.meta.env.VITE_SERVER_API

interface SearchProducts {
  products: Product[]
  countProducts: number
  page: number
  pages: number
}
export interface QueryParams {
  category: string
  price: string
  rating: string
  query: string
}

export const getProducts = async (queryParams: QueryParams) => {
  const { category = 'all', price = 'all', rating = 'all', query = 'all' } = queryParams
  console.log(category, price, rating, query)
  const url = `${baseUrl}/api/products/search?category=${category}&price=${price}&rating=${rating}&query=${query}`
  const { data } = await axios.get<SearchProducts>(url)
  return data
}

export const getProduct = async (slug: string) => {
  const { data } = await axios.get<Product>(`${baseUrl}/api/products/slug/${slug}`)
  return data
}

export const getCategories = async () => {
  const { data } = await axios.get<String[]>(`${baseUrl}/api/products/categories`)
  return data
}
