describe("Testing for FizzBuzz multiples of 3 and 5 below a certain number summed together", () => {
  const uniqueKey = `INPUT_TO_TEST${Number(process.argv[4])}`;
  const data = JSON.parse(process.env[uniqueKey]);
  console.log("delete from here"); // DO NOT DELETE - we use this log to mark where to slice the stdout in order to capture the user's console logs
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const addFizzBuzzMultiples = new Function("num", funcPart);

  beforeEach(() => {
    console.log(`new test:`);
  });

  test("FizzBuzz multiples should sum to 0 if sent an integer of less than 4", () => {
    expect(addFizzBuzzMultiples(1)).toBe(0);
    expect(addFizzBuzzMultiples(2)).toBe(0);
    expect(addFizzBuzzMultiples(3)).toBe(0);
  });
  test("FizzBuzz multiples should sum to 3 if sent an integer of at least 5", () => {
    input = 5;
    expectedOutput = 3;

    expect(addFizzBuzzMultiples(input)).toBe(expectedOutput);
  });
  test("FizzBuzz multiples should sum to 8 if given an integer of 6", () => {
    input = 6;
    expectedOutput = 8;

    expect(addFizzBuzzMultiples(input)).toBe(expectedOutput);
  });
  test("FizzBuzz multiples should sum to 23 if given an integer of 10", () => {
    input = 10;
    expectedOutput = 23;

    expect(addFizzBuzzMultiples(input)).toBe(expectedOutput);
  });
  test("FizzBuzz multiples should sum to 33 if given an integer of 12", () => {
    input = 12;
    expectedOutput = 33;

    expect(addFizzBuzzMultiples(input)).toBe(expectedOutput);
  });
  test("FizzBuzz multiples should sum to 2318 if given an integer of 100", () => {
    input = 100;
    expectedOutput = 2318;

    expect(addFizzBuzzMultiples(input)).toBe(expectedOutput);
  });
});
