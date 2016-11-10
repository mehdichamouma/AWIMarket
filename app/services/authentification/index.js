import getDb from "../../persistence"
import promisify from "es6-promisify"
import jwt from "jsonwebtoken"

let secret = "shouldBeChanged"

export const authenticate = (email, password) => {
  console.log(email, password);
  return getDb()
  .getUserByCredentials(email, password)
  .then((data) => jwt.sign(data, secret))
}

export const decodeToken = (token) => jwt.decode(token)
