import axiosClient from './axiosClient'

const products = {
  get: () => axiosClient.get('https://fakestoreapi.com/products')
}

export default products