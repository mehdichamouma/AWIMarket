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
  getNotification,
  readNotification,
  deleteSellingCompany,
  getSellingCompany,
  getCompanies

} from ".."
import config from "../../../../config"
import populateDb from "../../../utils/populateDb"
import {expect} from "chai"


let userKeys = ["id", "name", "birthday", "address", "email", "phone", "is_admin"]
let companyKeys = ["id", "nameSc", "siret"]
let productKeys = ["id", "name", "quantity", "price"]

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
        return createProduct('1','1','bois','bois rouge',80, 100).then(data => {
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
        return createSellingCompany("7","1",'VachorCompany','ER5555E').then(data => {
          expect(data).to.have.all.keys(companyKeys)
          expect(data.id).to.eql("7")
        })
      })
    })

    //USERS

    describe("createUser", () => {
      it("should create a user", () => {
        return createUser("5",'nassim','vachor','nass@hotmail.fr','azerty','colombiere').then(data => {
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
          console.log(data);
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
          expect(data).to.have.a.lengthOf(3) //
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
          expect(data).to.have.all.keys(['hasCompany', 'is_admin', 'name', 'userId', 'email'])
        })
      })
      it("should get a user without sc", () => {
        return getUserByCredentials('arnaud@gmail.com', 'azerty').then(data => {
          expect(data.hasCompany).to.be.false
        })
      })
    })

    describe("getUser", () => {
      it("should get a user", () => {
        return getUser("1").then(data => {
          expect(data).to.have.all.keys(["user", "journals", "nbCommands"])
          expect(data.journals).to.have.lengthOf(3)
        })
      })
    })

    describe("getUserOrders", () => {
      it("should return the user orders", () => {
        let userId = "3"
        return getUserOrders(userId).then(data => {
          expect(data).to.have.lengthOf(2)
          data.forEach(row => {
            expect(row).to.have.all.keys(orderKeys)
          })
        })
      })
    })

    //PRODUCTS

    describe("getProduct", () => {
      it("should get a product", () => {
        return getProduct("1").then(data => {

        })
      })
    })

    describe("getProducts", () => {
      it("should get all Product if no keyword", () => {
        return getProducts().then(data => {
          expect(data).to.have.a.lengthOf(5)
          data.forEach(d => {
            expect(d).to.have.all.keys(['product', 'seller'])
            expect(d.product).to.have.all.keys(productKeys)
            expect(d.seller).to.have.all.keys(companyKeys)
          })
        })
      })

      it("should return the filtered products by keyword", () => {
        return getProducts('A').then(data => {
          expect(data).to.have.a.lengthOf(3)
          let productNames = data.map(x => x.product.Name)
          expect(productNames).to.have.members(['product A1', 'product A2', 'product A3'])
        })
      })
    })
    //NOTIFICATIONS

    describe("getNotification", () => {
      it("should get a Notification", () => {
        return getNotification("1").then(data => {

        })
      })
    })

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
            expect(row).to.have.all.keys(orderKeys)
          })
        })

      })
    })

    describe("getOrder", () => {
      it("should get the order", () => {
        let orderId = 1
        return getOrder().then(data => {
          expect(data).to.have.all.keys(["order", "products", "owner"])
          expect(data.order).to.have.all.keys(orderKeys)
          expect(data.owner).to.have.all.keys(userKeys)
          data.products.forEach(row => {
            expect(row).to.have.all.keys(["product", "seller", ""])
            expect(product).to.have.all.keys(productKeys)
          })
        })
      })
    })
  })
})
