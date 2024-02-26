describe("fillSquare()", () => {
  const uniqueKey = `INPUT_TO_TEST${Number(process.argv[4])}`;
  const data = JSON.parse(process.env[uniqueKey]);
  console.log("delete from here"); // DO NOT DELETE - we use this log to mark where to slice the stdout in order to capture the user's console logs
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const fillSquare = new Function("array", funcPart);

  test("should return an array of nested arrays with null added to fill any sub arrays, when passed an array with the same number of nested arrays as the length of the first array", () => {
    const square = [[1, 2, 3], [1, 2], [1]];
    const filledSquare = [
      [1, 2, 3],
      [1, 2, null],
      [1, null, null],
    ];
    expect(fillSquare(square)).toEqual(filledSquare);
  });
  test("should return an array of nested arrays with null added to fill any sub array, when passed an array where the longest row is not the first row", () => {
    const sq = [[1, 2], [1, 2, 3], [1]];
    const filledSquare = [
      [1, 2, null],
      [1, 2, 3],
      [1, null, null],
    ];
    expect(fillSquare(sq)).toEqual(filledSquare);
  });
  test("should return an array of nested arrays with null added to fill any sub array, when passed an array where the longest row is longer than the number of nested arrays (requiring adding additional rows at the bottom of the matrix)", () => {
    const sq = [[1, 2, 3], [1, 2, 3, 4, 5, 6], [1]];
    const filledSquare = [
      [1, 2, 3, null, null, null],
      [1, 2, 3, 4, 5, 6],
      [1, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
    expect(fillSquare(sq)).toEqual(filledSquare);
  });
  test("should return an array of nested arrays with null added to fill any sub array, when passed an array which length is longer than any of the nested arrays", () => {
    const sq = [[1, 2, 3], [1, 2, 3], [1], [], [1, 2, 3], [1]];
    const filledSquare = [
      [1, 2, 3, null, null, null],
      [1, 2, 3, null, null, null],
      [1, null, null, null, null, null],
      [null, null, null, null, null, null],
      [1, 2, 3, null, null, null],
      [1, null, null, null, null, null],
    ];
    expect(fillSquare(sq)).toEqual(filledSquare);
  });
});
