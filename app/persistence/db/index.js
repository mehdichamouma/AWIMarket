import neo4j from 'neo4j'

let db

export const initDb = (uri) => {
  db = new neo4j.GraphDatabase(uri);
  console.log(db)
}

// export const getUsers = () => {
//     console.log("abc");
//     return 'ok'
// }

// export const getUserByCredentials = (email, password) => {
//   //fetch user from its email and password
// }

export const getJournalsByUser = (userId = null) => new Promise((resolve, reject) => {
  console.log("DataBase")
  db.insertNode({
  name: 'Ghuffran',
  company: 'Modulus',
  age: 22
  }, function (err, node) {
    if (err) {
      return console.log(err);
    }
    console.log(node);
  })
  /*
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
  })*/
})
