const db = require("../db/db_connection");

const SearchJob = async (req, res) => {
  let { title } = req.body;
  console.log(title);
  if (!title) {
    res.status(400).json({ message: "job Title must be povided" });
    console.log("title is not provided");
    return;
  }

  try {
    let Query = `SELECT * FROM jobs WHERE title = ?`;
    let newQUERY = `SELECT * FROM jobs   
                LEFT JOIN companies ON jobs.company_id = companies.company_id
                  WHERE title = ?;`;
    let [result] = await db.execute(newQUERY, [title]);

    // check if rsult is not null
    if (result.length == 0 || result.length < 0) {
      res.status(200).json({ message: `job  not found with ${title}`, result });
      return;
    }

    // Replace NULL logo_icon with default URL if it's NULL
    const updatedRows = result.map((row) => {
      row.logo_icon =
        row.logo_icon ||
        "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg";

      row.person_image =
        row.person_image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIY0oXk_l3Po8F9pkWbZnSurTMbjkXdN_08Kp8c4ZibOhBP2C";

      return row;
    });

    res.status(200).json({
      message: `job found with title of ${title}`,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = SearchJob;
