const db = require("./db/db_connection");
const express = require("express");
const app = express();
const cors = require("cors");
const Route = require("./route/AuthRoute");
const newcompanie = require("./controller/newCompnies");
const GetCompanies = require("./controller/GetCompanies");
const SearchJob = require("./controller/Search");
const postJbo = require("./controller/jobPost");
const showPostes = require("./controller/showPostes");
const checkuser = require("./controller/Middelware");
const getJobDetail = require("./controller/JobDetail");
const Submitapplicant = require("./controller/applicant");

const port = 3000;
// midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
  })
);
app.use("/api/user", Route);
app.get("/api/companies", GetCompanies);
app.post("/api/job/search", SearchJob);
app.post("/api/post/job", postJbo);
app.get("/api/allPost", showPostes);
app.get("/api/checkuser", checkuser);
app.post("/api/getJobDetail", getJobDetail);
app.post("/api/Submitapplicant", Submitapplicant);
app.get("/", (req, res) => {
  res.status(200).json("welcome");
});

app.get("/create", async (req, res) => {
  const table = `CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY  AUTO_INCREMENT,
    firstname VARCHAR(225) NOT NULL,
    lastname VARCHAR(225) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(225) NOT NULL UNIQUE
  )`;
  try {
    const [result] = await db.execute(table);
    console.log("Table created or already exists:", result);
    res.json("table created");
  } catch (err) {
    console.log(err);
  }
});

app.get("/aplicant", async (req, res) => {
  let table = `CREATE TABLE IF NOT EXISTS applicants (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(255)NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  resume BLOB NOT NULL,
  description TEXT,
  company_id INT NOT NULL, 
  FOREIGN KEY (id) REFERENCES companies(company_id) )`;

  let [result] = await db.execute(table);

  console.log(result);
  res.status(200).json(result);
});

app.post("/api/compnies", newcompanie);
app.get("/get", async (req, res) => {
  let data = `
    SELECT COLUMN_NAME, COLUMN_DEFAULT, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'jobs';
  `;

  let [reu] = await db.execute(data);
  res.json(reu);
});

app.get("/man", async (req, res) => {
  let table = `SELECT * FROM applicants`;

  let [resutl] = await db.execute(table);

  res.json(resutl);
});

app.listen(port, async (err) => {
  if (err) {
    console.log("thire was Error" + err);
  }
  console.log(`Server is Running on port ${port}`);
});

// async function checkisconnected() {
//   try {
//     let result = await db.execute("SELECT 'tetst'");

//     if (result) {
//       app.listen(port, async (err) => {
//         if (err) {
//           console.log("their was an error");
//         }
//         console.log(`Server is Running on port ${port}`);
//         console.log(result);
//       });
//     }
//   } catch (error) {
//     console.log(err);
//   }
// }
// checkisconnected();
