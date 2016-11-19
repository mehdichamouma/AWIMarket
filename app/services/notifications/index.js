import getDB from "../../persistence"
import uuid from "uuid"

let notificationsService = {}

notificationsService.getNotifications = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

notificationsService.setNotificationRead = (id) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

export default notificationsService
