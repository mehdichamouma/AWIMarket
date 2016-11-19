import socketIO from "socket.io"
import notificationsService from "../services/notifications"
import {decodeToken} from "../services/authentification"

let userSockets = {}

notificationsService.notificationsEmitter.on("notification", (userId, notification) => {
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
        userSockets[user.id] = socket
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
