import express from "express"
import {getJournalsByUser, createJournal} from "../../services/journals"

let router = express.Router()

router.get("/", (req, res) => {
  let {userId} = req.query
  getJournalsByUser(userId)
  .then((journals) => {
    res.json(journals)
  })
  .catch(() => {
    res.status(404)
    .send('Not found');
  })
})

/*
router.post("/", (req, res) => {
  let {userId, journal} = req.query
  res.json(createJournal(userId, journal))
})*/

export default router
