const db = require("./db/db_connection");
const express = require("express");
const app = express();
const cors = require("cors");
const Route = require("./route/AuthRoute");
const newcompanie = require("./controller/newCompnies");
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
