import { Request, Response, NextFunction } from "express";
const {
  insertSolutionToTests,
  insertSolutionToSolutions,
} = require("../models/kata-test.models");
const { fetchKataByID } = require("../models/katas.models");

module.exports.postSolutionToTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const solutionToTest: string = req.body.solution_body;
  const user_id: number = req.body.user_id;
  const { kata_id } = req.params;
  try {
    const { test_path } = await fetchKataByID(kata_id);
    const results = await insertSolutionToTests(
      user_id,
      solutionToTest,
      kata_id,
      test_path
    );
    if (results.success) {
      const postedSolutionObj: object = await insertSolutionToSolutions(
        user_id,
        solutionToTest,
        kata_id
      );
      results.posted_solution = true;
    }
    res.status(201).send({ results });
  } catch (err: any) {
    console.log(err, "<< err in catch controller");
    const code: number = err.status;
    res.status(code).send(err);
  }
};
