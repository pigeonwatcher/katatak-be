describe("Sentence To Camel Case Testing", () => {
    const data = process.argv[4];
    console.log("delete from here"); // DO NOT DELETE - we use this log to mark where to slice the stdout in order to capture the user's console logs
    const funcPart = data.slice(data.indexOf("{") + 1, data.length - 1).trim();
    const sentenceToCamelCase = new Function("str", "isCamelCase", funcPart);

    test("Should return an empty string if given an empty string and boolean", () => {
        //arrange
        sentence = "";
        //act
        upperCase = sentenceToCamelCase(sentence, true);
        lowerCase = sentenceToCamelCase(sentence, false);

        //assert
        expect(upperCase).toBe("");
        expect(lowerCase).toBe("");
    })
    test("Should take a single word string and a boolean and convert to upper case camel if true and lower case camel if false", () => {
        //arrange
        sentence = "code";

        //act
        upperCase = sentenceToCamelCase(sentence, true);
        lowerCase = sentenceToCamelCase(sentence, false);

        //assert
        expect(upperCase).toBe("Code");
        expect(lowerCase).toBe("code");
    })
    test("Should take a multiple word string and a boolean and convert to upper case camel if true and lower case camel if false", () => {
        //arrange
        sentence = "code fries my little brain";

        //act
        upperCase = sentenceToCamelCase(sentence, true);
        lowerCase = sentenceToCamelCase(sentence, false);

        //assert
        expect(upperCase).toBe("CodeFriesMyLittleBrain");
        expect(lowerCase).toBe("codeFriesMyLittleBrain");
    })
    test("Should take a multiple word string with mixed capitalisation and convert to upper camel case if true and lower cmael case if false", () => {
        //arrange
        sentence = "in the Ning Nang nong where The Cows go Bong";

        //act
        upperCase = sentenceToCamelCase(sentence, true);
        lowerCase = sentenceToCamelCase(sentence, false);

        //assert
        expect(upperCase).toBe("InTheNingNangNongWhereTheCowsGoBong");
        expect(lowerCase).toBe("inTheNingNangNongWhereTheCowsGoBong");
    })
    test("Should take a multiple word string with mixed casing throughout and return the correct case based on the boolean", () => {
        //arrange
        sentence = "anD thE MonkEyS Go JibbER JABber JOo";

        //act
        upperCase = sentenceToCamelCase(sentence, true);
        lowerCase = sentenceToCamelCase(sentence, false);

        //assert
        expect(upperCase).toBe("AndTheMonkeysGoJibberJabberJoo");
        expect(lowerCase).toBe("andTheMonkeysGoJibberJabberJoo");
    })
})