const testData = require('../data/test-data/index')
const { seed } = require("./seed");
const { db } = require("../connection");


seed(testData).then(() => {
  return db.end();
});
