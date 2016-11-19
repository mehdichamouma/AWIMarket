import getDb from "../../persistence"
import promisify from "es6-promisify"
import jwt from "jsonwebtoken"

let secret = "shouldBeChanged"

export const authenticate = (email, password) => {
  console.log(email, password);
  return getDb()
  .getUserByCredentials(email, password)
  .then((data) => {
    return jwt.sign({
      id: data.id,
      roles: ["ADMIN", "SELLING_COMPANY_OWNER"]
    }, secret)
  })
}

export const decodeToken = (token) => jwt.decode(token)
