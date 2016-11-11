import express from "express"
let router = express.Router()
import {authenticate} from "../../services/authentification"
import auth from "basic-auth"

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
      error: "missing basic authentication header"
    })
  }

})

export default router
