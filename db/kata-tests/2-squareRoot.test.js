describe("squareRoot()", () => {
  const data = process.argv[4];
  console.log("delete from here"); // DO NOT DELETE - we use this log to mark where to slice the stdout in order to capture the user's console logs
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const squareRoot = new Function("num", funcPart);

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
