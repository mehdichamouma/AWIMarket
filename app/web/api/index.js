import express from "express"
import bodyParser from "body-parser"

import journals from "./journals.web"
import auth from "./authentification.web"
import users from "./users.web"
import products from "./products.web"
import commands from "./commands.web"
import notifications from "./notifications.web"
import companies from "./companies.web"
import medias from "./medias.web"

import usersService from "../../services/users"
import mediasService from "../../medias"
import notificationsService from "../../services/notifications"

import populateDb from "../../utils/populateDb"

import basic from "basic-auth"
import config from "../../../config"

let api = express.Router()

api.use("/medias", medias)

api.use(bodyParser.json());

api.use("/journals", journals)
api.use("/auth", auth)
api.use("/users", users)
api.use("/products", products)
api.use("/orders", commands)
api.use("/notifications", notifications)
api.use("/companies", companies)

api.get("/me", (req, res) => {
  if(req.user != null) {
    Promise.all([
      usersService.getUser(req.user.id),
      notificationsService.getNotifications(req.user.id)
    ])
    .then(([user, notifications]) => {
      let json = Object.assign({}, user, {notifications})
      json.user.profilePicture = mediasService.getUrl(json.user.profilePicture)
      if(json.company) {
        json.company.image = mediasService.getUrl(json.company.image)
      }
      res.status(200).json(json)
    })
    .catch(e => {
      res.status(e.code).json(e.description)
    })
  }
  else {
    res.status(401).send("You are not log")
  }
})

api.get("/resetDB", (req, res) => {
    let o = basic(req)
    if(o) {
      let {name, pass} = o
      if(name == "admin" && pass == "azerty123") {
        return populateDb(config.DB_URL).then(() => {
          res.send("Database reinitialized")
        })
      }
    }
    return res.status(401).send("Authrorization needed")
})

export default api
