const dotenv = require("dotenv");
const mysql2 = require("mysql2");

const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_board",
  port: 3306,
  queueLimit: 10,
});

module.exports = db.promise();
