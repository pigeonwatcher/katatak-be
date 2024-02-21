const devData = require('../data/development-data/index')
const { seed } = require("./seed");
const { db } = require("../connection");


seed(devData).then(() => {
  return db.end();
});
