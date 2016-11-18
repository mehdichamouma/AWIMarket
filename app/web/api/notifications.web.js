import express from "express"
import { } from "../../services/notifications"

let router = express.Router()

router.get("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.patch("/:notificationId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

export default router
