describe("squareRoot()", () => {
  const uniqueKey = `INPUT_TO_TEST${process.argv[3]}`;
  const data = JSON.parse(process.env[uniqueKey]);
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const squareRoot = new Function("dna", funcPart);

  test("should be a function", () => {
    expect(typeof squareRoot).toBe("function");
  });
  test("should return the square root of n when n is a whole integer", () => {
    expect(squareRoot(81)).toBe(9);
  });
  test("should return the square root of n when n is not a whole integer", () => {
    expect(squareRoot(63545)).toBe(252.08133608024215);
  });
});
