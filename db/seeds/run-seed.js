const { seed } = require("./seed");
const { db } = require("../connection");

seed().then(() => {
  return db.end();
});
