const fs = require('fs/promises');
const format = require('pg-format');
const { db } = require('../../db/connection');

export async function fetchAllTopics() {
    const { rows:topics } = await db.query(`SELECT * FROM topics`);
    return topics;
}