import neo4j from 'neo4j'

export const initDb = (uri) => {
  db = new neo4j.GraphDatabase(uri);
}

// export const getUsers = () => {
//     console.log("abc");
//     return 'ok'
// }

// export const getUserByCredentials = (email, password) => {
//   //fetch user from its email and password
// }


export const getJournalsByUser = (userId = null) => {
  return [
    {title: "My journal", nbEntries: 10, user: userId},
    {title: "My journal 2", nbEntries: 9},
    {title: "My journal 3", nbEntries: 10},
    {title: "My journal 4", nbEntries: 10}
  ]

}
