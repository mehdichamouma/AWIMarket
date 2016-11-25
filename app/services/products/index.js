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
  if(typeof keywords == "string") {
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
    if(data.product) {
      let p = data.product
      if(typeof p.name == "string" &&
          typeof p.description == "string" &&
          typeof p.price == "number" &&
          typeof p.quantity == "number"
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

// Access : SellingComany owner
productsService.updateProduct = (productId, req) => {
  let data = req.body
  let user = req.user
  if(user != null && user.roles.includes("SELLING_COMPANY_OWNER")) {
    if(typeof productId == "string" && data.product != undefined) {
      let p = data.product
      if(typeof p.name == "string" &&
          typeof p.description == "string" &&
          typeof p.price == "number" &&
          typeof p.quantity == "number"
      ){
        return getDB().getUser(user.id)
        .then((result) => {
          return getDB().getProduct(productId)
          .then((product) => {
            if(product.seller.id == result.company.id) {
              return getDB().updateProduct(result.company.id, productId, p.name, p.description, p.price, p.quantity)
            }
            return Promise.reject({code:400, description:"You are not the owner of this product"})
          })
        })
      }
    }
    return Promise.reject({code:400, description:"Bad Request"})
  }
  return Promise.reject({code:401, description:"Unauthorized"})
}

// Access : SC owner
productsService.deleteProduct = (req, productId) => {
  let user = req.user
  if(user != null && user.roles.includes("SELLING_COMPANY_OWNER")) {
    if(typeof productId == "string") {
      return getDB().getUser(user.id)
      .then((result) => {
        return getDB().getProduct(productId)
        .then((product) => {
          if(product.seller.id == result.company.id) {
            return getDB().deleteProduct(productId)
          }
          return Promise.reject({code:400, description:"You are not the owner of this product"})
        })
      })
    }
    return Promise.reject({code:400, description:"Bad Request"})
  }
  return Promise.reject({code:401, description:"Unauthorized"})
}

// Access: Everybody
productsService.getRelatedProducts = (productId) => {
  return getDB().getRelatedProducts(productId)
}
export default productsService
