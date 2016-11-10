import {createDbService} from ".."
import {expect} from "chai"

describe("persitence service", () => {
  let db
  describe("createDbService", () => {
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

      db = createDbService([db1, db2])
      expect(db).to.contains.all.keys(
        ['getUsers', 'getUserByCredentials', 'getCommands']
      )
      Object.keys(db).forEach(m => {
        expect(db[m]).to.be.a("function")
      })
    })

  })

  describe("returned service", () => {
    it("should call the db1.getUsers", () => {
      expect(db.getUsers()).to.eql(['a', 'b', 'c'])
    })

    it("should call the db2.getUserByCredentials", () => {
      expect(db.getUserByCredentials()).to.eql('ok')
    })

    it("should throw an Error", () => {
      expect(() => db.getCommands()).to.throws(Error)
    })
  })
})
