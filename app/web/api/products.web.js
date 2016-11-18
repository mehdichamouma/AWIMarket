import express from "express"
import {getJournalsByUser, createJournal} from "../../services/products"

let router = express.Router()

router.get("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.post("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.get("/:productId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.put("/:productId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.delete("/:productId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

export default router
