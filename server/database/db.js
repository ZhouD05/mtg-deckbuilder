require("dotenv").config();

const Pool = require("pg").Pool;

let pool;

if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL, 
        // Secure Sockets Layer, encrpts the data sent between backend and database
        ssl: {rejectUnauthorized: false }
    })
} else {
    pool = new Pool({
        user: "postgres",
        password: process.env.DB_PASSWORD,
        host: "localhost",
        port: 5432,
        database: "deckbuilder"
    })
}



module.exports = pool;