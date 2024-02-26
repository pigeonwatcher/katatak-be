describe("changeCalculator", () => {
  const uniqueKey = `INPUT_TO_TEST${Number(process.argv[4])}`;
  const data = JSON.parse(process.env[uniqueKey]);
  console.log("delete from here"); // DO NOT DELETE - we use this log to mark where to slice the stdout in order to capture the user's console logs
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const changeCalculator = new Function("num", funcPart);

  beforeEach(() => {
    console.log(`new test:`);
  });

  test("should return an object", () => {
    expect(typeof changeCalculator(1)).toBe("object");
  });
  test("should return correct object when change is just a penny", () => {
    expect(changeCalculator(1)).toEqual({ "1p": 1 });
  });
  test("should return correct object when change is under 10p", () => {
    expect(changeCalculator(8)).toEqual({ "5p": 1, "2p": 1, "1p": 1 });
  });
  test("should return correct object when change is under a pound", () => {
    expect(changeCalculator(13)).toEqual({ "10p": 1, "2p": 1, "1p": 1 });
  });
  test("should return correct object when change is under five pounds", () => {
    expect(changeCalculator(256)).toEqual({
      "£2": 1,
      "50p": 1,
      "5p": 1,
      "1p": 1,
    });
  });
});
