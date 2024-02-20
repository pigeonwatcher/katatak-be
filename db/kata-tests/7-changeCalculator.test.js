const changeCalculator = require('../change-calculator/change-calculator.js')

describe("changeCalculator", () => {
    
    test("should return an object", () => {
        expect(typeof changeCalculator(1)).toBe('object')
    })
    test("should return correct object when change is just a penny", () => {
        expect(changeCalculator(1)).toEqual({'1p':1})
    })
    test("should return correct object when change is under 10p", () => {
        expect(changeCalculator(8)).toEqual({'5p':1,'2p':1,'1p':1})
    })
     test("should return correct object when change is under a pound", () => {
        expect(changeCalculator(13)).toEqual({'10p':1,'2p':1,'1p':1})
     })
    test("should return correct object when change is under five pounds", () => {
        expect(changeCalculator(256)).toEqual({'£2':1,'50p':1,'5p':1,'1p':1})
    })
})