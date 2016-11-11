import {getUsers} from ".."
import {expect} from "chai"

describe("Users Service", () => {
  describe("getUsers()", () => {
    it("should return an array of users", () => {
      let users = getUsers()
      expect(users).to.have.lengthOf(3)
    })
  })
})
