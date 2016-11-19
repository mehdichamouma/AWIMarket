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


describe("Graph db", () => {
  // before (()=>{
  //
  //   return initDb(config.DB_TEST_URL)
  // })
  beforeEach(() => {
    return populateDb(config.DB_TEST_URL).then(() => {
      console.log("database reinitialized");
    })
  })
  // describe("initDb", () => {
  //   it("should initialize db", () => {
  //     initDb(config.DB_TEST_URL)
  //     console.log(getDb());
  //   })
  //   it("should initialize labels", () => {
  //     console.log(getLabels());
  //   })
  // })


  describe("createUser", () => {
    it("should create a user", () => {
      return createUser("5",'nassim','vachor','nass@hotmail.fr','azerty','colombiere').then(data => {
        console.log(data[0].t.labels);
        console.log(data[0].t.properties);
      })
    })
  })

  describe("createSellingCompany", () => {
    it("should create a SC", () => {
      return createSellingCompany("7","1",'VachorCompany','ER5555E').then(data => {
        console.log(data[0]);
      })
    })
  })

  describe("getSellingCompany", () => {
    it("should get a SC", () => {
      return getSellingCompany("1").then(data => {
        expect(data).to.eql({
          id: "1",
          nameSc: "company 1",
          siret: "abc",
        })
      })
    })
  })
  describe("deleteSellingCompany", () => {
    it("should delete a relatiship between user and a SC", () => {
      return deleteSellingCompany('1').then(data => {
        console.log(data[0]);
      })
    })
  })
  describe("createProduct", () => {
    it("should create a Product", () => {
      return createProduct('1','1','bois','bois rouge',80, 100).then(data => {
        console.log(data[0]);
      })
    })
  })
  describe("getProducts", () => {
    it("should get all Product", () => {
      return getProducts().then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("createJournal", () => {
    it("should create a Journal", () => {
      return createJournal("1", "8", 'facebook', new Date()).then(data => {
        console.log(data[0]);


      })
    })
  })

  describe("createEntry", () => {
    it("should create an Entry", () => {
      return createEntry("1","6", 'Mehdi le BG', 'text', '', new Date()).then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("createObjective", () => {
    it("should create an Objective", () => {
      return createObjective("5", "1", 'Mehdi le BG').then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("createNotification", () => {
    it("should create a Notification", () => {
      return createNotification("1"," 1", 'validate Order','for User', new Date(), '').then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("getNotification", () => {
    it("should get a Notification", () => {
      return getNotification("1").then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("getProduct", () => {
    it("should get a product", () => {
      return getProduct("1").then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("getUser", () => {
    it("should get a user", () => {
      return getUser("1").then(data => {
        expect(data).to.have.all.keys(["user", "journals", "nbCommands"])
        expect(data.journals).to.have.lengthOf(3)
        console.log(data.user);
        console.log(data.journals);
        console.log(data.nbCommands);
      })
    })
  })
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

})
