import urlJoin from "url-join"
import config from "../../config"
import io from "socket.io-client"
import querystring from "querystring"

/**
 * AWIMARKET API CLIENT
 * helpers to fetch data from the AWIMARKET API
 */


//promises
//

const BASE_URI = config.API_BASE_URL
let token

export const setToken = (t) => token = t

const request = (endpoint, ...params) => {
  let url = urlJoin(BASE_URI, "api", endpoint)
  let requestHeaders = {}
  let [userOptions = {}, ...otherParams] = params
  let {headers = {}, ...otherOptions} = userOptions
  if(token) {
    requestHeaders["Authorization"] = token
  }
  let options = Object.assign({}, otherOptions)
  Object.assign(requestHeaders, headers)
  if(!(otherOptions.body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json"
    options.body = JSON.stringify(otherOptions.body)
  }

  Object.assign(options, {headers: requestHeaders})


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

export const fetchProducts = (keywords) => {
  let qs = ""
  if(keywords) {
    qs = "?" + querystring.stringify({keywords})
  }
  return request("products" + qs)
  .then((res) => res.json())
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
  return request("me").then(res => res.json())
}

export const upload = (file) => {
  let formData = new FormData()
  formData.append("media", file)
  return request("medias", {
    method: 'POST',
    body: formData
  })
  .then((res) => res.json())
}

export const createCompany = (data) => {
  console.log(data);
  return request("companies", {
    method: 'POST',
    body: {
      company: data
    }
  })
}

export const fetchProduct = (productId) => {
  return request(`products/${productId}`)
}

export const fetchCompanies = () => {
  return request(`companies`)
}

export const fetchUser = (userId) => {
  return request(`users/${userId}`)
}

export const signup = (data) => {
  return request(`auth/signup`, {
    method: "POST",
    body: data
  })
}

export const refreshToken = (token) => {
  return request(`auth/refresh`, {
    method: "POST",
    body: {
      token: token
    }
  })
  .then(res => res.json())
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
