
import getDB from "../../persistence"

let journalsService = {}

journalsService.getJournalsByUser = (userId) => {
  return getDB().getJournalsByUser(userId)
}

journalsService.addJournal = (userId, title, creationDate) => {
 return getDB().createJournal(userId, null, title, creationDate)
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
