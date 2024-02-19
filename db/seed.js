const format = require("pg-format");
const { db } = require('./connection');

async function seed () {
    await db.query("DROP TABLE IF EXISTS messages;");
    await db.query("DROP TABLE IF EXISTS conversations;");
    await db.query("DROP TABLE IF EXISTS users;");

    await createUsers();
    await createConversations();
    await createMessages();

    await insertUsers();
    await insertConversations();
    await insertMessages();

    const { rows } = await db.query(
        `SELECT body, (SELECT username FROM users WHERE messages.user_id=users.user_id) as username FROM messages
            JOIN conversations ON messages.conversation_id = conversations.conversation_id
            WHERE messages.conversation_id = 1`
      );

    for(let i = 0; i < rows.length; i++) {
        console.log(`${rows[i].username}: ${rows[i].body}`);
    }    
}

async function createUsers() {
    return await db.query(
        `CREATE TABLE users 
        (user_id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL)`
    );
}

async function createConversations() {
    return await db.query(
        `CREATE TABLE conversations 
        (conversation_id SERIAL PRIMARY KEY,
        user_one INT REFERENCES users(user_id),
        user_two INT REFERENCES users(user_id))`
    );
}

async function createMessages() {
    return await db.query(
        `CREATE TABLE messages 
        (message_id SERIAL PRIMARY KEY,
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
    const message = [[1, 1, "Hello!"], [1, 2, "How are you?"], [1, 1, "I am good, you?"], [1, 2, "Calm"]]; 

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