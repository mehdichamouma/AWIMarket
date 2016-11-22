import EventEmitter from "events"

import getDB from "../../persistence"
import uuid from "uuid"

let notificationsService = {}

notificationsService.getNotifications = (userId) => {
  return getDB().getUserNotifications(userId)
  //return Promise.reject({code:501, description:"Not Implemented"})
}

notificationsService.setNotificationRead = (id) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

notificationsService.notificationsEmitter = new EventEmitter()

notificationsService.addNotification = (userId, type, payload) => {
  return getDB()
  .createNotification(userId, null, payload, type)
  .then(() => {
      notificationsService.notificationsEmitter.emit("notification", userId, {type,payload})
  })
}

export default notificationsService
