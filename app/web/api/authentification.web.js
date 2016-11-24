import express from "express"
let router = express.Router()
import {authenticate, refresh} from "../../services/authentification"
import auth from "basic-auth"

import usersService from "../../services/users"
/**
 * GET /api/auth/token
 *
 * Check the AUTHORIZATION header and extract the credentials from it
 * using BASIC Authentication
 * Then, call the authentication Service to authenticate the credentials
 * and return a generated JSON Web Token in case of success
 *
 * - Send 200 with the token if credentials match
 * - Send 403 if credentials doesn't match
 * - Send 400 if missing Authorization header
 */
router.get("/token", (req, res) => {
  let o = auth(req)
  if(o) {
    let {name: email, pass: password} = o
    authenticate(email, password).then((token) => {
      res.json({
        token: token
      })
    })
    .catch((e) => {
      console.error(e);
      res.status(403).json({
        error: "authentication failed"
      })
    })
  }
  else {
    res.status(400).json({
      error: "missing or invalid basic authentication header"
    })
  }

})

router.post("/signup", (req, res) => {
  usersService.createUser(req.body)
  .then((result) => {
    return authenticate(req.body.email, req.body.password).then((token) => {
      res.status(200).json({
        token
      })
    })
  })
  .catch((result) => {
    console.log(result);
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/refresh", (req, res)=> {
  refresh(req.body.token)
  .then(newToken => {
    res.json({
      token: newToken
    })
  })
})
export default router
