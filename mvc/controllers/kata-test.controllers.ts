import { Request, Response, NextFunction } from "express";
const { insertSolutionToTests } = require("../models/kata-test.models");
const { fetchKataByID } = require("../models/katas.models");

module.exports.postSolutionToTests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body, "<< req.body in controller");
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
    console.log(results, "<< test_results in controller");
    res.status(201).send({ results });
  } catch (err) {
    next(err);
  }
};
