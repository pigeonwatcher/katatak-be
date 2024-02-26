"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { insertSolutionToTests, insertSolutionToSolutions, } = require("../models/kata-test.models");
const { fetchKataByID } = require("../models/katas.models");
module.exports.postSolutionToTests = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const solutionToTest = req.body.solution_body;
    const user_id = req.body.user_id;
    const { kata_id } = req.params;
    try {
        const { test_path } = yield fetchKataByID(kata_id);
        const results = yield insertSolutionToTests(user_id, solutionToTest, kata_id, test_path);
        if (results.success) {
            const postedSolutionObj = yield insertSolutionToSolutions(user_id, solutionToTest, kata_id);
            results.posted_solution = true;
        }
        // console.log(results, "<< results");
        res.status(201).send({ results });
    }
    catch (err) {
        const code = err.status;
        res.status(code).send(err);
    }
});
