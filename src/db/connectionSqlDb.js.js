require('dotenv').config()

const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
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