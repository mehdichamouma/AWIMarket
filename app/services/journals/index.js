import {
  getJournalsByUser as _getJournalsByUser,
  addJournal as _addJournal
} from "../../persistence/fake"

export const getJournalsByUser = (userId) => {
  return _getJournalsByUser(userId)
}

export const createJournal = (userId, journal) => {
  return _addJournal(userId, journal)
}
