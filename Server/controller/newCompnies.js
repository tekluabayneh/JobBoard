const db = require("../db/db_connection");
const newcompanie = async (req, res) => {
  let { companieName } = req.body;

  // check is the companies name is provided
  if (!companieName) {
    res
      .status(400)
      .json({ message: "companie name is Require", success: false });
    return;
  }

  // check is the provideed name is valid
  if (!/^[a-zA-Z0-9_]+$/.test(companieName)) {
    res.status(400).json({ message: "Invalid company name", success: false });
    return;
  }

  try {
    const table = `INSERT INTO companies(companie_name) VALUES(?)`;

    const [result] = await db.execute(table, [companieName]);

    res.status(200).json({
      message: `${companieName} companie created Successfully`,
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating companie",
      success: false,
      details: error.message,
    });
  }
};

module.exports = newcompanie;
