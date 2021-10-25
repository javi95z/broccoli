import { isEmpty, isNegative } from "../utils"

describe("utils", () => {
  test(".isEmpty", () => {
    expect(isEmpty()).toBe(true)
    expect(isEmpty(1)).toBe(true)
    expect(isEmpty(NaN)).toBe(true)
    expect(isEmpty(false)).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ test: "example" })).toBe(false)
  })

  test(".isNegative", () => {
    expect(isNegative()).toBe(false)
    expect(isNegative("")).toBe(false)
    expect(isNegative({})).toBe(false)
    expect(isNegative(NaN)).toBe(false)
    expect(isNegative(1)).toBe(false)
    expect(isNegative(1.23e5)).toBe(false)
    expect(isNegative(-0.23e5)).toBe(true)
    expect(isNegative(-99)).toBe(true)
  })
})
