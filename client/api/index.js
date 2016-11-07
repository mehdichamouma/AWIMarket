//promises
//

export const fetchUserJournals = (userId) => {
  return fetch("http://localhost:3010/api/journals")
  .then((res) => {
    return res.json()
  })
  .then(data => {
    return data
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
