const db = require("./db/db_connection");
const express = require("express");
const app = express();
const cors = require("cors");

// midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
  })
);


app.get("/", (req, res) => {
  res.status(200).json("welcome");
});
app.listen(port, async (err) => {
  if (err) {
    console.log("thire was Error" + err);
  }
  console.log(`Server is Running on port ${port}`);
});
