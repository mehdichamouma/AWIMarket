import {initDb, getLabels, getDb, createJournal} from ".."
import config from "../../../../config"

describe("Graph db", () => {
  describe("initDb", () => {
    it("should initialize db", () => {
      initDb(config.DB_TEST_URL)
      console.log(getDb());
    })
    it("should initialize labels", () => {
      console.log(getLabels());
    })
  })

  describe("createJournal", () => {
    it("should create a journal", () => {
      return createJournal().then(data => {
        console.log(data[0].t.labels);
        console.log(data[0].t.properties);
      })
    })
  })
})
