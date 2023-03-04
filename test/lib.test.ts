import { checkEmail } from "../src/index";

describe("Check Email by multilayer pipelines", () => {
  it("reachable", async () => {
    const result = await checkEmail("chotnt741@gmail.com");
    expect(result.reachable).toBe(true);
  });

  it("unreachable", async () => {
    const result = await checkEmail("chotnt999@gmail.com");
    expect(result.reachable).toBe(false);
  });
});
