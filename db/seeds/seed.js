const format = require("pg-format");
const { db } = require("../connection");

async function seed() {
  await db.query("DROP TABLE IF EXISTS users;");
  await db.query("DROP TABLE IF EXISTS katas;");
  await db.query("DROP TABLE IF EXISTS topics;");
  await db.query("DROP TABLE IF EXISTS solutions;");
  await db.query("DROP TABLE IF EXISTS kata_topics;");
  await db.query("DROP TABLE IF EXISTS comments;");

  await createUsers();
  await createKatas();
  await createTopics();
  await createSolutions();
  await createKataTopics();
  await createComments();

  await insertUsers();
  await insertKatas();
  await insertTopics();
  await insertSolutions();
  await insertKataTopics();
  await insertComments();
}

async function createUsers() {
  return await db.query(
    `CREATE TABLE users 
        (user_id SERIAL PRIMARY KEY,
        username VARCHAR(20) NOT NULL),
        bio VARCHAR(150),
        avatar_img_url VARCHAR`
  );
}

async function createKatas() {
  return await db.query(
    `CREATE TABLE katas
        (kata_id SERIAL PRIMARY KEY,
            kata_name VARCHAR NOT NULL,
            description TEXT NOT NULL,
            test_path VARCHAR NOT NULL,
            difficulty VARCHAR NOT NULL,
            date_created TIMESTAMP DEFAULT NOW(),
            votes INT DEFAULT 0 NOT NULL`
  );
}

async function createTopics() {
  return await db.query(
    `CREATE TABLE topics 
        (topic_id SERIAL PRIMARY KEY,
          topic_name VARCHAR(20) NOT NULL,
          description TEXT`
  );
}

async function createSolutions() {
  return await db.query(`CREATE TABLE solutions
  (solution_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    kata_id INT REFERENCES katas(kata_id) NOT NULL,
    solution TEXT NOT NULL,
    votes INTO DEFAULT 0 NOT NULL
    )`);
}

async function createKataTopics() {
  return await db.query(`CREATE TABLE kata_topics
  (kata_topics_id SERIAL PRIMARY KEY,
    kata_id INT REFERENCES katas(kata_id) NOT NULL,
    topic_id INT REFERENCES topics(topic_id) NOT NULL
    )`);
}

async function createComments() {
  return await db.query(`CREATE TABLE comments
  (comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    kata_id INT REFERENCES katas(kata_id),
    comment_body TEXT NOT NULL
    )`);
}

//await insertUsers();
// await insertKatas();
// await insertTopics();
// await insertSolutions();
// await insertKataTopics();
// await insertComments();

async function insertUsers() {}

async function insertKatas() {}

async function insertTopics() {}

async function insertSolutions() {}

async function insertKataTopics() {}

async function insertComments() {}

module.exports = { seed };
