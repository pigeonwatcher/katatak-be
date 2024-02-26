describe("foldString function", () => {
  const uniqueKey = `INPUT_TO_TEST${Number(process.argv[4])}`;
  const data = JSON.parse(process.env[uniqueKey]);
  console.log("delete from here"); // DO NOT DELETE - we use this log to mark where to slice the stdout in order to capture the user's console logs
  const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
  const foldString = new Function("string", funcPart);

  it("Will return a string unchanged if equal to or less than length 3", () => {
    expect(foldString("")).toBe("");
    expect(foldString("a")).toBe("a");
    expect(foldString("ab")).toBe("ab");
    expect(foldString("abc")).toBe("abc");
  });
  it("Will return an even letter string inside out if given a string four characters or longer", () => {
    expect(foldString("code")).toBe("oced");
    expect(foldString("circular")).toBe("cricralu");
  });
  it("Will return an odd letter string with the central letter unchanged, and outside letters flipped", () => {
    expect(foldString("coder")).toBe("ocdre");
    expect(foldString("central")).toBe("nectlar");
  });
});
