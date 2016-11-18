import express from "express"
import usersService from "../../services/users"

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
  res.status(501)
  .send("Not Implemented")
})

router.get("/:userId", (req, res) => {
  usersService.getUserById(req.params.userId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.put("/:userId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

router.delete("/:userId", (req, res) => {
  res.status(501)
  .send("Not Implemented")
})

export default router
