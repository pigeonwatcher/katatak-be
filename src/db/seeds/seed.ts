const format = require("pg-format");
const { db } = require("../connection");

interface UsersData {
  usersData: {
    username: string;
    bio: string;
    avatar_img_url: string;
  }[];
}

interface KatasData {
  katasData: {
    kata_name: string;
    description: string;
    test_path: string;
    difficulty: string;
    function_template: string;
  }[];
}

interface TopicsData {
  topicsData: {
    topic_name: string;
    description: string;
  }[];
}

interface SolutionsData {
  solutionsData: {
    user_id: number;
    kata_id: number;
    solution: string;
  }[];
}

interface KataTopicsData {
  kataTopicsData: {
    kata_id: number;
    topic_id: number;
  }[];
}

interface CommentsData {
  commentsData: {
    user_id: number;
    kata_id: number;
    comment_body: string;
  }[];
}

async function seed({
  usersData,
  katasData,
  topicsData,
  solutionsData,
  kataTopicsData,
  commentsData,
}: {
  usersData: UsersData;
  katasData: KatasData;
  topicsData: TopicsData;
  solutionsData: SolutionsData;
  kataTopicsData: KataTopicsData;
  commentsData: CommentsData;
}) {
  await db.query("DROP TABLE IF EXISTS comments;");
  await db.query("DROP TABLE IF EXISTS kata_topics;");
  await db.query("DROP TABLE IF EXISTS solutions;");
  await db.query("DROP TABLE IF EXISTS topics;");
  await db.query("DROP TABLE IF EXISTS katas;");
  await db.query("DROP TABLE IF EXISTS users;");

  await createUsers();
  await createKatas();
  await createTopics();
  await createSolutions();
  await createKataTopics();
  await createComments();

  await insertUsers(usersData);
  await insertKatas(katasData);
  await insertTopics(topicsData);

  await insertSolutions(solutionsData);
  await insertKataTopics(kataTopicsData);
  await insertComments(commentsData);
}

async function createUsers() {
  return await db.query(
    `CREATE TABLE users 
        (user_id SERIAL PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        bio VARCHAR(150),
        avatar_img_url VARCHAR)`
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
            votes INT DEFAULT 0 NOT NULL,
            function_template VARCHAR NOT NULL
            )`
  );
}

async function createTopics() {
  return await db.query(
    `CREATE TABLE topics 
        (topic_id SERIAL PRIMARY KEY,
          topic_name VARCHAR(20) NOT NULL,
          description TEXT)`
  );
}

async function createSolutions() {
  return await db.query(`CREATE TABLE solutions
  (solution_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    kata_id INT REFERENCES katas(kata_id) NOT NULL,
    solution TEXT NOT NULL,
    votes INT DEFAULT 0 NOT NULL
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
    comment_body TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT NOW()
    )`);
}

async function insertUsers(usersData: any) {
  const usersQuery = format(
    "INSERT INTO users (username, bio, avatar_img_url) VALUES %L RETURNING *;",
    usersData.map(
      ({
        username,
        bio,
        avatar_img_url,
      }: {
        username: string;
        bio: string;
        avatar_img_url: string;
      }) => [username, bio, avatar_img_url]
    )
  );

  const result = await db.query(usersQuery);
  return result;
}

async function insertKatas(katasData: any) {
  const katasQuery = format(
    "INSERT INTO katas (kata_name, description, test_path, difficulty, function_template) VALUES %L RETURNING *;",
    katasData.map(
      ({
        kata_name,
        description,
        test_path,
        difficulty,
        function_template,
      }: {
        kata_name: string;
        description: string;
        test_path: string;
        difficulty: string;
        function_template: string;
      }) => [kata_name, description, test_path, difficulty, function_template]
    )
  );

  const result = await db.query(katasQuery);
  return result;
}

async function insertTopics(topicsData: any) {
  const topicsQuery = format(
    "INSERT INTO topics (topic_name, description) VALUES %L RETURNING *;",
    topicsData.map(
      ({
        topic_name,
        description,
      }: {
        topic_name: string;
        description: string;
      }) => [topic_name, description]
    )
  );

  const result = await db.query(topicsQuery);
  return result;
}

async function insertSolutions(solutionsData: any) {
  const solutionsQuery = format(
    "INSERT INTO solutions (kata_id, user_id, solution) VALUES %L RETURNING *;",
    solutionsData.map(
      ({
        kata_id,
        user_id,
        solution,
      }: {
        kata_id: number;
        user_id: number;
        solution: string;
      }) => [kata_id, user_id, solution]
    )
  );

  const result = await db.query(solutionsQuery);
  return result;
}

async function insertKataTopics(kataTopicsData: any) {
  const kataTopicsQuery = format(
    "INSERT INTO kata_topics (kata_id, topic_id) VALUES %L RETURNING *;",
    kataTopicsData.map(
      ({ kata_id, topic_id }: { kata_id: number; topic_id: number }) => [
        kata_id,
        topic_id,
      ]
    )
  );

  const result = await db.query(kataTopicsQuery);
  return result;
}

async function insertComments(commentsData: any) {
  const commentsQuery = format(
    "INSERT INTO comments (user_id, kata_id, comment_body) VALUES %L RETURNING *;",
    commentsData.map(
      ({
        user_id,
        kata_id,
        comment_body,
      }: {
        user_id: number;
        kata_id: number;
        comment_body: string;
      }) => [user_id, kata_id, comment_body]
    )
  );

  const result = await db.query(commentsQuery);
  return result;
}

module.exports = { seed };
