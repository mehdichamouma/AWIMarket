import neo4j from 'neo4j'
import promisify from "es6-promisify"
import passwordHash from 'password-hash'
import {omit} from 'lodash'
import {zip} from 'lodash'
import uuid from "uuid"

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

let generateId = (id) => id ? id : uuid();

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

export const createUser = (id, name, email, password, address, phone, birthday, is_admin, profilePicture, facebookId=null) => cypher({
  query : `CREATE (t:User {
                       id:{id},
                       name:{name},
                       email:{email},
                       password:{password},
                       address:{address},
                       phone:{phone},
                       birthday:{birthday},
                       is_admin: {is_admin},
                       profilePicture: {profilePicture},
                       facebookId : {facebookId}
                     })
                     return t`,
  params: {
      id: generateId(id),
      name: name,
      email: email,
      password: password ? passwordHash.generate(password) : null,
      address: address,
      phone: phone,
      birthday: birthday,
      is_admin:is_admin,
      profilePicture: profilePicture,
      facebookId: facebookId
   },
})
// return a Promise which approve with the good user
// or reject with the error code
export const getUser = (userId) => {
    return cypher ( {
      query : `MATCH (u:User)
               WHERE u.id = {userId}
                OPTIONAL MATCH (u:User)-[h:HAS]->(sc:SellingCompany)
               	OPTIONAL MATCH (u:User)-[r]-(j:Journal)
                OPTIONAL MATCH (u:User)-[m]-(c:Command)
                return u, sc, collect( DISTINCT j) as journals , count (c) as nbCommands`,
      params: {
          userId: userId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('user not found')
    }
    else {
      let hasCompany = res[0].sc != null
      if (hasCompany){
      return {
        user: omit(res[0].u.properties,'password'),
        journals: res[0].journals.map(x => x.properties),
        nbCommands: res[0].nbCommands,
        hasCompany,
        company: res[0].sc.properties

      }
    }
    else {
      return {
        user: omit(res[0].u.properties,'password'),
        journals: res[0].journals.map(x => x.properties),
        nbCommands: res[0].nbCommands,
        hasCompany
      }
    }
    }
  })
}

export const getUserByFacebookId = (facebookId) => {
    return cypher ( {
      query : `MATCH (u:User)
               WHERE u.facebookId = {facebookId}
                OPTIONAL MATCH (u)-[h:HAS]->(sc:SellingCompany)
                return u, sc`,
      params: {
          facebookId: facebookId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
    return null
    }
    else {
      let hasCompany = res[0].sc != null
      return {
        userId: res[0].u.properties.id,
        name: res[0].u.properties.name,
        email: res[0].u.properties.email,
        is_admin: res[0].u.properties.is_admin,
        hasCompany,
        company: res[0].sc && res[0].sc.properties

      }
    }

  })
}
export const getUsers = () => {
    return cypher ( {
      query : `MATCH (u:User)
               OPTIONAL MATCH (u)-[h:HAS]->(sc:SellingCompany)
                return  u, sc`,

      lean: true

     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('user not found')
    }
    else {
          return res.map(row => {
            let hasCompany = row.sc != null
            if (hasCompany){
                      return {
                        user: omit(row.u,"password"),
                        company: row.sc

                      }
                    }
            else {
              return {
                user: omit(row.u,"password")
              }
            }

                  })
    }

  })
}
export const getAdmins = () => {
    return cypher ( {
      query : `MATCH (u:User)
                WHERE u.is_admin = true
                return  u`,

      lean: true

     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('user not found')
    }
    else {
          return res.map(row => {
              return {
                user: omit(row.u,"password")
              }
                  })
    }

  })
}
export const getUserByEmail = (email) => {
  return cypher ( {
    query : `MATCH (u:User)
              WHERE u.email = {email}
              OPTIONAL MATCH (u)-[:HAS]-(sc:SellingCompany)
            return u, sc`,
     params: {
        email: email,
     },
     lean: true
   })
}

export const getUserByCredentials = (email, password) => {
    return cypher ( {
      query : `MATCH (u:User)
                WHERE u.email = {email}
                OPTIONAL MATCH (u)-[:HAS]-(sc:SellingCompany)
              return u, sc`,
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

        let hasCompany = res[0].sc != null
        if (hasCompany) {
          return {
            email: email,
            userId: res[0].u.properties.id,
            name : res[0].u.properties.name,
            hasCompany,
            company : res[0].sc.properties,
            is_admin: false
          }

        }
        else {
          return {
            email: email,
            userId: res[0].u.properties.id,
            name : res[0].u.properties.name,
            hasCompany,
            is_admin: false
          }

        }

      }
      else {
          throw new Error('wrong password')
      }
    }
  })
}

