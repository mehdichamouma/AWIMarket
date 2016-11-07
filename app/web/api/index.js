import express from "express"
import journals from "./journals.web"

let api = express.Router()

api.use("/journals", journals)

export default api
