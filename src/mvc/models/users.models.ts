const { db } = require("../../db/connection");

export async function fetchUsers() {
  const users = await db.query("SELECT * FROM users");
  return users;
}

export async function fetchUserById(user_id: string) {
  const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
    user_id,
  ]);

  if (user.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "User does not exist!" });
  }
  return user;
}

export async function fetchSolutionsByUserId(user_id: string) {
  const queryStr = `SELECT solutions.*, katas.kata_name FROM solutions JOIN katas ON solutions.kata_id = katas.kata_id WHERE solutions.user_id = $1`;
  const { rows } = await db.query(queryStr, [user_id]);

  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No solutions found for that user`,
    });
  }
  return rows;
}
