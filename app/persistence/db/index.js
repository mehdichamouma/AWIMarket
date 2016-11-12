import neo4j from 'neo4j'
import promisify from "es6-promisify"
import passwordHash from 'password-hash'

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
export const clearDb = () => cypher({
  query:` MATCH (n)
          DETACH DELETE n`
})
export const createUser = (id,firstName, lastName, email, password, adresse) => cypher({
  query : `CREATE (t:User {
                       id:{id},
                       firstName:{firstName},
                       lastName:{lastName},
                       email:{email},
                       password:{password},
                       adresse:{adresse}
                     })
                     return t`,
  params: {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash.generate(password),
      adresse: adresse,
   },
})
export const getUserByCredentials = (email, password) => {

    console.log(email, password);
    return cypher ( {
      query : `MATCH (u:User)
                WHERE u.email = {email}
              return u`,
      params: {
          email: email,
       },
     }
  ).then(res=>{
    if (res.length <1) {
      throw new Error('user not found')
    }
    else {
      if (passwordHash.verify(password, res[0].u.properties.password)){
        return {
          email: email,
          userId: res[0].id,
          is_admin: false
        }
      }
      else {
          throw new Error('wrong password')
      }
    }

  })
}

export const createSellingCompany = (userId, id, nameSc, siret) => cypher({
  query : `MATCH (u:User)
            WHERE u.id = {userId}
            CREATE(sc:SellingCompany {
              id:{id},
              nameSc:{nameSc},
              siret:{siret}
            }
          )

          CREATE (u)-[has:HAS]->(sc)
          RETURN has`,

  params: {
      userId: userId,
      id: id,
      nameSc: nameSc,
      siret: siret,
   },
})
export const createProduct = (idSc, id,Name, desc, price, quantity) => cypher({
  query : `MATCH (sc:SellingCompany)
          WHERE sc.id = {idSc}
          CREATE (p:Product {
                       id:{id},
                       Name:{Name},
                       desc:{desc},
                       price:{price},
                       quantity:{quantity}
                     })
        CREATE (sc)-[sell:SELL]->(p)
        RETURN sell`,
  params: {
      idSc: idSc,
      id: id,
      Name: Name,
      desc: desc,
      price: price,
      quantity: quantity,
   },
})

export const createCommand = (userId, id, products) => {
  return cypher({
    query: `MATCH(u:User)
            WHERE u.id = {userId}
            CREATE(c:Command {id: {id}, name: {commandName}})
            CREATE((u)-[r:DO]->(c))
            WITH u, c, {products} AS products
            UNWIND products AS product
            MATCH(p:Product)
            WHERE p.id = product.id
            CREATE((c)-[r2:HAS {quantity: product.quantity, price: product.price}]->(p))
            RETURN p, u, c`,
    params: {
      userId,
      id,
      products,
      commandName: `Order ${id}`
    }
  })
}

export const createJournal = () => cypher({
    query: `CREATE (t:${labels.JOURNAL} {
                title:"The Matrix",
                released:1997
            })
            RETURN t`,
})


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
