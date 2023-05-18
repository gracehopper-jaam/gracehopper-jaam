const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;



async function createUser({ 
    username, 
    password,
    firstName,
    lastName,
    phone,
    email,
    addressline1,
    addressline2,
    isRegistered }) 
    {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, firstName, lastName, phone, email, addressline1, addressline2, "isRegistered")
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;

        `, [username, hashedPassword, firstName, lastName, phone, email, addressline1, addressline2, isRegistered]);

        return {
            id: user.id,
            username: user.username,
            password: hashedPassword,
        };
    } catch (error) {
        throw error;
    };
};

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT id, username FROM users
        WHERE id = $1;
        `, [userId]);

        return user;
    } catch (error) {
      throw error;  
    };
};


async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1 }`).join(', ');

    if (setString === 0) {
        return;
    }

    try {
        const { rows: [ user ] } = await client.query(`
        UPDATE users
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
        `, Object.values(fields));

        return user;
    } catch (error) {
        throw error;
    };
};

async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1;
        `, [username]);

        return user;
    } catch (error) {
        throw error;
    };
};


async function getUser({ username, password }) {
    try {
        const user = await getUserByUsername(username);
        
        if(!user) {
            return null;
        };

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return {
                id: user.id,
                username: user.username
            };
        } else {
            return null;
        };

    } catch (error) {
        throw error;
    };
};

async function getUserByFirstAndLastName({ firstName, lastName }) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE firstName = $1 AND lastName = $2
        `, [firstName, lastName]); 

        return user;
    } catch (error) {
        throw error;
    };
};

async function getUserByOrderId(orderId) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT "userId" FROM orders
        WHERE id = $1;
        `, [orderId]);

        return user;

    } catch (error) {
        throw error;  
    }
};

async function createGuest({ 
    password,
    firstName,
    lastName,
    phone,
    email,
    addressline1,
    addressline2,
    isRegistered }) 
    {
    try {
        const { rows: [user] } = await client.query(`
        WITH new_user AS (
            INSERT INTO users(username, password, firstName, lastName, phone, email, addressline1, addressline2, "isRegistered")
            VALUES ($5, $1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (username) DO NOTHING
            RETURNING *
        )
        SELECT id, $5 AS username, password
        FROM new_user;
        `, [password, firstName, lastName, phone, email, addressline1, addressline2, isRegistered]);

        return {
            id: user.id,
            username: user.username,
            password: null,
        };
    } catch (error) {
        throw error;
    };
};



module.exports = {
    createUser,
    getUserById,
    updateUser,
    getUserByUsername,
    getUser,
    getUserByFirstAndLastName,
    getUserByOrderId,
    createGuest
};
