import getDB from "../../persistence"
import uuid from "uuid"

let commandsService = {}

let commandAllowStatus = [
  "notpayed", "payed"
]

let productAllowStatus = [
  "notsent", "sent"
]

commandsService.getCommands = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

commandsService.createCommand = (data) => {
  if(data.command != undefined) {
    let p = data.command
    if(p.userId != undefined && p.userId instanceof String &&
        p.products != undefined && Array.isArray(p.products) && p.products.length > 0
      ) {
        // TODO check products
      return getDB().createCommand(p.userId, undefined, p.products)
      .catch((error) => {
        return Promise.reject({code:500, description:"Server error (persistence/db/createCommand)"})
      })
    }
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

commandsService.getCommand = (commandId) => {
  if(commandId instanceof String) {
    return getDB().getCommand(commandId)
    .catch((error) => {
      return Promise.reject({code:500, description:"Server error (persistence/db/createCommand)"})
    })
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

commandsService.updateCommand = (commandId, data) => {
  if(data.status != undefined && commandId instanceof String) {
    if(commandAllowStatus.includes(data.status)) {
      return getDB().updateCommand(commandId, data.status)
      .catch((error) => {
        return Promise.reject({code:500, description:"Server error (persistence/db/updateCommand)"})
      })
    }
    return Promise.reject({code:400, description:"Status now allow"})
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

commandsService.updateProduct = (commandId, productId, body) => {
  if(data.status != undefined && commandId instanceof String
  && productId instanceof String) {
    if(productAllowStatus.includes(data.status)) {
      return getDB().updateCommandProduct(commandId, productId, data.status)
      .catch((error) => {
        return Promise.reject({code:500, description:"Server error (persistence/db/updateCommandProduct)"})
      })
    }
    return Promise.reject({code:400, description:"Status now allow"})
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

commandsService.pay = (commandId) => {
  return commandsService.updateCommand(commandId, {status:"payed"})
}

export default commandsService
