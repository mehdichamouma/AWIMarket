import urlJoin from "url-join"
/**
 * AWIMARKET API CLIENT
 * helpers to fetch data from the AWIMARKET API
 */


//promises
//

const BASE_URI = "http://localhost:3010/api"

const request = (endpoint, ...params) => {
  return fetch(urlJoin(BASE_URI, endpoint), ...params)
}

export const fetchUserJournals = (userId) => {
  return request("journals")
  .then((res) => {
    return res.json()
  })
  .then(data => {
    return data
  })
}


export const authenticate = (email, password) => {
  let credentials = new Buffer(`${email}:${password}`, 'utf8').toString('base64')
  return request("auth/token", {
    headers: {
      'Authorization': `Basic ${credentials}`
    }
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    else {
      throw new Error("Authentication failed")
    }
  })
}
// new async await
//
// export const fetchUserJournals = async (userId) => {
//   let res = await fetch("http://localhost:3010/api/journals")
//   let json = await res.json()
//   return json
//
// }

//call back hell
//
// fetchGoogleCoordinates("adresse", (lat, long) => {
//   putInDb(lat, long, (resultDB) => {
//     sendBackToUser(resultDB.id, () => {
//       console.log(ok);
//     })
//   })
// })


//create a promise from scratch
//
// export const f = () => {
//   return new Promise((resolve, reject) => {
//     // long calcul .....
//     // requete etc
//     resolve(abc)
//     ou
//     reject()
//   })
// }
