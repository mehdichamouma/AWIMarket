import getDB from "../../persistence"

// getProducts(keyWords)
export const getProducts = (keyWords = null) => {
  return getDB().getProducts(keyWords)
}

// getProductsAtPage(keyWords, page, nbProducts)
export const getProductsAtPage = (keyWords = null, page, nbProducts) => {
  return getDB().getProductsAtPage(keyWords, page, nbProducts)
}

// getProductsFromSeller(sellerId)
export const getProductsFromSeller = (sellerId) => {
  return getDB().getProductsFromSeller(sellerId)
}

// getProductsFromSellerAtPage(sellerId, page, nbProducts)
export const getProductsFromSellerAtPage = (sellerId, page, nbProducts) => {
  return getDB().getProductsFromSellerAtPage(sellerId, page, nbProducts)
}

// createProduct(sellerId, product)
export const createProduct = (sellerId, product) => {
  return getDB().createProduct(sellerId, product)
}

// updateProduct(product)
export const updateProduct = (product) => {
  return getDB().updateProduct(product)
}
