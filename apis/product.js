import apiCaller from '../utils/apiCaller'

const getProducts = async ({ page, limit, keyword }) => {
  let _page = page ? `&page=${page}` : 1
  let _limit = limit ? `&limit=${limit}` : 24
  let _keyword = keyword ? `&keyword=${keyword}` : ``

  return await apiCaller(`/products?${_page}${_limit}${_keyword}`)
}

const getProductById = async (id) => {
  return await apiCaller(`/products/${id}`)
}

const ProductApi = {
  getProducts,
  getProductById,
}

export default ProductApi
