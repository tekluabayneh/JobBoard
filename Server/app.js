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

app.post("/api/compnies", newcompanie);
app.get("/get", async (req, res) => {
  let data = `
    SELECT COLUMN_NAME, COLUMN_DEFAULT, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'jobs';
  `;

  let [reu] = await db.execute(data);
  console.log(reu);
  res.json(reu);
});
app.get("/alter", async (req, res) => {
  let query = `ALTER TABLE jobs
MODIFY COLUMN logo_icon VARCHAR(255)  NULL DEFAULT 'https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg',
MODIFY COLUMN person_image VARCHAR(255)  NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIY0oXk_l3Po8F9pkWbZnSurTMbjkXdN_08Kp8c4ZibOhBP2C';
`;

  try {
    await db.execute(query);
    res.json({ message: "Columns altered to use default values." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to alter columns." });
  }
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
