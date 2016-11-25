import express from "express"
let savedCarts = {}

let router = express.Router()

router.post("/", (req, res) => {
  if(req.user.id) {
    savedCarts[req.user.id] = req.body
    res.json(savedCarts[req.user.id])
  }
  else {
    res.status(401).json({
      e: "authentication needed"
    })
  }
})

router.get("/", (req, res) => {
  if(savedCarts[req.user.id]) {
    res.json(savedCarts[req.user.id])
  }
  else {
    res.json([])
  }
})

export default router
