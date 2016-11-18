
import getDB from "../../persistence"

let journalsService = {}

journalsService.getJournalsByUser = (userId) => {
  return getDB().getJournalsByUser(userId)
}

journalsService.addJournal = (userId, journal) => {
  if( (typeof journal === "object") && (journal !== null) && (journal !== undefined))
  {
    let journalOject = JSON.parse(journal)
    return getDB().addJournal(userId, journalOject)
  }
  else {
    return Promise.reject({code:400, description:"Bad request"})
  }
}

journalsService.getJournal = (journalId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.updateJournal = (journalId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.deleteJournal = (journalId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.getJournalEntries = (journalId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.addEntry = (journalId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.updateEntry = (entryId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.deleteEntry = (entryId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.getComments = (journalId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

journalsService.deleteComments = (commentId) => new Promise((approve, reject) => {
  reject({code:501, description:"Not Implemented"})
})

export default journalsService
