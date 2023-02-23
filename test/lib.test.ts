import checkEmail from "../src/lib"

describe("Check Email by multilayer pipelines", () => {
  it("reachable", async () => {
    const result = await checkEmail("chotnt741@gmail.com")
    expect(result.reachable).toBe(true)
  })

  it("unreachable", async () => {
    const result = await checkEmail("chotnt7111@gmail.com")
    expect(result.reachable).toBe(true)
  })
})
