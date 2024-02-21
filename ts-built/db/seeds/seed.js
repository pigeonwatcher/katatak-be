"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const format = require("pg-format");
const { db } = require("../connection");
function seed({ usersData, katasData, topicsData, solutionsData, kataTopicsData, commentsData }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.query("DROP TABLE IF EXISTS comments;");
        yield db.query("DROP TABLE IF EXISTS kata_topics;");
        yield db.query("DROP TABLE IF EXISTS solutions;");
        yield db.query("DROP TABLE IF EXISTS topics;");
        yield db.query("DROP TABLE IF EXISTS katas;");
        yield db.query("DROP TABLE IF EXISTS users;");
        yield createUsers();
        yield createKatas();
        yield createTopics();
        yield createSolutions();
        yield createKataTopics();
        yield createComments();
        yield insertUsers(usersData);
        yield insertKatas(katasData);
        yield insertTopics(topicsData);
        yield insertSolutions(solutionsData);
        yield insertKataTopics(kataTopicsData);
        yield insertComments(commentsData);
    });
}
function createUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.query(`CREATE TABLE users 
        (user_id SERIAL PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        bio VARCHAR(150),
        avatar_img_url VARCHAR)`);
    });
}
function createKatas() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.query(`CREATE TABLE katas
        (kata_id SERIAL PRIMARY KEY,
            kata_name VARCHAR NOT NULL,
            description TEXT NOT NULL,
            test_path VARCHAR NOT NULL,
            difficulty VARCHAR NOT NULL,
            date_created TIMESTAMP DEFAULT NOW(),
            votes INT DEFAULT 0 NOT NULL)`);
    });
}
function createTopics() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.query(`CREATE TABLE topics 
        (topic_id SERIAL PRIMARY KEY,
          topic_name VARCHAR(20) NOT NULL,
          description TEXT)`);
    });
}
function createSolutions() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.query(`CREATE TABLE solutions
  (solution_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    kata_id INT REFERENCES katas(kata_id) NOT NULL,
    solution TEXT NOT NULL,
    votes INT DEFAULT 0 NOT NULL
    )`);
    });
}
function createKataTopics() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.query(`CREATE TABLE kata_topics
  (kata_topics_id SERIAL PRIMARY KEY,
    kata_id INT REFERENCES katas(kata_id) NOT NULL,
    topic_id INT REFERENCES topics(topic_id) NOT NULL
    )`);
    });
}
function createComments() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.query(`CREATE TABLE comments
  (comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    kata_id INT REFERENCES katas(kata_id),
    comment_body TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT NOW()
    )`);
    });
}
function insertUsers(usersData) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersQuery = format('INSERT INTO users (username, bio, avatar_img_url) VALUES %L RETURNING *;', usersData.map(({ username, bio, avatar_img_url }) => [username, bio, avatar_img_url]));
        const result = yield db.query(usersQuery);
        return result;
    });
}
function insertKatas(katasData) {
    return __awaiter(this, void 0, void 0, function* () {
        const katasQuery = format('INSERT INTO katas (kata_name, description, test_path, difficulty) VALUES %L RETURNING *;', katasData.map(({ kata_name, description, test_path, difficulty }) => [kata_name, description, test_path, difficulty]));
        const result = yield db.query(katasQuery);
        return result;
    });
}
function insertTopics(topicsData) {
    return __awaiter(this, void 0, void 0, function* () {
        const topicsQuery = format('INSERT INTO topics (topic_name, description) VALUES %L RETURNING *;', topicsData.map(({ topic_name, description }) => [topic_name, description]));
        const result = yield db.query(topicsQuery);
        return result;
    });
}
function insertSolutions(solutionsData) {
    return __awaiter(this, void 0, void 0, function* () {
        const solutionsQuery = format('INSERT INTO solutions (kata_id, user_id, solution) VALUES %L RETURNING *;', solutionsData.map(({ kata_id, user_id, solution }) => [kata_id, user_id, solution]));
        const result = yield db.query(solutionsQuery);
        return result;
    });
}
function insertKataTopics(kataTopicsData) {
    return __awaiter(this, void 0, void 0, function* () {
        const kataTopicsQuery = format('INSERT INTO kata_topics (kata_id, topic_id) VALUES %L RETURNING *;', kataTopicsData.map(({ kata_id, topic_id }) => [kata_id, topic_id]));
        const result = yield db.query(kataTopicsQuery);
        return result;
    });
}
function insertComments(commentsData) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentsQuery = format('INSERT INTO comments (user_id, kata_id, comment_body) VALUES %L RETURNING *;', commentsData.map(({ user_id, kata_id, comment_body }) => [user_id, kata_id, comment_body]));
        const result = yield db.query(commentsQuery);
        return result;
    });
}
module.exports = { seed };
