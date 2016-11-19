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
  getSellingCompany

} from ".."
import config from "../../../../config"
import populateDb from "../../../utils/populateDb"
import {expect} from "chai"


let userKeys = ["id", "name", "birthday", "address", "email", "phone", "is_admin"]
let companyKeys = ["id", "name", "siret"]

let clean = () => populateDb(config.DB_TEST_URL)

describe("Graph db", () => {
  before(clean)
  after(clean)
  //WRITE OPERATIONS
  describe("write operations", () => {
    //NOTIFICATIONS

    describe("createNotification", () => {
      it("should create a Notification", () => {
        return createNotification("1"," 1", 'validate Order','for User', new Date(), '').then(data => {

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
          expect(data).to.have.lengthOf(4)
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

    //USERS
    describe("getUserByCredentials", () => {
      it("should get a user with sc", () => {
        return getUserByCredentials('mehdi@gmail.com', 'azerty').then(data => {
          expect(data.hasCompany).to.be.true
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

    //PRODUCTS

    describe("getProduct", () => {
      it("should get a product", () => {
        return getProduct("1").then(data => {

        })
      })
    })

    describe("getProducts", () => {
      it("should get all Product", () => {
        return getProducts().then(data => {

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
  })
})
