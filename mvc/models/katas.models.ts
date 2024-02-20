const fs = require('fs/promises');
const format = require('pg-format');
const { db } = require('../../db/connection');

export async function fetchAllKatas() {
    const { rows:katas } = await db.query(`SELECT * FROM katas`);
    return katas;
}

export async function fetchKataByID(kata_id: Number) {
    const { rows:kata } = await db.query(`SELECT * FROM katas WHERE kata_id=$1`, [kata_id]);
        if(kata.length === 0) {
            return Promise.reject({ status: 404, msg: `A kata with the id ${kata_id} was not found.` })
        }
    
    return kata[0];
}
