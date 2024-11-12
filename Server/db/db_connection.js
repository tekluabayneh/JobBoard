const dotenv = require("dotenv");
const mysql2 = require("mysql2");

const db = mysql2.createPool({
  host: "root",
  user: "jobBord",
  password: "root",
  database: "companies",
  port: 3306,
  queueLimit: 10,
});

module.exports = db.promise();
