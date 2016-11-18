import express from "express"
import companiesService from "../../services/companies"

let router = express.Router()

router.get("/", (req, res) => {
  companiesService.getCompanies()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/", (req, res) => {
  companiesService.createCompany()
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.get("/:companyId", (req, res) => {
  companiesService.getCompany(req.params.companyId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.put("/:companyId", (req, res) => {
  companiesService.updateCompany(req.params.companyId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.get("/:companyId/orders", (req, res) => {
  companiesService.getOrders(req.params.companyId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

export default router
