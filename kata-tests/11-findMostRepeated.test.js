describe("findMostRepeated()", () => {
  const uniqueKey = `INPUT_TO_TEST${Number(process.argv[4])}`;
  const data = JSON.parse(process.env[uniqueKey]);
  console.log("delete from here"); // DO NOT DELETE - we use this log to mark where to slice the stdout in order to capture the user's console logs
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const findMostRepeated = new Function("array", funcPart);

  test("An empty array should return an empty element array with null repeats", () => {
    //arrange
    const testArr = [];

    //act
    const result = findMostRepeated(testArr);

    //assert
    expect(result).toEqual({
      elements: [],
      repeats: null,
    });
  });
  test("An array with no repeated elements should return with an emtpy element array with null repeats", () => {
    //arrange
    const testArr = ["foo", "bar", "hello", "world"];

    //act
    const result = findMostRepeated(testArr);

    //assert
    expect(result).toEqual({
      elements: [],
      repeats: null,
    });
  });
  test("An array with one repeating element should return an array with that element and the number of times it repeats", () => {
    //arrange
    const testArr = ["foo", "foo", "bar", "hello", "world"];

    //act
    const result = findMostRepeated(testArr);

    //assert
    expect(result).toEqual({
      elements: ["foo"],
      repeats: 2,
    });
  });
  test("An array with multiple repeating elements should return an array with the most repeated elements and the number of times they repeat", () => {
    //arrange
    const testArr = [
      "foo",
      "foo",
      1,
      2,
      3,
      "bar",
      2,
      3,
      4,
      "bar",
      "bar",
      "foo",
    ];

    //act
    const result = findMostRepeated(testArr);

    //assert
    expect(result).toEqual({
      elements: ["foo", "bar"],
      repeats: 3,
    });
  });
});
