import getDb, {configureDbService} from ".."
import {expect} from "chai"

describe("persitence service", () => {
  describe("getDb not configured", () => {
    it("should throw an error", () => {
      expect(() => getDb()).to.throws(Error)
    })
  })
  describe("configureDbService", () => {
    it("should return a persistence service", () => {
      let db1 = {
        getUsers: () => ['a', 'b', 'c'],
        //getUserByCredentials: (userid, pwd) => 'ok',
        //getCommands: () => 'db1'
      }
      let db2 = {
        getUsers: () => ['d', 'e', 'f'],
        getUserByCredentials: (userid, pwd) => 'ok',
        //getCommands: () => 'db2'
      }

      configureDbService([db1, db2])
      let db = getDb()
      
      expect(db).to.contains.all.keys(
        ['getUsers', 'getUserByCredentials', 'getCommands']
      )
      Object.keys(db).forEach(m => {
        expect(db[m]).to.be.a("function")
      })
    })

  })

  describe("db configured", () => {
    it("should call the db1.getUsers", () => {
      expect(getDb().getUsers()).to.eql(['a', 'b', 'c'])
    })

    it("should call the db2.getUserByCredentials", () => {
      expect(getDb().getUserByCredentials()).to.eql('ok')
    })

    it("should throw an Error", () => {
      expect(() => getDb().getCommands()).to.throws(Error)
    })
  })
})
