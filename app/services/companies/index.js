import getDB from "../../persistence"

let companiesService = {}

companiesService.getCompanies = () => {
  return getDB().getSellingCompanies()
}

// Access : User without company
companiesService.createCompany = (req) => {
  let user = req.user
  let data = req.body
  if(user != null && !user.roles.includes("SELLING_COMPANY_OWNER")) {
    return getDB().getUser(user.id)
    .then((userFromDb) => {
      if(!userFromDb.hasCompany) {
        if(data.company) {
          let p = data.company
          if(typeof p.companyName == "string" &&
            typeof p.siret == "string"
          ) {
            return getDB().createSellingCompany(user.id, undefined, p.companyName, p.siret)
          }
        }
        return Promise.reject({code:400, description:"Bad Request"})
      }
      return Promise.reject({code:401, description:"You already have a company"})
    })
  }
  return Promise.reject({code:401, description:"You already have a company"})
}

companiesService.getCompany = (companyId) => {
  if(companyId != undefined && companyId instanceof String)
  {
    return getDB().getSellingCompany(companyId)
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

companiesService.updateCompany = (companyId, data) => {
  if(data.company != undefined) {
    let p = data.company
    if(p.companyName != undefined && p.companyName instanceof String &&
      p.siret != undefined && p.siret instanceof String
      ) {
      return getDB().updateSellingCompany(companyId, p.companyName, p.siret)
    }
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

companiesService.getOrders = (companyId) => {
  if(companyId != undefined && companyId instanceof String)
  {
    return getDB().getOrdersByCompanyId(companyId)
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

export default companiesService
