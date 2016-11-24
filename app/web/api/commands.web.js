import express from "express"
import commandsService from "../../services/commands"

let router = express.Router()

router.get("/", (req, res) => {
  commandsService.getCommands()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    console.log(result);
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/", (req, res) => {
  commandsService.createCommand(req.user, req.body.products)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    console.log(result);
    res.status(result.code)
    .send(result.description);
  })
})


router.get("/:orderId", (req, res) => {
  commandsService.getCommand(req.params.orderId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.put("/:orderId", (req, res) => {
  commandsService.updateCommand(req.params.orderId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.put("/:orderId/products/:productId", (req, res) => {
  commandsService.updateProduct(req.params.orderId, req.params.productId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/:orderId/payment", (req, res) => {
  commandsService.pay(req.params.orderId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

export default router
