import neo4j from 'neo4j'
import promisify from "es6-promisify"

let db
let labels = [
  'JOURNAL',
]
let cypher
export const initDb = (uri, node_prefix) => {
  db = new neo4j.GraphDatabase(uri);
  cypher = promisify(db.cypher, db)
}

export const getLabels = () => labels
export const getDb = () => db

// export const getUsers = () => {
//     console.log("abc");
//     return 'ok'
// }

// export const getUserByCredentials = (email, password) => {
//   //fetch user from its email and password
// }

export const createJournal = () => cypher({
    query: `CREATE (t:${labels.JOURNAL} {
                title:"The Matrix",
                released:1997
            })
            RETURN t`,
})


export const getJournalsByUser = (userId = null) => new Promise((resolve, reject) => {
  console.log("DataBase")
  var node = db.createNode({hello: "world"});     // instantaneous, but...
  console.log(node)
  console.log("after node");
  node.save(function (err, node) {    // ...this is what actually persists.
    if (err) {
        console.error('Error saving new node to database:', err);
        reject(404)
    } else {
        console.log('Node saved to database with id:', node.id);
        resolve([])
    }
  })
})
