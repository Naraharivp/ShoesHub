import axios from 'axios'

const BASE_URL = 'https://dummyjson.com/products/category/mens-shoes'
const PRODUCT_URL = 'https://dummyjson.com/products'

export const getAllProducts = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }
}

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/search?q=${query}`)
    return response.data.products
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error)
    return []
  }
}

export const getRelatedProducts = async (category = 'mens-shoes', limit = 4) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/category/${category}?limit=${limit}`)
    return response.data.products
  } catch (error) {
    console.error(`Error fetching related products for category "${category}":`, error)
    return []
  }
}
