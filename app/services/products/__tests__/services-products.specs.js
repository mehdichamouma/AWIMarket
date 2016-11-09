import {getProducts} from ".."
import {expect} from "chai"

describe("Products Service", () => {
  describe("getProducts()", () => {
    it("should return an array of product", () => {
      let products = getProducts()
      expect(products).to.have.lengthOf(3)
    })
  })
})
