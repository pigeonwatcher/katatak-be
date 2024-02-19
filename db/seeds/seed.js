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
            date_created TIMESTAMP DEFAULT NOW()`
  );
}

async function createTopics() {
  return await db.query(
    `CREATE TABLE topics 
        (topic_id SERIAL PRIMARY KEY,
        conversation_id INT REFERENCES conversations(conversation_id),
        user_id INT REFERENCES users(user_id),
        body VARCHAR(100) NOT NULL)`
  );
}

async function insertUsers() {
  const users = [["bigbeans"], ["eggman"]];

  return await db.query(
    format(
      `INSERT INTO users (username)
            VALUES
            %L`,
      users
    )
  );
}

async function insertConversations() {
  const convos = [[1, 2]];

  return await db.query(
    format(
      `INSERT INTO conversations (user_one, user_two)
            VALUES
            %L`,
      convos
    )
  );
}

async function insertMessages() {
  const message = [
    [1, 1, "Hello!"],
    [1, 2, "How are you?"],
    [1, 1, "I am good, you?"],
    [1, 2, "Calm"],
  ];

  return await db.query(
    format(
      `INSERT INTO messages (conversation_id, user_id, body)
            VALUES
            %L`,
      message
    )
  );
}

module.exports = { seed };
