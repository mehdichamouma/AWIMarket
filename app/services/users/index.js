import getDB from "../../persistence"

let usersService = {}

// getUsers()
usersService.getUsers = () => {
  return getDB().getUsers()
}

usersService.getUserById = (userId) => {
  return getDB().getUser(userId)
  .catch((error) => {
    return Promise.reject({code:404, description:"User not found"})
  })
}

// Simple User

// createSimpleUser
usersService.createUser = (id, firstName, lastName, email, password, adresse) => {
  return getDB().createUser(id, firstName, lastName, email, password, adresse)
}

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

export default usersService
