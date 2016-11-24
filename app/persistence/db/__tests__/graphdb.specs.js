import {
  initDb,
  clearDb,
  getLabels,
  getDb,
  createJournal,
  createUser,
  getUser,
  getUserByCredentials,
  getUsers,
  createSellingCompany,
  createProduct,
  getProducts,
  getProduct,
  createEntry,
  createObjective,
  createNotification,
  readNotification,
  deleteSellingCompany,
  getSellingCompany,
  getCompanies,
  getCompanySales,
  getProductsByKeywords,
  getOrders,
  getOrder,
  getUserOrders,
  getUserNotifications

} from ".."
import config from "../../../../config"
import populateDb from "../../../utils/populateDb"
import {expect} from "chai"


let userKeys = ["id", "name", "birthday", "address", "email", "phone", "is_admin", "profilePicture"]
let companyKeys = ["id", "nameSc", "siret", "image"]
let productKeys = ["id", "Name" , "desc" , "price" , "quantity", "image"]
let orderKeys = ["id","name"]
let notificationsKeys= ["id","content","type","creationDate","readingDate"]

let clean = () => populateDb(config.DB_TEST_URL)

describe("Graph db", () => {
  before(clean)
  after(clean)
  //WRITE OPERATIONS
  describe("write operations", () => {
    //NOTIFICATIONS

    describe("createNotification", () => {
      let n = {
        id: "4",
        userId: "1",
        content: {a: "b", c:"d"},
        type: "NEW_COMMAND"
      }
      it("should create a Notification", () => {
        return createNotification(n.userId, n.id, n.content, n.type).then(data => {

        })
      })
    })

    //JOURNAL

    describe("createJournal", () => {
      it("should create a Journal", () => {
        return createJournal("1", "8", 'facebook', new Date()).then(data => {


        })
      })
    })

    describe("createObjective", () => {
      it("should create an Objective", () => {
        return createObjective("5", "1", 'Mehdi le BG').then(data => {

        })
      })
    })

    describe("createEntry", () => {
      it("should create an Entry", () => {
        return createEntry("1","6", 'Mehdi le BG', 'text', '', new Date()).then(data => {

        })
      })
    })

    //PRODUCTS

    describe("createProduct", () => {
      it("should create a Product", () => {
        return createProduct('1','1','bois','bois rouge',80, 100,'080a3a58-c3a9-46f3-9481-dc61704027dd.jpg').then(data => {
        })
      })
    })

    //COMPANIES

    describe("deleteSellingCompany", () => {
      it("should delete a relatiship between user and a SC", () => {
        return deleteSellingCompany('1').then(data => {
        })
      })
    })

    describe("createSellingCompany", () => {
      it("should create a SC", () => {
        return createSellingCompany("1","1",'VachorCompany','ER5555E','585b23a9-f185-4ab1-95c6-6ec94fe71462.jpg' ).then(data => {
          expect(data).to.have.all.keys(companyKeys)
        })
      })
    })

    //USERS

    describe("createUser", () => {
      it("should create a user", () => {
        return createUser("5",'nassim','nass@hotmail.fr','azerty','colombiere','','',false, '4119ea64-31c5-46ec-8743-c9ca9575637d.jpg').then(data => {
        })

      })
    })

  })



  //READ OPERATIONS
  describe("read operations", () => {
    before(clean)
    //COMPANIES
    describe("getCompanies", () => {
      it("should return the companies", () => {
        return getCompanies().then(data => {
          data.forEach(row => {
            expect(row).to.have.all.keys(["company", "owner"])
            expect(row.company).to.have.all.keys(companyKeys)
            expect(row.owner).to.have.all.keys(userKeys)
          })
        })
      })
    })

    describe("getSellingCompany", () => {
      it("should get a SC", () => {
        return getSellingCompany("1").then(data => {
          expect(data).to.have.all.keys(['company', 'products', 'owner'])
          expect(data.owner).to.have.all.keys(userKeys)
          expect(data.owner.id).to.eql("1")
          expect(data.company).to.have.all.keys(companyKeys)
          expect(data.company.id).to.eql("1")
        })
      })
    })

    describe("getCompanySales", () => {
      it("should return the company sales", () => {
        let companyId = "1"
        return getCompanySales(companyId).then(data => {
          data.forEach(row => {
            expect(row).to.have.all.keys(["buyer", "product", "price", "quantity"])
            expect(row.buyer).to.have.all.keys(userKeys)
            expect(row.product).to.have.all.keys(productKeys)
            if(row.shipmentDate) {
              expect(row.shipmentData).to.be.a(Date)
            }
          })
        })
      })
    })

    //USERS
    describe("getUserByCredentials", () => {
      it("should get a user with sc", () => {
        return getUserByCredentials('mehdi@gmail.com', 'azerty').then(data => {
          expect(data.hasCompany).to.be.true
          expect(data).to.have.all.keys(['hasCompany', 'is_admin', 'name', 'userId', 'email', 'company'])
        })
      })
      it("should get a user without sc", () => {
        return getUserByCredentials('arnaud@gmail.com', 'azerty').then(data => {
          expect(data).to.have.all.keys(['hasCompany', 'is_admin', 'name', 'userId', 'email'])
          expect(data.hasCompany).to.be.false
        })
      })
    })

    describe("getUser", () => {
      it("should get a user with sc", () => {
        return getUser("1").then(data => {
          expect(data).to.have.all.keys(["user", "journals", "nbCommands","hasCompany","company"])
          expect(data.journals).to.have.lengthOf(3)
        })
      })
      it("should get a user without sc", () => {
        return getUser("3").then(data => {
          expect(data).to.have.all.keys(["user", "journals", "nbCommands","hasCompany"])
          expect(data.journals).to.have.lengthOf(1)
        })
      })
    })

    describe("getUserOrders", () => {
      it("should return the user orders", () => {
        let userId = "3"
        return getUserOrders(userId).then(data => {
          expect(data).to.have.lengthOf(2)
          data.forEach(row => {
            expect(row).to.have.all.keys(["order", "products"])
            expect(row.order).to.have.all.keys(orderKeys)
            row.products.forEach(row => {
              expect(row).to.have.all.keys(["product", "seller", "rowInfo"])
              expect(row.product).to.have.all.keys(productKeys),
              expect(row.rowInfo).to.have.all.keys(["quantity", "price"]),
              expect(row.seller).to.have.all.keys(companyKeys)
            })

          })
        })
      })
    })

    describe("getUsers", () => {
      it("should return the users", () => {
        return getUsers().then(data => {
          expect(data).to.have.a.lengthOf(3)
          data.forEach(row => {
            expect(row).to.contain.all.keys(["user"])
            expect(row.user).to.have.all.keys(userKeys)
            if(row.company) {
              expect(row.company).to.have.all.keys(companyKeys)
            }
          })
          let usersWithCompanies = data.filter(r => r.company)
          let adminUsers = data.filter(r => r.user.is_admin)
          expect(usersWithCompanies).to.have.a.lengthOf(2)
          expect(adminUsers).to.have.a.lengthOf(1)
        })
      })
    })

    describe("getAdmins", () => {
      it("should return the admins", () => {
        return getAdmins().then(data => {
          expect(data).to.have.a.lengthOf(1)
          expect(data[0].user.id).to.eql("1")
        })
      })
    })

    describe("getUserByFacebookId", () => {
      it("should return null if the user does not exist", () => {
        let invalidFacebookId = "anInvalidFbId"
        return getUserByFacebookId(invalidFacebookId)
        .then(user => {
          expect(user).to.be.null
        })
      })

      it("should return the user if facebook id exists", () => {
        let validFacebookId = "aFakeFbUserIdForMehdi"
        return getUserByFacebookId(validFacebookId)
        .then(user => {
          expect(data).to.have.all.keys(['hasCompany', 'is_admin', 'name', 'userId', 'email', 'company'])
          expect(data.userId).to.eql("1")
          expect(data.hasCompany).to.be.true
          expect(data.is_admin).to.be.true
        })
      })
    })
    //PRODUCTS

    describe("getProduct", () => {
      it("should get a product", () => {
        return getProduct("1").then(data => {
          expect(data).to.have.all.keys(['product', 'seller']),
          expect(data.product).to.have.all.keys(productKeys),
          expect(data.seller).to.have.all.keys(companyKeys)

        })
      })
    })

    describe("getProducts", () => {
      it("should get all Product", () => {
        return getProducts().then(data => {
          expect(data).to.have.a.lengthOf(5)
          data.forEach(d => {
            expect(d).to.have.all.keys(['product', 'seller'])
            expect(d.product).to.have.all.keys(productKeys)
            expect(d.seller).to.have.all.keys(companyKeys)
          })
        })
      })
    })

    describe("getProductsByKeywords", () => {
      it("should return the filtered products by keyword", () => {
        return getProductsByKeywords('A').then(data => {
          expect(data).to.have.a.lengthOf(3)
          let productNames = data.map(x => x.product.Name)
          expect(productNames).to.have.members(['product A1', 'product A2', 'product A3'])
        })
      })
    })

    //NOTIFICATIONS

    describe("getUserNotifications", () => {
      it("should get the user notifications", () => {
        return getUserNotifications("1").then(data => {
          expect(data).to.have.a.lengthOf(2)
          data.forEach(row => {
            expect(row).to.have.all.keys(notificationsKeys)
          })
        })
      })
    })

    //ORDERS

    describe("getOrders", () => {
      it("should get the orders", () => {
        return getOrders().then(data => {
          expect(data).to.have.lengthOf(3)
          data.forEach(row => {
            expect(row).to.have.all.keys(["order", "products", "owner"])
            expect(row.owner).to.have.all.keys(userKeys)
            expect(row.order).to.have.all.keys(orderKeys)
            row.products.forEach(row => {
              expect(row).to.have.all.keys(["product", "seller", "rowInfo"])
              expect(row.product).to.have.all.keys(productKeys),
              expect(row.rowInfo).to.have.all.keys(["quantity", "price"]),
              expect(row.seller).to.have.all.keys(companyKeys)
            })
          })
        })

      })
    })

    describe("getOrder", () => {
      it("should get the order", () => {
        let orderId = "1"
        return getOrder(orderId).then(data => {
          expect(data).to.have.all.keys(["order", "products", "owner"])
          expect(data.order).to.have.all.keys(orderKeys)
          expect(data.owner).to.have.all.keys(userKeys)
          expect(data.products).to.have.a.lengthOf(2)
          data.products.forEach(row => {
            expect(row).to.have.all.keys(["product", "seller", "rowInfo"])
            expect(row.product).to.have.all.keys(productKeys),
            expect(row.rowInfo).to.have.all.keys(["quantity", "price"]),
            expect(row.seller).to.have.all.keys(companyKeys)
          })
        })
      })
    })
  })
})
