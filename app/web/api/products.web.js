import express from "express"
import productsService from "../../services/products"
import mediasService from "../../medias"

let router = express.Router()

router.get("/", (req, res) => {
  productsService.getProducts(req.query)
  .then((result) => {
    let json = result.map(r => {
      let o = Object.assign({}, r)
      //o.seller.image = mediasService.getUrl(o.seller.image)
      o.product.image = mediasService.getUrl(o.product.image)
      return o
    })
    res.status(200).json(json)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/", (req, res) => {
  productsService.createProducts(req)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.get("/:productId", (req, res) => {
  productsService.getProduct(req.params.productId)
  .then((result) => {
    let json = Object.assign({}, result)
    json.seller.image = mediasService.getUrl(json.seller.image)
    json.product.image = mediasService.getUrl(json.product.image)

    res.status(200).json(json)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.put("/:productId", (req, res) => {
  productsService.updateProduct(req.params.productId, req)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.delete("/:productId", (req, res) => {
  productsService.deleteProduct(req, req.params.productId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.get("/:productId/related", (req, res) => {
  let {productId} = req.params
  return productsService.getRelatedProducts(productId)
  .then((result) => {
    let json = Object.assign({}, result)
    json.relatedProducts = json.relatedProducts.map(rp => ({
      ...rp,
      image: mediasService.getUrl(rp.image)
    }))
    res.json(json)
  })
  .catch(e => {
    console.error(e);
    res.status(500).json({e: "can't get related products"})
  })
})

export default router
