import express from "express"
import journals from "./journals.web"
import auth from "./authentification.web"

let api = express.Router()

api.use("/journals", journals)
api.use("/auth", auth)
export default api
