import getDB from "../../persistence"

export const getJournalsByUser = (userId) => {
  return getDB().getJournalsByUser(userId)
}

export const createJournal = (userId, journal) => {
  return getDB().addJournal(userId, journal)
}
