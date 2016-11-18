import express from "express"
import {getJournalsByUser, createJournal} from "../../services/commands"

let router = express.Router()

router.get("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.post("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.get("/:companyId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.put("/:companyId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.get("/:companyId/orders", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

export default router
