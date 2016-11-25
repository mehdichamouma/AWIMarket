import getDb from "../../persistence"
import promisify from "es6-promisify"
import jwt from "jsonwebtoken"
import mediasService from "../../medias"
import usersService from "../users/"
import fetch from "node-fetch"

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

export const authenticateWithFacebook = (fbToken) => {
  return fetch(`https://graph.facebook.com/v2.8/me?access_token=${fbToken}&fields=picture.width(640),name,email`)
  .then(res => res.json())
  .then(fbUser => {
    console.log(fbUser);
    let {id: fbId, name, picture} = fbUser
    console.log(fbId);
    return getDb()
          .getUserByFacebookId(fbId)
          .then(user => {
            console.log("okok");
            if(!user) {
              console.log("user not found");
              return mediasService.uploadJpgFromUrl(picture.data.url)
              .then((media) => {
                let fileName = media.fileName
                let newUser = {
                  name: name,
                  email: null,
                  password: null,
                  address: null,
                  phone: null,
                  birthday: null,
                  profilePicture: media.fileName,
                  facebookId: fbId
                }
                console.log(newUser);
                console.log("ok");
                return usersService.createUser(newUser)
              })
              .then(createdUser => {
                console.log("each");
                //console.log(createdUser);
                console.log(fbId);
                return getDb().getUserByFacebookId(fbId)
              })

            }
            console.log("user exists");
            return Promise.resolve(user)
          })
          .catch(e => {
            console.error(e);
          })
  })
  .then(user => generateToken(user))
}


export const decodeToken = (token) => jwt.decode(token)
