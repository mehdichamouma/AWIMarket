import urlJoin from "url-join"
import config from "../../config"
import io from "socket.io-client"
/**
 * AWIMARKET API CLIENT
 * helpers to fetch data from the AWIMARKET API
 */


//promises
//

const BASE_URI = config.API_BASE_URL
let token

export const setToken = (token) => token = token

const request = (endpoint, ...params) => {
  let url = urlJoin(BASE_URI, "api", endpoint)
  let [userOptions = {}, ...otherParams] = params
  let {headers = {}, ...otherOptions} = userOptions
  let secureHeaders = {}
  if(token) {
    secureHeaders = {
      'Authorization': token
    }
  }
  let options = {
    ...otherOptions,
    headers: {
      ...secureHeaders,
      ...headers
    }
  }
  console.log(options);
  return fetch(url, options, ...otherParams)
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

export const fetchProducts = () => {
  return request("products")
  .then((res) => res.json())
  .then(data => {
    let products = data.map(row => row.product)
    console.log(products);
    return products
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
  .then((data) => {
    console.log(data);
    console.log(data.token);
    token = data.token
    return data
  })
}

let notificationSocket
export const getNotificationSocket = () => {
    if(!notificationSocket) {
      notificationSocket = io(urlJoin(BASE_URI, "sockets", "notifications"))
      notificationSocket.emit("authenticate", token)
    }

    return notificationSocket
}

export const me = () => {
  return Promise.resolve({
    user: {

    },
    company: {

    },
    roles: ['ADMIN', 'SELLING_COMPANY_OWNER'],
    notifications: [
      {
        type: 'ABC',
        payload: {
          'a': 'b'
        }
      },
      {
        type: 'ABC',
        payload: {
          'a': 'b'
        }
      },
      {
        type: 'ABC',
        payload: {
          'a': 'b'
        }
      },
    ]
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
