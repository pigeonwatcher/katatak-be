const fs = require("fs/promises");
const format = require("pg-format");
const { db } = require("../../db/connection");

export async function fetchAllTopics() {
  const { rows: topics } = await db.query(`SELECT * FROM topics`);
  return topics;
}

export async function checkTopicExists(topic: string) {
  const { rows } = await db.query(`SELECT * FROM topics WHERE topic_name =$1`, [
    topic,
  ]);
  if (rows.length === 0)
    return Promise.reject({ status: 404, msg: "Topic not found" });
}
