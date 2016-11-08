import {getJournalsByUser} from ".."
import {expect} from "chai"

describe("Journals Service", () => {
  describe("getJournalsByUser()", () => {
    it("should return an array of journals", () => {
      getJournalsByUser("user01")
      .then((journals) => {
        expect(journals).to.have.lengthOf(4)
      })
    })
  })
})
