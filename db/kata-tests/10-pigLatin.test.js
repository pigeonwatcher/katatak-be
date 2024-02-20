const pigLatin = require("../pig-latin.js")

describe("pigLatin function", () => {
    it("Should return an empty string if given an empty string", () => {
        expect(pigLatin("")).toBe("");
    })
    it("If original word starts with a vowel, should return it back with\"way\" appended", () => {
        expect(pigLatin("Arnold")).toBe("Arnoldway");
        expect(pigLatin("igloo")).toBe("iglooway");
        expect(pigLatin("umbrella")).toBe("umbrellaway");
    })
    it("If original word starts with a single consonant, should return it back with the original letter and \"ay\" attached to the end of it", () => {
        expect(pigLatin("Dave")).toBe("aveday");
        expect(pigLatin("pen")).toBe("enpay");
        expect(pigLatin("coffee")).toBe("offeecay");
    })
    it("If original word begins with multiple consonants, should return it back with beginning consonants and \"ay\" attached to the end of it", () => {
        expect(pigLatin("sharp")).toBe("arpshay");
        expect(pigLatin("chair")).toBe("airchay");
        expect(pigLatin("thrill")).toBe("illthray");
    })
    it("Gives the Pig Latin for full sentences", () => {
        expect(pigLatin("The quick brown fox jumped over the lazy dog")).toBe("ethay uickqay ownbray oxfay umpedjay overway ethay azylay ogday");
        expect(pigLatin("Another test sentence on the way")).toBe("Anotherway esttay entencesay onway ethay ayway");
        expect(pigLatin("Third time lucky")).toBe("irdthay imetay uckylay")
    })
})