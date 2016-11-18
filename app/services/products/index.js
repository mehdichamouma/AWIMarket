import getDB from "../../persistence"
import uuid from "uuid"

let productsService = {}

productsService.getProducts = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

productsService.createProducts = (data) => {
  if(data.product != undefined) {
    let p = data.product
    if(p.sellingCompany != undefined &&
        p.name != undefined &&
        p.description != undefined &&
        p.price != undefined &&
        p.quantity != undefined
      ) {
      return getDB().createProduct(p.sellingCompany, uuid(), p.name, p.description, p.price, p.quantity)
    }
  }
  return Promise.reject({code:501, description:"Not Implemented"})
}

productsService.getProduct = (productId) => {
  // TODO check productId
  return getDB().getProduct(productId)
  .catch((result) => {
    //TODO check error
    return Promise.reject({code:501, description:""})
  })
}

productsService.updateProduct = (productId) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

productsService.deleteProduct = (productId) => {
  //return getDB().deleteProduct(productId)
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
