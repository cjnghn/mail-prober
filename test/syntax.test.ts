import { checkSyntax } from "../src/syntax";

describe("Validate Email by REGEX", () => {
  it("If email is validate, set SyntaxResult.valid as true", () => {
    const syntax = checkSyntax("chotnt741@gmail.com");

    expect(syntax.valid).toBe(true);
    expect(syntax.username).toBe("chotnt741");
    expect(syntax.domain).toBe("gmail.com");
  });

  it("If email is validate, set SyntaxResult.valid as false", () => {
    const syntax = checkSyntax("chotnt741@gmailcom");

    expect(syntax.valid).toBe(false);
  });
});
