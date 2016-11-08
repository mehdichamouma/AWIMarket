let journals = new Map();
journals.set("user01", [
  {title: "My journal", nbEntries: 10},
  {title: "My journal 2", nbEntries: 9},
  {title: "My journal 3", nbEntries: 10},
  {title: "My journal 4", nbEntries: 10}
])



export const getJournalsByUser = (userId = null) => new Promise((resolve, reject) => {
  console.log(userId);
  if(journals.has(userId)) {
    resolve(journals.get(userId))
  }
  else {
    reject(404)
  }
})

export const addJournal = (userId, journal) => new Promise((resolve, reject) => {
  if(journals.has(userId)) {
    let newJournal = formatJournal(journal)
    if(newJournal != null) {
      journals.get(userId).push(journal);
      resolve(usedId, journal)
    }
    else {
      reject()
    }
  }
  else {
    reject()
  }
})

const formatJournal = (journal) => {
  if(journal.hasOwnProperty("title") && journal.hasOwnProperty("nbEntries")){
    let newJournal = {}
    newJournal.title = journal.title
    newJournal.nbEntries = journal.nbEntries
    return newJournal
  }
  else {
    return null
  }
}
