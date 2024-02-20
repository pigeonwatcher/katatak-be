import {describe, xdescribe, expect, test, afterAll, beforeEach} from '@jest/globals';
const testData = require('../db/data/test-data/index')
const { seed } = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

xdescribe('katas', () => {
    describe('api/katas', () => {
        test('GET: 200 Returns an array of all kata objects', () => {
    
        })
    })
    describe('api/katas/:kata_id', () => {
        test('GET: 200 Returns a kata object with a matching kata id', () => {
    
        })
        test('GET: 400 Returns an error if given an invalid kata id', () => {
    
        })
        test('GET: 404 Returns an error if given a non-existent kata id', () => {
    
        })
    })
})