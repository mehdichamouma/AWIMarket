import getDB from "../../persistence"

let productsService = {}

// Access SC
productsService.getProducts = (params) => {
  if(params.keywords != undefined) {
    return productsService.getProductsByKeywords(params.keywords)
  }
  return getDB().getProducts()
  .catch((error) => {
    return Promise.reject({code:500, description:"Server error"})
  })
}

// Access : Everybody
productsService.getProductsByKeywords = (keywords) => {
  if(keywords != undefined && keywords instanceof String) {
    return getDB().getProductsByKeywords(keywords)
    .catch((error) => {
      return Promise.reject({code:500, description:"Server error"})
    })
  }
  return Promise.reject({code:400, description:"Bad Request"})
}


// Access : SC
productsService.createProducts = (req) => {
  let data = req.body
  let user = req.user
  if(user != null && user.roles.includes("SELLING_COMPANY_OWNER")) {
    if(data.product != undefined) {
      let p = data.product
      if(p.sellingCompany != undefined && p.sellingCompany instanceof String &&
          p.name != undefined && p.name instanceof String &&
          p.description != undefined && p.description instanceof String &&
          p.price != undefined && p.price instanceof Number &&
          p.quantity != undefined && p.quantity instanceof Number
        ) {
        return getDB().getUser(user.id)
        .then((result) => {
          return getDB().createProduct(result.company.id, undefined, p.name, p.description, p.price, p.quantity)
        })
        .catch((error) => {
          return Promise.reject({code:500, description:"Server error"})
        })
      }
    }
    return Promise.reject({code:400, description:"Bad Request"})
  }
  return Promise.reject({code:401, description:"Unauthorized"})
}

// Access : Everybody
productsService.getProduct = (productId) => {
  if(typeof productId === "string" || productId instanceof String) {
    return getDB().getProduct(productId)
    .catch((result) => {
      return Promise.reject({code:404, description:"Product not found"})
    })
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

// Access : SellingComany
productsService.updateProduct = (productId, req) => {
  let data = req.body
  let user = req.user
  if(user != null && user.roles.includes("SELLING_COMPANY_OWNER")) {
    if(productId instanceof String && data.product != undefined) {
      let p = data.product
      if(p.name != undefined && p.name instanceof String &&
          p.description != undefined && p.description instanceof String &&
          p.price != undefined && p.price instanceof Number &&
          p.quantity != undefined && p.quantity instanceof Number
        ) {
          return getDB().getUser(user.id)
          .then((result) => {
            return getDB().getProduct(productId)
            .then((product) => {
              if(product.id == result.company.id) {
                return getDB().updateProduct(result.company.id, productId, p.name, p.description, p.price, p.quantity)
                .catch((error) => {
                  return Promise.reject({code:500, description:"Server error"})
                })
              }
            })
          })
        .catch((error) => {
          return Promise.reject({code:500, description:"Server error"})
        })
      }
    }
    return Promise.reject({code:400, description:"Bad Request"})
  }
  return Promise.reject({code:401, description:"Unauthorized"})
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
