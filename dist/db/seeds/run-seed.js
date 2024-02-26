"use strict";
const devData = require('../data/development-data/index');
const runSeed = () => {
    const { seed } = require("./seed");
    const { db } = require("../connection");
    seed(devData).then(() => {
        return db.end();
    });
};
runSeed();
