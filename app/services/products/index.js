import getDB from "../../persistence"

let productsService = {}

productsService.getProducts = () => {
  return getDB().getProducts()
  .catch((error) => {
    return Promise.reject({code:500, description:"Server error"})
  })
}

productsService.createProducts = (data) => {
  if(data.product != undefined) {
    let p = data.product
    if(p.sellingCompany != undefined && p.sellingCompany instanceof String &&
        p.name != undefined && p.name instanceof String &&
        p.description != undefined && p.description instanceof String &&
        p.price != undefined && p.price instanceof Number &&
        p.quantity != undefined && p.quantity instanceof Number
      ) {
      return getDB().createProduct(p.sellingCompany, undefined, p.name, p.description, p.price, p.quantity)
      .catch((error) => {
        return Promise.reject({code:500, description:"Server error"})
      })
    }
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

productsService.getProduct = (productId) => {
  if(typeof productId === "string" || productId instanceof String) {
    return getDB().getProduct(productId)
    .catch((result) => {
      return Promise.reject({code:404, description:"Product not found"})
    })
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

productsService.updateProduct = (productId, data) => {
  if(productId instanceof String && data.product != undefined) {
    let p = data.product
    if(p.sellingCompany != undefined && p.sellingCompany instanceof String &&
        p.name != undefined && p.name instanceof String &&
        p.description != undefined && p.description instanceof String &&
        p.price != undefined && p.price instanceof Number &&
        p.quantity != undefined && p.quantity instanceof Number
      ) {
      return getDB().updateProduct(p.sellingCompany, productId, p.name, p.description, p.price, p.quantity)
      .catch((error) => {
        return Promise.reject({code:500, description:"Server error"})
      }
      )
    }
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

productsService.deleteProduct = (productId) => {
  if(productId instanceof String) {
    return getDB().deleteProduct(productId)
    .catch((error) => {
      return Promise.reject({code:500, description:"Server error"})
    })
  }
  return Promise.reject({code:400, description:"Bad Request"})
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
