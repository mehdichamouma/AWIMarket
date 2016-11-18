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

// return a Promise which approve with the good user
// or reject with the error code
export const getUser = (userId) => {
    return cypher ( {
      query : `MATCH (u:User)
                WHERE u.id = {userId}
              return u`,
      params: {
          userId: userId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('user not found')
    }
    else {
      appove(res)
    }
  })
}

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
  ).then(res => {
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

// return a Promise which approve with the good result
// or reject with the error code
export const getSellingCompany = (companyId) => {
    console.log(email, password);
    return cypher ( {
      query : `MATCH (sc:SellingCompany)
                WHERE sc.id = {companyId}
              return sc`,
      params: {
          companyId: companyId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Selling company not found')
    }
    else {
      return res
    }
  })
}




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

// return a Promise which approve with the good product
// or reject with the error code
export const getProduct = (productId) => {
    return cypher ( {
      query : `MATCH (p:Product)
                WHERE p.id = {productId}
              return p`,
      params: {
          productId: productId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Product not found')
    }
    else {
      return res
    }
  })
}




// The stock quantity is not updated
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

// return a Promise which approve with the good command
// or reject with the error code
export const getCommand = (commandId) => {
    return cypher ( {
      query : `MATCH (c:Command)
                WHERE c.id = {commandId}
              return c`,
      params: {
          commandId: commandId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Command not found')
    }
    else {
    return res
    }
  })
}




// create a new journal
// if the create works then it approve with the created journal
// else it will reject with an error in parameter
export const createJournal = (userId, id, title, creationDate) => cypher(
  {
  query: `MATCH(u:User)
          WHERE u.id = {userId}

          CREATE (j:Journal {
            id: {id},
            title: {title},
            creationDate: {creationDate}
          })
          CREATE((u)-[r:OWN]->(j))
          RETURN j`,
      params: {
        userId: userId,
        id: id,
        title: title,
        creationDate: creationDate,
      }
    }
  ).then(res => {
    if (res.length < 1) {
            throw new Error('Bad request')
    }
    else {
      return res;
    }
  })

// return a Promise which approve with the good Journal
// or reject with the error code
export const getJournal = (journalId) => {
    return cypher ( {
      query : `MATCH (j:Journal)
                WHERE j.id = {journalId}
              return j`,
      params: {
          journalId: journalId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Journal not found')
    }
    else {
     return res
    }
  })
}


export const getJournalsByUser = (userId) => new Promise((resolve, reject) => {
  return cypher ( {
    query : `MATCH (u:User)-[:OWN]->(j:Journal)
            WHERE u.id = {userId}
            RETURN j
            ORDER BY j.date ASC`,
    params: {
        userId: userId,
     },
   }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Product not found')
    }
    else {
    return res
    }
  })
})

export const createEntry = (journalId, id, description, ressourceType, ressourceUrl, creationDate ) => cypher(
  {
  query: `MATCH(j:Journal)
          WHERE j.id = {journalId}

          CREATE (e:Entry {
            id: {id},
            description: {description},
            ressourceType: {ressourceType},
            ressourceUrl: {ressourceUrl},
            creationDate: {creationDate}
          })
          CREATE((j)-[r:HAS]->(e))
          RETURN e`,
      params: {
        journalId: journalId,
        id: id,
        description: description,
        ressourceType: ressourceType,
        ressourceUrl: ressourceUrl,
        creationDate: creationDate,
      }
    }
  ).then(res => {
    if (res.length < 1) {
            throw new Error('Bad request')
    }
    else {
      return res;
    }
  })

  export const createObjective = (journalId, id, description) => cypher(
    {
    query: `MATCH(j:Journal)
            WHERE j.id = {journalId}

            CREATE (o:Objective {
              id: {id},
              description: {description}
            })
            CREATE((j)-[r:REACH]->(o))
            RETURN o`,
        params: {
          journalId: journalId,
          id: id,
          description: description,
        }
      }
    ).then(res => {
      if (res.length < 1) {
              throw new Error('Bad request')
      }
      else {
        return res;
      }
    })
    export const createNotification = (userId, id, content, type, creationDate, readingDate) => cypher(
      {
      query: `MATCH(u:User)
              WHERE u.id = {userId}

              CREATE (n:Notification {
                id: {id},
                content: {content},
                type: {type},
                creationDate: {creationDate},
                readingDate: {readingDate}
              })
              CREATE((n)-[r:concern]->(u))
              RETURN n`,
          params: {
            userId: userId,
            id: id,
            content: content,
            type: type,
            creationDate: creationDate,
            readingDate: readingDate,
          }
        }
      ).then(res => {
        if (res.length < 1) {
                throw new Error('Bad request')
        }
        else {
          return res;
        }
      })
