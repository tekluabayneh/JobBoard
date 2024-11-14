const db = require("../db/db_connection");

const showPostes = async (req, res) => {
  try {
    const Query = `SELECT * FROM jobs LEFT JOIN companies ON jobs.company_id = companies.company_id `;

    let [result] = await db.execute(Query);
    console.log(result);
    res.status(200).json({ message: "data was found", result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = showPostes;
