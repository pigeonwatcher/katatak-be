const fs = require("fs/promises");
const format = require("pg-format");
const { db } = require("../../db/connection");

export async function fetchAllKatas(topic: string, order_by: string) {
  const validOrderBys: string[] = ["hardest", "easiest"];
  if (order_by && !validOrderBys.includes(order_by))
    return Promise.reject({ status: 400, msg: "invalid order_by" });

  let queryStr: string = `SELECT katas.*, json_agg(topics.topic_name) AS topics FROM katas JOIN kata_topics ON katas.kata_id = kata_topics.kata_id JOIN topics ON kata_topics.topic_id = topics.topic_id`;
  const queries: string[] = [];
  if (topic) {
    queries.push(topic);
    queryStr += ` WHERE topic_name = $1`;
  }

  let order: string = "ASC";
  if (order_by === "hardest") {
    order = "DESC";
  }

  const orderStr: string = ` ORDER BY CASE difficulty WHEN 'Easy' THEN 1 WHEN 'Medium' THEN 2 WHEN 'Hard' THEN 3 END ${order} `;

  queryStr += ` GROUP BY katas.kata_id ${orderStr}`;

  const { rows } = await db.query(queryStr, queries);

  return rows;
}

export async function fetchKataByID(kata_id: Number) {
  const { rows: kata } = await db.query(
    `SELECT katas.*, json_agg(topics.topic_name) AS topics FROM katas JOIN kata_topics ON katas.kata_id = kata_topics.kata_id JOIN topics ON kata_topics.topic_id = topics.topic_id WHERE katas.kata_id=$1 GROUP BY katas.kata_id`,
    [kata_id]
  );
  if (kata.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `A kata with the id ${kata_id} was not found.`,
    });
  }

  return kata[0];
}
