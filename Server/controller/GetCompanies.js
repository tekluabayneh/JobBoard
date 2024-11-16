const { json } = require("express");
const db = require("../db/db_connection");

const GetCompanies = async (req, res) => {
  try {
    const Queary = `SELECT * FROM companies`;
    let [result] = await db.execute(Queary);

    res.status(200).json({ result, success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = GetCompanies;
