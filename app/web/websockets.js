import socketIO from "socket.io"
import {notificationsEmitter} from "../services/notifications"
import {decodeToken} from "../services/authentification"

let userSockets = {}

notificationsEmitter.on("notification", (userId, notification) => {
  if(userSockets[userId]) {
    userSockets[userId].emit("notification", notification)
  }
})

export default (server) => {
  let io = socketIO(server)

  let notificationIO = io.of("/sockets/notifications")

  notificationIO.on('connection', (socket) => {
    console.log(123);
    socket.on('authenticate', (token) => {
      console.log(456);
      let user
      console.log(token);
      if(token) {
        user = decodeToken(token)
      }
      if(user) {
        console.log(user);
        userSockets[user.email] = socket
        notificationsEmitter.on("notification", (userId, notification) => {
          if(true || user.id === userId) {
            socket.emit("authenticate", notification)
          }
        })
      }
      else {
        //close connexion
      }
    })

    console.log('ok');
    let ping = (sc) => {
      sc.emit("message", 'ping')
      setTimeout(() => pong(sc), 300)
    }
    let pong = (sc) => {
      sc.emit("message", 'pong')
      setTimeout(() => ping(sc), 300)
    }
    socket.on('sendMessages', () => {
      ping(socket)
    })
    socket.emit('ok', {yes: 'ok'})
  })
}
