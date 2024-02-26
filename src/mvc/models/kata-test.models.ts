import { exec } from "child_process";
const { db } = require("../../db/connection");

type individualTestObj = {
  pass: boolean;
  description: string;
  logs: object;
};

module.exports.insertSolutionToTests = async (
  user_id: number,
  solutionToTest: string,
  kata_id: number,
  test_path: string
) => {
  if (!user_id) {
    return Promise.reject({
      status: 400,
      msg: "400 Bad Request: Can't check the solution without user_id!",
    });
  }
  if (!solutionToTest || solutionToTest.length === 0) {
    return Promise.reject({
      status: 400,
      msg: "400 Bad Request: Can't check the solution without the solution!",
    });
  }

  return new Promise((resolve, reject) => {
    // const timer: any = setTimeout(() => {
    //   clearTimeout(timer);
    //   reject({
    //     status: 408,
    //     msg: "408: Request timeout - check for an infinite loop..",
    //   });
    // }, 25000);

    let id: string;
    if (kata_id < 10) {
      id = `0${kata_id}`;
    } else {
      id = `${kata_id}`;
    }
    exec(
      `npm run test-prod ./kata-tests/${test_path} ${id} "${solutionToTest}"`,
      (error: any, stdout: string, stderr: string) => {
        const consoleArr: string[] = stdout.split("new test:");
        const allLogs: object[] = [];
        // const usefulLogs: string[] = allLogs.slice(
        //   allLogs.indexOf("delete from here") + 1,
        //   allLogs.length
        // );
        consoleArr.shift();
        consoleArr.forEach((testsLogs) => {
          const innerArr: string[] = [];
          const stringedArr: string[] = testsLogs.split("\n");
          stringedArr.map((item) => {
            if (
              item.slice(0, 11) != "      at db" &&
              item.slice(0, 15) != "      at Object" &&
              item.slice(0, 15) != "      at eval (" &&
              item != "> test" &&
              item.slice(0, 6) != "> jest" &&
              item.slice(0, 9) != "> katatak" &&
              item.slice(0, 12) != "> PGDATABASE" &&
              item != "  console.log" &&
              item.trim() != ""
            ) {
              innerArr.push(item.trim());
            }
          });
          allLogs.push(innerArr);
        });

        if (error) {
          const test_list = stderr.slice(
            stderr.indexOf(".js") + 5,
            stderr.indexOf(" ●")
          );

          const charBeforeTick: RegExp = /(?=✓|✕)/g;

          const tests = test_list.split(charBeforeTick);
          tests.shift();

          let counter: number = 0;
          const testObjArr: individualTestObj[] = tests.map(
            (result: string) => {
              const pass: boolean = result.includes("✓");
              let description: string = "";
              if (pass) {
                description += result.split("✓").join("");
              } else {
                description += result.split("✕").join("");
              }

              const testObj: individualTestObj = {
                pass: pass,
                description: description,
                logs: allLogs[counter],
              };
              counter++;
              return testObj;
            }
          );

          //
          const success: boolean = false;
          //clearTimeout(timer);
          resolve({
            success: false,
            //stderr: stderr,
            //stdout: stdout,
            test_results: testObjArr,
            logs: allLogs,
            posted_solution: false,
          });
        } else {
          //clearTimeout(timer);
          const test_list: string = stderr.slice(
            stderr.indexOf(".js") + 5,
            stderr.indexOf("Test Suites")
          );
          const charBeforeTick: RegExp = /(?=✓|✕)/g;

          const tests = test_list.split(charBeforeTick);
          tests.shift();

          let counter: number = 0;
          const testObjArr: individualTestObj[] = tests.map(
            (result: string) => {
              const pass: boolean = result.includes("✓");
              let description: string = "";
              if (pass) {
                description += result.split("✓").join("");
              } else {
                description += result.split("✕").join("");
              }

              const testObj: individualTestObj = {
                pass: pass,
                description: description,
                logs: allLogs[counter],
              };
              counter++;
              return testObj;
            }
          );
          resolve({
            success: true,
            //stderr: stderr,
            //stdout: stdout,
            test_results: testObjArr,
            logs: allLogs,
            posted_solution: false,
          });
        }
      }
    );
  });
};

module.exports.insertSolutionToSolutions = async (
  user_id: number,
  solutionToPost: string,
  kata_id: number
) => {
  const values: (string | number)[] = [user_id, kata_id, solutionToPost];
  const queryStr = `INSERT INTO solutions (user_id, kata_id, solution) VALUES ($1, $2, $3) RETURNING *;`;
  try {
    const { rows } = await db.query(queryStr, values);
    return rows[0];
  } catch (err: any) {
    if (err.code === "23503") {
      return Promise.reject({
        status: 404,
        msg: "404 Not Found: Couldn't find a user with that ID.",
      });
    }
  }
};
