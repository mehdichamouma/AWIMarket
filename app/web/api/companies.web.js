import express from "express"
import companiesService from "../../services/companies"
import mediasService from "../../medias"

let router = express.Router()

router.get("/", (req, res) => {
  companiesService.getCompanies()
  .then((result) => {
    result.forEach(row => {
      row.company.image = mediasService.getUrl(row.company.image)
    })
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

router.post("/", (req, res) => {
  //companiesService.createCompany(req)
  companiesService.createCompany(req)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    if(result.code) {
      res.status(result.code)
      .send(result.description);
    }
    res.status(500).send("companiesService.createCompany")
  })
})

router.get("/:companyId", (req, res) => {
  companiesService.getCompany(req.params.companyId)
  .then((result) => {
    let json = Object.assign({}, result)
    json.products = json.products.map(p => ({
      ...p,
      image: mediasService.getUrl(p.image)
    }))
    json.company.image = mediasService.getUrl(json.company.image)
    res.status(200).json(json)
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

router.get("/:companyId/sales", (req, res) => {
  companiesService.getCompanySales(req.params.companyId)
  .then((result) => {
    res.status(200).json(result)
  })
  .catch((result) => {
    res.status(result.code)
    .send(result.description);
  })
})

export default router
