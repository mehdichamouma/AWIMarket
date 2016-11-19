import getDB from "../../persistence"
import uuid from "uuid"

let companiesService = {}

companiesService.getCompanies = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

companiesService.createCompany = () => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

companiesService.getCompany = (id) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

companiesService.updateCompany = (id) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

companiesService.getOrders = (id) => {
  return Promise.reject({code:501, description:"Not Implemented"})
}

export default companiesService
