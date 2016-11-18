import {
  initDb,
  clearDb,
  getLabels,
  getDb,
  createJournal,
  createUser,
  createSellingCompany,
  createProduct,
  createEntry,
  createObjective,
  createNotification,
  getNotification,
  readNotification

} from ".."
import config from "../../../../config"


describe("Graph db", () => {
  before( () => {
    initDb(config.DB_TEST_URL)
    return clearDb()
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
      return createUser(1,'nassim','vachor','nass@hotmail.fr','azerty','colombiere').then(data => {
        console.log(data[0].t.labels);
        console.log(data[0].t.properties);
      })
    })
  })

  describe("createSellingCompany", () => {
    it("should create a SC", () => {
      return createSellingCompany(1,1,'VachorCompany','ER5555E').then(data => {
        console.log(data[0].has);
        console.log(data[0]);
      })
    })
  })
  describe("createProduct", () => {
    it("should create a Product", () => {
      return createProduct(1,1,'bois','bois rouge',80, 100).then(data => {
        console.log(data[0].sell);

      })
    })
  })

  describe("createJournal", () => {
    it("should create a Journal", () => {
      return createJournal(1, 1, 'facebook', new Date()).then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("createEntry", () => {
    it("should create an Entry", () => {
      return createEntry(1, 1, 'Mehdi le BG', 'text', '', new Date()).then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("createObjective", () => {
    it("should create an Objective", () => {
      return createObjective(1, 1, 'Mehdi le BG').then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("createNotification", () => {
    it("should create a Notification", () => {
      return createNotification(1, 1, 'validate Order','for User', new Date(), '').then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("getNotification", () => {
    it("should get a Notification", () => {
      return getNotification(1).then(data => {
        console.log(data[0]);

      })
    })
  })
  describe("readNotification", () => {
    it("should readNotification a Notification", () => {
      return readNotification(1).then(data => {
        console.log(data[0]);

      })
    })
  })

})
