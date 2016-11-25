import getDB from "../../persistence"
import uuid from "uuid"
import productsService from "../products"
import companiesService from "../companies"
import notificationsService from "../notifications"
import mediasService from "../../medias"

let commandsService = {}

let commandAllowStatus = [
  "CANCELLED", "PENDING", "INVALIDATE"
]

let productAllowStatus = [
  "notsent", "sent"
]

commandsService.getCommands = () => {
  return getDB().getCommands()
  .catch((error) => {
    return Promise.reject({code:500, description:"Server error (persistence/db/getCommands)"})
  })
}

// TODO check products, timeout invalidation, send notifications to admin and selling companies
commandsService.createCommand = (user, products) => {
  if(user.id != undefined && typeof user.id == "string" &&
      products != undefined && Array.isArray(products) && products.length > 0
    ) {
    return getDB().createCommand(user.id, undefined, products, 'PENDING')
    .then((commandId) => {
      return getDB().getUser(user.id)
      .then((data) => {
        let notifyAllCompanies = Promise.all(products.map(p => {
          return productsService.getProduct(p.id)
          .then(productDb => {
            let notification = {
              type: 'NEW_SELL',
              payload: {
                commandId: commandId,
                user: {
                  name: data.user.name,
                  id: user.id,
                  profilePicture: mediasService.getUrl(data.user.profilePicture)
                },
                product: {
                  id: p.id,
                  name: productDb.product.Name
                },
                quantity: p.quantity
              }
            }
            console.log(notification);
            return commandsService.notifyProductOwner(p.id, notification)
          })
        }))
        return notifyAllCompanies.then(() => commandId)
      })
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject({code:500, description:"Server error (persistence/db/createCommand)"})
    })
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

commandsService.notifyProductOwner = (productId, notification) => {
    return productsService.getProduct(productId)
    .then((data) => companiesService.getCompany(data.seller.id))
    .then((company) => notificationsService.addNotification(company.owner.id, notification.type, notification.payload))
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

commandsService.updateProduct = (orderId, productId, data) => {
  return getDB().getOrder(orderId)
  .then(order => {
    console.log(order);
    console.log(productId);
    let product = order.products.find(p => p.product.id == productId)
    if(product) {
      console.log(product);
      let notification = {
        type: 'PRODUCT_SENT',
        payload: {
          orderId: orderId,
          product: {
            id: product.product.id,
            name: product.product.Name,
            image: mediasService.getUrl(product.product.image)
          },
          quantity: product.rowInfo.quantity
        }
      }
      console.log(notification);
      return notificationsService.addNotification(order.owner.id, notification.type, notification.payload)
    }
    return Promise.reject({code: 404, description: "Product not found in the order"})
  })
}

commandsService.pay = (orderId) => {
  return commandsService.updateCommand(orderId, {status:"payed"})
}

export default commandsService
