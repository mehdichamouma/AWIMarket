import getDb from "../../persistence"
import promisify from "es6-promisify"
import jwt from "jsonwebtoken"

let secret = "shouldBeChanged"

export const authenticate = (email, password) => {
  console.log(email, password);
  return getDb()
  .getUserByCredentials(email, password)
  .then((data) => {
    console.log(data);
    return generateToken(data)
  })
}

export const generateToken = (user) => {
  let roles = []
  user.isAdmin && roles.push("ADMIN")
  user.hasCompany && roles.push("SELLING_COMPANY_OWNER")
  return jwt.sign({
    id: String(user.userId),
    email: user.email,
    roles,
  }, secret)
}

export const refresh = (token) => {
  let user = decodeToken(token)
  if(user) {
    return getDb()
    .getUser(user.id)
    .then(data => {
      console.log(data);
      return generateToken(data.user)
    })
  }
  return Promise.reject({code: "401", "description": "invalid token"})
}
export const decodeToken = (token) => jwt.decode(token)