export const createSellingCompany = (userId, id, nameSc, siret,image) => cypher({
  query : `MATCH (u:User)
            WHERE u.id = {userId}
            CREATE(sc:SellingCompany {
              id:{id},
              nameSc:{nameSc},
              siret:{siret},
              image:{image}
            }
          )

          CREATE (u)-[has:HAS]->(sc)
          RETURN sc`,

  params: {
      userId: userId,
      id: generateId(id),
      nameSc: nameSc,
      siret: siret,
      image:image,
   },
}).then(res => {
  return res[0].sc.properties
})
// return a Promise which approve with the good result
// or reject with the error code
export const getSellingCompany = (companyId) => {
    return cypher ( {
      query : `MATCH (sc:SellingCompany)
                WHERE sc.id = {companyId}
                OPTIONAL MATCH (u:User)-[:HAS]-(sc)
                OPTIONAL MATCH (sc)-[:SELL]-(p:Product)
              return sc, u, collect(p) as products`,
      params: {
          companyId: companyId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Selling company not found')
    }
    else {
      return{
        company: res[0].sc.properties,
        products: res[0].products.map(x => x.properties),
        owner: omit(res[0].u.properties, 'password')
      }
    }
  })
}
export const getCompanySales = (companyId) => {
    return cypher ( {
      query : `MATCH (sc:SellingCompany)
                WHERE sc.id = {companyId}
                MATCH (sc)-[s:SELL]-(p:Product)
                MATCH (c:Command)-[r:HAS]-(p)
			          MATCH (u:User)-[l:DO]-(c)
              return r, p, u`,
      params: {
          companyId: companyId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Selling company not found')
    }
    else {
      return res.map(row => {
                return {
                  buyer: omit(row.u.properties,'password'),
                  product: row.p.properties,
                  price: row.r.properties.price,
                  quantity: row.r.properties.quantity
                }
              })
    }
  })
}
/*on casse juste la relation avec le user */
export const deleteSellingCompany = (companyId) => {
    return cypher ( {
      query : `MATCH (sc:SellingCompany)
                WHERE sc.id = {companyId}
               	OPTIONAL MATCH (u:User)-[r]-(sc)
				        DELETE r
                SET sc.deletedAt = timestamp()
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

export const getCompanies = () => {
    return cypher ( {
      query : `MATCH (sc:SellingCompany)
                OPTIONAL MATCH (u:User)-[:HAS]-(sc)
                return sc, u`,
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Bad requet')
    }
    else {

      return res.map(row => {
                return {
                    company: row.sc.properties,
                    owner: omit(row.u.properties,'password')
                }
              })
    }
  })
}

export const createProduct = (idSc, id, name, desc, price, quantity, image) => cypher({
  query : `MATCH (sc:SellingCompany)
          WHERE sc.id = {idSc}
          CREATE (p:Product {
                       id:{id},
                       Name:{Name},
                       desc:{desc},
                       price:{price},
                       quantity:{quantity},
                       image: {image}
                     })
        CREATE (sc)-[sell:SELL]->(p)
        RETURN sell`,
  params: {
      idSc: idSc,
      id: generateId(id),
      Name: name,
      desc: desc,
      price: price,
      quantity: quantity,
      image:image,
   },
})

export const updateProduct = (idSc, id, name, desc, price, quantity) => {
// TODO
 return Promise.reject({code:501, description:"Not Implemented"})
}

export const deleteProduct = (id) => {
// TODO
 return Promise.reject({code:501, description:"Not Implemented"})
}

// return a Promise which approve with the good product
// or reject with the error code
export const getProduct = (productId) => {
    return cypher ( {
      query : `MATCH (sc:SellingCompany)-[:SELL]-(p:Product)
                WHERE p.id = {productId}
              return p,sc`,
      params: {
          productId: productId,
       },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error({code:404, description:"Product not found"})
    }
    else {
      return {
        product: res[0].p.properties,
        seller: res[0].sc.properties
      }
    }
  })
}
export const getProducts = () => {
    return cypher ( {
      query : `MATCH (sc:SellingCompany)-[:SELL]-(p:Product)

              return p,sc`,
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Products not found')
    }
    else {
      return res.map(row => {
                return {
                   product: row.p.properties,
                   seller: row.sc.properties,
                }
              })
    }
  })
}
export const getProductsByKeywords = (key) => {
    return cypher ( {
      query : `MATCH (p:Product)
                WHERE LOWER(p.Name) CONTAINS LOWER({key})
              	return p`,
      params: {
                  key: key,
             },
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Bad requet')
    }
    else {

      return res.map(row => {
                return {
                   product: row.p.properties,
                }
              })
    }
  })
}


// The stock quantity is not updated
export const createCommand = (userId, id, products, status = 'PENDING') => {
  let _id = generateId(id)
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
      userId: userId,
      id: _id,
      products: products,
      commandName: `Order ${_id}`,
      status: status
    },
    lean: true
  }).then(() => _id)
}

// return a Promise which approve with the good command
// or reject with the error code
export const getOrder = (orderId) => {
    return cypher ( {
      query : `
        MATCH (c:Command)-[h:HAS]->(p:Product)
        WHERE c.id = {orderId}
        MATCH (sc:SellingCompany)-[:SELL]->(p)
        MATCH (u:User)-[DO]->(c)
        RETURN u as owner, c as order, collect({rowInfo: h, product: p, seller: sc}) as products
      `,
      params: {
          orderId: orderId,
      },
      lean: true
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('Command not found')
    }
    else {
      return {
        owner: omit(res[0].owner, 'password'),
        order: res[0].order,
        products: res[0].products
      }
  }
  })
}
export const getOrders= () => {
    return cypher ( {
      query : ` MATCH (c:Command)-[h:HAS]->(p:Product)
                MATCH (sc:SellingCompany)-[:SELL]->(p)
                MATCH (u:User)-[DO]->(c)
                RETURN u as owner, c as order, collect({rowInfo: h, product: p, seller: sc})  as products`,
                lean: true
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('No command')
    }
    else {

      return res.map(row => {
                return {
                  owner: omit(res[0].owner, 'password'),
                  order: res[0].order,
                  products: res[0].products
                }
              })
    }
  })
}

export const getUserOrders= (userId) => {
    return cypher ( {
      query : ` MATCH (u:User)-[DO]->(c)
                WHERE u.id = {userId}
                MATCH (c:Command)-[h:HAS]->(p:Product)
                MATCH (sc:SellingCompany)-[:SELL]->(p)
                RETURN c as order, collect({rowInfo: h, product: p, seller: sc})  as products`,
                params:{
                  userId:userId
                },
                lean: true
     }
  ).then(res => {
    if (res.length < 1) {
      throw new Error('No command')
    }
    else {

      return res.map(row => {
                return {
                  order: res[0].order,
                  products: res[0].products
                }
              })
    }
  })
}
export const getUserNotifications= (userId) => {
    return cypher ( {
      query : ` MATCH (n:Notification)-[concern]->(u:User)
                WHERE u.id = {userId}
                RETURN n`,
                params:{
                  userId:userId
                },
                lean: true
     }
  ).then(res => {
      console.log(res);
      return res.map(row => Object.assign({}, row.n, {
        content: JSON.parse(row.n.content)
      }))
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
        id: generateId(id),
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


export const getJournalsByUser = (userId) =>  cypher ({
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
      throw new Error({code:404, description:"Product not found"})
    }
    else {
    return res
    }
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
        id: generateId(id),
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
export const createNotification = (userId, id, content, type, creationDate, readingDate) => {
  console.log(content);
  console.log(JSON.stringify(content));
  return cypher({
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
        id: generateId(id),
        content: JSON.stringify(content),
        type: type,
        creationDate: creationDate || new Date(),
        readingDate:readingDate ? readingDate : null
      }
    })
    .then(res => {
      if (res.length < 1) {
        throw new Error('Bad request')
      }
      else {
        return res;
      }
  })
}

      export const readNotification = (notifId) => {
          return cypher ( {
            query : `MATCH (n:Notification)
                      WHERE n.id = {notifId}
                      SET n.readingDate = timestamp()
                     return n`,
            params: {
                notifId: notifId,
             },
           }
        ).then(res => {
          if (res.length < 1) {
            throw new Error('you cannot read this Notification')
          }
          else {
           return res
          }
        })
      }
