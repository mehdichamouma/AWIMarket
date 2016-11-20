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
    res.status(200).json(req.user)
  }
  else {
    res.status(401).send("You are not log")
  }
})

export default api
