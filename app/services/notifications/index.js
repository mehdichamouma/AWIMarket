import EventEmitter from "events"

export const notificationsEmitter = new EventEmitter()

export const addNotification = (userId, data) => {
  notificationsEmitter.emit("notification", userId, data)
}
