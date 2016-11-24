import express from "express"

import notificationsService from "../../services/notifications"

let router = express.Router()

router.get("/", (req, res) => {
  notificationsService.getNotifications(req.user.id)
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

router.post("/test", (req, res) => {
  console.log(req.body);
  let {type, payload} = req.body
  notificationsService.addNotification(req.query.userId, type, payload).then((n)=> {
    res.send("ok")
  })
  .catch(e => {
    console.log(e);
    res.json(JSON.stringify(e))
  })
})

export default router
