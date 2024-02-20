const foldString = require("../fold-string.js");

describe("foldString function", () => {
    it("Will return a string unchanged if equal to or less than length 3", () => {
        expect(foldString("")).toBe("");
        expect(foldString("a")).toBe("a");
        expect(foldString("ab")).toBe("ab");
        expect(foldString("abc")).toBe("abc");
    })
    it("Will return an even letter string inside out if given a string four characters or longer", () => {
        expect(foldString("code")).toBe("oced");
        expect(foldString("circular")).toBe("cricralu");
    })
    it("Will return an odd letter string with the central letter unchanged, and outside letters flipped", () => {
        expect(foldString("coder")).toBe("ocdre");
        expect(foldString("central")).toBe("nectlar");
    })
})