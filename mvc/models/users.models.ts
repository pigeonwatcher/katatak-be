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
    return Promise.reject({ status: 400, msg: "User does not exist!" });
  }
  return user;
}
