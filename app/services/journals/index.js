import {
  getJournalsByUser as _getJournalsByUser
} from "../../persistence"

export const getJournalsByUser = (userId) => {
  return _getJournalsByUser(userId)
}

export const createJournal = () => {
  // TODO: to implement
}
