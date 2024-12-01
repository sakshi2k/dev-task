const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '127.0.0.1',     // host for connection
    database: 'belzir_task',      // database from which we want to connect our node application
    user: 'root',          // username of the mysql connection
    password: 'Satyasai@01'       // password of the mysql connection
}).promise();

const connectDb = async () => {
    try {
        const res = await connection.connect()
        console.log("Successfully connected to database")
    }
    catch (err) {
        if (err) {
            console.error("Error occurred while connecting to mysql");
            console.debug(err)
        } 
    }
}

module.exports = {connection, connectDb}