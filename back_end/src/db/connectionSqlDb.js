const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORDS,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("Connection established with DB!");
  }
});

module.exports = mysqlConnection;