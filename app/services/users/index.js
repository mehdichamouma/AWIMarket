import getDB from "../../persistence"

// getUsers()
export const getUsers = () => {
  return getDB().getUsers()
}

// Simple User

// createSimpleUser
export const createUser = (id,firstName, lastName, email, password, adresse) => {
  return getDB().createUser(id,firstName, lastName, email, password, adresse)
}

// getSimpleUsers()
export const getSimpleUsers = () => {
  return getDB().getSimpleUsers()
}

// getSimpleUser(userId)
export const getSimpleUser = (userId) => {
  return getDB().getSimpleUser(userId)
}

// updateSimpleUser(user)
export const updateSimpleUser = (user) => {
  return getDB().updateSimpleUser(user)
}


// Selling company

// createSimpleUser
export const createSellingCompany = (sellingCompany) => {
  return getDB().createSellingCompany(sellingCompany)
}

// getSellingCompanies()
export const getSellingCompanies = () => {
  return getDB().getSellingCompanies()
}

// getSimpleUser(userId)
export const getSellingCompany = (userId) => {
  return getDB().getSellingCompany(userId)
}

// updateSimpleUser(user)
export const updateSellingCompany = (sellingCompany) => {
  return getDB().updateSellingCompany(sellingCompany)
}
