import express from "express"
import {addNotification} from "../../services/notifications"

let router = express.Router()

router.get("/", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.patch("/:notificationId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.post("/test", (req, res) => {
  console.log(req.body);
  addNotification(req.query.email, req.body)
  res.send("ok")
})

export default router
