import express from "express"
import journals from "./journals.web"
import auth from "./authentification.web"
import users from "./users.web"
import products from "./products.web"
import commands from "./commands.web"
import notifications from "./notifications.web"

let api = express.Router()

api.use("/journals", journals)
api.use("/auth", auth)
api.use("/users", users)
api.use("/products", products)
api.use("/commands", commands)
api.use("/notifications", notifications)

export default api
