import getDB from "../../persistence"

let usersService = {}

usersService.getUsers = () => {
  //return Promise.reject({code:501, description:"Not Implemented"})
  return getDB().getUsers()
}

usersService.createUser = (data) => {
  //return Promise.reject({code:501, description:"Not Implemented"})
  let {
    name,
    email,
    password,
    address = null,
    phone = null,
    birthday = null,
    profilePicture
  } = data
  return getDB().getUserByEmail(email)
  .then((results) => {
    console.log(results);
    if(results.length != 0) {
      return Promise.reject({code: 400, description: "email is taken"})
    }
    return getDB().createUser(undefined, name, email, password, address, phone, birthday, false, profilePicture)
  })
  .catch(error => {
    if(error.code) {
      return Promise.reject(error)
    }
    return Promise.reject({code: 400, description: "invalid user data"})
  })
}

usersService.getUserByEmail = (email) => {
  return getDB().getUserByEmail(email)
}

usersService.getUser = (userId) => {
  return getDB().getUser(userId)
  .catch((error) => {
    return Promise.reject({code:404, description:"User not found"})
  })
}

usersService.updateUser = (userId) => {
  return Promise.reject({code:501, description:"Not Implemented"})
  return getDB().getUser(userId)
  .catch((error) => {
    return Promise.reject({code:404, description:"User not found"})
  })
}

usersService.deleteUser = (userId) => {
  return Promise.reject({code:501, description:"Not Implemented"})
  return getDB().getUser(userId)
  .catch((error) => {
    return Promise.reject({code:404, description:"User not found"})
  })
}






/*
// Simple User

// getSimpleUsers()
usersService.getSimpleUsers = () => {
  return getDB().getSimpleUsers()
}

// getSimpleUser(userId)
usersService.getSimpleUser = (userId) => {
  return getDB().getSimpleUser(userId)
}

// updateSimpleUser(user)
usersService.updateSimpleUser = (user) => {
  return getDB().updateSimpleUser(user)
}


// Selling company

// createSimpleUser
usersService.createSellingCompany = (sellingCompany) => {
  return getDB().createSellingCompany(sellingCompany)
}

// getSellingCompanies()
usersService.getSellingCompanies = () => {
  return getDB().getSellingCompanies()
}

// getSimpleUser(userId)
usersService.getSellingCompany = (userId) => {
  return getDB().getSellingCompany(userId)
}

// updateSimpleUser(user)
usersService.updateSellingCompany = (sellingCompany) => {
  return getDB().updateSellingCompany(sellingCompany)
}
*/

export default usersService
