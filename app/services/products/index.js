import getDB from "../../persistence"

let productsService = {}

productsService.getProducts = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

productsService.createProducts = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

productsService.getProduct = (productId) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

productsService.updateProduct = (productId) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

productsService.deleteProduct = (productId) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

/*
// getProducts(keyWords)
productsService.getProducts = (keyWords = null) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

// getProductsAtPage(keyWords, page, nbProducts)
productsService.getProductsAtPage = (keyWords = null, page, nbProducts) => {
  return getDB().getProductsAtPage(keyWords, page, nbProducts)
}

// getProductsFromSeller(sellerId)
productsService.getProductsFromSeller = (sellerId) => {
  return getDB().getProductsFromSeller(sellerId)
}

// getProductsFromSellerAtPage(sellerId, page, nbProducts)
productsService.getProductsFromSellerAtPage = (sellerId, page, nbProducts) => {
  return getDB().getProductsFromSellerAtPage(sellerId, page, nbProducts)
}

// createProduct(sellerId, product)
productsService.createProduct = (sellerId, product) => {
  return getDB().createProduct(sellerId, product)
}

// updateProduct(product)
productsService.updateProduct = (product) => {
  return getDB().updateProduct(product)
}
*/

export default productsService
