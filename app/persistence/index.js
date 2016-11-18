let db

export default () => {
  if(!db) {
    throw new Error("DB instance not configured")
  }
  return db
}

export const configureDbService = (services) => {
  let call = (method, params) => {
    let i = 0
    let m = null

    while (i<services.length && !m) {
      if(services[i][method]) {
        m = services[i][method]
      }
      i = i+1
    }

    if(!m) {
      throw new Error("Can't call " + method + " because no services implement it")
    }

    return m(...params)
  }

  db = methods.reduce((o, m) => {
    o[m] = (...params) => call(m, params)
    return o
  }, {})
}

let methods = [
  // Users
  'getUsers',
  'getUserByCredentials',
  'getSimpleUsers',
  'getSimpleUser',
  'getUser',
  'getSellingCompanies',
  'getSellingCompany',
  'deleteSellingCompany',
  'createUser',
  'createSellingCompany',
  'updateSimpleUser',
  'createJournal',
  'createEntry',
  'createObjective',
  'createNotification',
  'getNotification',
  'readNotification',


  'getCommands',
  'getJournalsByUser',
  'getProducts',
  'getProduct',
  'getProductsAtPage',
  'getProductsFromSeller',
  'getProductsFromSellerAtPage',
  'createProduct',
  'updateProduct'
]
