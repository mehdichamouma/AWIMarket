export const getJournalsByUser = (userId = null) => {
  return [
    {title: "My journal", nbEntries: 10, user: userId},
    {title: "My journal 2", nbEntries: 9},
    {title: "My journal 3", nbEntries: 10},
    {title: "My journal 4", nbEntries: 10}
  ]

}
