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
  'getUserByEmail',
  'getUserByCredentials',
  'getSimpleUsers',
  'getSimpleUser',
  'getUser',
  'getUserOrders',
  'getUserNotifications',
  'getCompanies',
  'getSellingCompany',
  'getCompanySales',
  'deleteSellingCompany',
  'createUser',
  'createSellingCompany',
  'updateSimpleUser',
  'createJournal',
  'createEntry',
  'createObjective',
  'createNotification',
  'readNotification',


  'getOrders',
  'getOrder',
  'getJournalsByUser',
  'getProducts',
  'getProduct',
  'getProductsByKeywords',
  'getProductsAtPage',
  'getProductsFromSeller',
  'getProductsFromSellerAtPage',
  'getUserByFacebookId',
  'createProduct',
  'updateProduct',
  'deleteProduct',

  'createCommand'
]
