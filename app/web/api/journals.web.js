import express from "express"
import {getJournalsByUser} from "../../services/journals"

let router = express.Router()

router.get("/", (req, res) => {
  let {userId} = req.query
  res.json(getJournalsByUser(userId))
})

export default router
