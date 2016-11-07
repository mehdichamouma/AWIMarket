import {getJournals} from ".."
import {expect} from "chai"

describe("Journals Service", () => {
  describe("getJournals()", () => {
    it("should return an array of journals", () => {
      let journals = getJournals()
      expect(journals).to.have.lengthOf(3)
    })
  })
})
