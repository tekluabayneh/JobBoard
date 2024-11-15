const db = require("../db/db_connection");

const showPostes = async (req, res) => {
  try {
    const Query = `SELECT * FROM jobs LEFT JOIN companies ON jobs.company_id = companies.company_id `;

    let [result] = await db.execute(Query);
    console.log(result);

    const updatedRows = result.map((row) => {
      row.logo_icon =
        row.logo_icon ||
        "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg";

      row.person_image =
        row.person_image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIY0oXk_l3Po8F9pkWbZnSurTMbjkXdN_08Kp8c4ZibOhBP2C";

      return row;
    });

    res.status(200).json({ message: "data was found", result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = showPostes;
