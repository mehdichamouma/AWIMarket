import express from "express"
import notificationsService from "../../services/notifications"

let router = express.Router()

router.get("/", (req, res) => {
  notificationsService.getNotifications()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.patch("/:notificationId", (req, res) => {
  notificationsService.setNotificationRead(req.params.notificationId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

export default router
