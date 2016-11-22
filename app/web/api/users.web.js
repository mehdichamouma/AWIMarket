import express from "express"
import usersService from "../../services/users"
import mediasService from "../../medias"

let router = express.Router()

router.get("/", (req, res) => {
  usersService.getUsers()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/", (req, res) => {
  usersService.createUser(req.body)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.get("/:userId", (req, res) => {
  usersService.getUser(req.params.userId)
  .then((result) => {
    let json = Object.assign({}, result)
    json.user.profilePicture = mediasService.getUrl(json.user.profilePicture)
    if(json.company) {
      json.company.image = mediasService.getUrl(json.company.image)
    }
    res.status(200).json(json)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.put("/:userId", (req, res) => {
  usersService.updateUser(req.params.userId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.delete("/:userId", (req, res) => {
  usersService.deleteUser(req.params.userId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

export default router
