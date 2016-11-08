import {
  getJournalsByUser as _getJournalsByUser,
  addJournal as _addJournal
} from "../../persistence/fake"

export const getJournalsByUser = (userId) => {
  return _getJournalsByUser(userId)
}

export const createJournal = (userId, journal) => {
  _addJournal(userId, journal)
  .then((usedId, journal) => {
    return 200
  })
}
