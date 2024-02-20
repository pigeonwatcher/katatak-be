describe("getTweetData", () => {
  const uniqueKey = `INPUT_TO_TEST${process.argv[3]}`;
  const data = JSON.parse(process.env[uniqueKey]);
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const getTweetData = new Function("tweet", funcPart);
  test("returns an object", () => {
    expect(typeof getTweetData("a tweet")).toBe("object");
  });
  test("returns an object when passed an empty string", () => {
    expect(typeof getTweetData("")).toBe("object");
  });
  test("returns correct object if tweet has no mentions or hashtags", () => {
    const tweet1 = "my awesome tweet";
    const tweet1Return = {
      tags: [],
      mentions: [],
      tagCount: 0,
      mentionCount: 0,
      length: 16,
    };
    expect(getTweetData(tweet1)).toEqual(tweet1Return);
  });
  test("returns correct object if tweet has one mention", () => {
    const tweet2 = "My awesome tweet to @northcoders";
    const tweet2Return = {
      tags: [],
      mentions: ["@northcoders"],
      tagCount: 0,
      mentionCount: 1,
      length: 32,
    };
    expect(getTweetData(tweet2)).toEqual(tweet2Return);
  });
  test("returns correct object if tweet has one hashtag", () => {
    const tweet3 = "My awesome tweet about #coding";
    const tweet3Return = {
      tags: ["#coding"],
      mentions: [],
      tagCount: 1,
      mentionCount: 0,
      length: 30,
    };
    expect(getTweetData(tweet3)).toEqual(tweet3Return);
  });
  test("returns correct object if passed tweet with multiple mentions and tags, showing data of unique mentions and tags", () => {
    const tweet4 =
      "I am #coding with @northcoders I love #coding and @northcoders";
    const tweet4Return = {
      tags: ["#coding"],
      mentions: ["@northcoders"],
      tagCount: 1,
      mentionCount: 1,
      length: 62,
    };
    expect(getTweetData(tweet4)).toEqual(tweet4Return);
  });
});
