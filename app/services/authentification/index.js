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
    let roles = []
    data.isAdmin && roles.push("ADMIN")
    data.hasCompany && roles.push("SELLING_COMPANY_OWNER")
    return jwt.sign({
      id: data.userId,
      email: data.email,
      roles,
    }, secret)
  })
}

export const decodeToken = (token) => jwt.decode(token)
