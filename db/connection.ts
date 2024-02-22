
const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

type Config = {
  connectionString: string | undefined,
  max: number
}

const config: Config = {
  connectionString: "",
  max: 0
};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const db = new Pool(config);

export = { db };
