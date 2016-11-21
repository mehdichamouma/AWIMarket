import getDB from "../../persistence"

let companiesService = {}

// Access : all
companiesService.getCompanies = () => {
  return getDB().getCompanies()
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

// Access : all
companiesService.getCompany = (companyId) => {
  if(companyId != undefined && typeof companyId == "string")
  {
    return getDB().getSellingCompany(companyId)
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

// Access : SC
companiesService.updateCompany = (companyId, req) => {
  let data = req.body
  let user = req.user

  if(user == null) {
    return Promise.reject({code:401, description:"You need to be log."})
  }
  if(!data.company) {
    return Promise.reject({code:400, description:"Bad Request"})
  }
  let p = data.company
  if(typeof p.companyName == "string" &&
    typeof p.siret == "string"
    ) {
    return Promise.reject({code:400, description:"Bad Request"})
  }

  return getDB().getUser(user.id)
  .then((userFromDb) => {
    if(userFromDb.company) {
      if(companyId == userFromDb.company.id) {
        return getDB().updateSellingCompany(userFromDb.company.id, p.companyName, p.siret)
      }
      return Promise.reject({code:401, description:"It's not your company"})
    }
    return Promise.reject({code:401, description:"You can't udate a company"})
  })
}

companiesService.getOrders = (companyId) => {
  if(companyId != undefined && companyId instanceof String)
  {
    return getDB().getOrdersByCompanyId(companyId)
  }
  return Promise.reject({code:400, description:"Bad Request"})
}

export default companiesService
