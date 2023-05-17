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



module.exports = {
    createUser,
    getUserById,
    updateUser,
};
