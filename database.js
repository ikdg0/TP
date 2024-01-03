const mysql = require('mysql2');
require('dotenv').config();
/*             DataBase              */
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3307

});
/*             DataBase              */