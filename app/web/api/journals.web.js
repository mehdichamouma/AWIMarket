import express from "express"
import journalsService from "../../services/journals"

let router = express.Router()

// all journals

router.get("/", (req, res) => {
  let {userId} = req.query
  journalsService.getJournalsByUser(userId)
  .then((journals) => {
    res.json(journals)
  })
  .catch((result) => {
    res.status(404)
    .send("Not found");
  })
})

router.post("/", (req, res) => {
  journalsService.addJournal(req.user.id, req.body.title, req.body.creationDate)
  .then((result) => {
    res.status(200)
    .json({
      id: result.id
    });
  })
  .catch((result) => {
    console.error(result);
    res.status(500)
    .send(result);
  })
})

// one journal

router.get("/:journalId", (req, res) => {
  journalsService.getJournal(req.params.journalId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.put("/:journalId", (req, res) => {
  journalsService.updateJournal(req.params.journalId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.delete("/:journalId", (req, res) => {
  journalsService.deleteJournal(req.params.journalId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

// all entries

router.get("/:journalId/entries", (req, res) => {
  journalsService.getJournalEntries(req.params.journalId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/:journalId/entries", (req, res) => {
  journalsService.addEntry(req.params.journalId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

// one entries

router.put("/:journalId/entries/:entryId", (req, res) => {
  journalsService.updateEntry(req.params.entryId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.delete("/:journalId/entries/:entryId", (req, res) => {
  journalsService.deleteEntry(req.params.entryId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

// comments

router.get("/:journalId/comments", (req, res) => {
  journalsService.getComments(req.params.journalId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.delete("/:journalId/comments/:commentId", (req, res) => {
  journalsService.deleteComments(req.params.commentId)
  .then((result) => {
    res.status(200)
    .send(result);
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

export default router
