/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest", // Use <rootDir> .
  },
};
