const { db } = require("../../db/connection");

export default async function fetchUsers() {
  try {
    const users = await db.query("SELECT * FROM users");
    return users;
  } catch {}
}
