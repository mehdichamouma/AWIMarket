import express from "express"
import {getJournalsByUser, createJournal} from "../../services/journals"

let router = express.Router()

// all journals

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

router.post("/", (req, res) => {
  let {userId, journal} = req.query
  createJournal(userId, JSON.parse(journal))
  .then((result) => {
    res.status(200)
    .send("Ok");
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

// one journal

router.get("/journals/:journalId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

router.put("/journals/:journalId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

router.delete("/journals/:journalId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

// all entries

router.get("/journals/:journalId/entries", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

router.post("/journals/:journalId/entries", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

// one entries

router.put("/journals/:journalId/entries/:entryId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

router.delete("/journals/:journalId/entries/:entryId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

// comments

router.get("/journals/:journalId/comments", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

router.delete("/journals/:journalId/comments/:commentId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
}

export default router
