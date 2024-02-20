//const { exec, ExecException } = require('child_process');
const { promisify } = require("util");
import { exec, ExecException } from "child_process";

//const execAsync = promisify(exec);

module.exports.insertSolutionToTests = async (
  user_id: number,
  solutionToTest: string,
  kata_id: number,
  test_path: string
) => {
  console.log(user_id, solutionToTest, kata_id, test_path, "<< in model");

  //const uniqueKey: string = `INPUT_TO_TEST${user_id}`;
  //process.env[uniqueKey] = JSON.stringify(solutionToTest);
  //console.log(process.env[uniqueKey], "<< process.env[uniqueKey] in model");

  //   const {
  //     error,
  //     stdout,
  //     stderr,
  //   }: { error: ExecException; stdout: string; stderr: string } = await execAsync(
  //     `npm run test ${test_path} ${user_id} '${solutionToTest}'`
  //   );
  return new Promise((resolve, reject) => {
    exec(
      `npm run test ${test_path} ${user_id} "${solutionToTest}"`,
      (error, stdout: string, stderr: string) => {
        //const logs: string[] = stdout
        if (error) {
          console.log(error, "<< error in model");
          const test_list = stderr.slice(
            stderr.indexOf(".js") + 5,
            stderr.indexOf(" ●")
          );
          const success: boolean = false;
          resolve({
            success: false,
            stderr: stderr,
            stdout: stdout,
            test_results: test_list,
          });
        } else {
          const test_list: string = stderr.slice(
            stderr.indexOf(".js") + 5,
            stderr.indexOf("Test Suites")
          );
          resolve({
            success: true,
            stderr: stderr,
            stdout: stdout,
            test_results: test_list,
          });
        }
      }
    );
  });

  //   return new Promise((resolve, reject) => {
  //     exec(`npm run test ${test_path} ${user_id}`, () => {
  //       if (error) {
  //         resolve({
  //           script_ran: test_path,
  //           success: false,
  //           output: stderr,
  //           list: test_list,
  //         });
  //       } else {
  //         const test_list = stderr.slice(
  //           stderr.indexOf(".js") + 5,
  //           stderr.indexOf("Test Suites")
  //         );
  //         resolve({ success: true, output: stderr, list: test_list });
  //       }
  //     });
  //   });
};
