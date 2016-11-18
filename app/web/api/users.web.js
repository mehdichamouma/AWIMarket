import express from "express"
import { } from "../../services/users"

let router = express.Router()

router.get("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.post("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.get("/:userId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.put("/:userId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.delete("/:userId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

export default router
