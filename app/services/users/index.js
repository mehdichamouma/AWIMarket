import getDB from "../../persistence"

let usersService = {}

usersService.getUsers = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
  return getDB().getUsers()
}

usersService.createUser = (data) => {
  return Promise.reject({code:501, description:"Not Implemented"})
  return getDB().createUser(id, firstName, lastName, email, password, adresse)
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
