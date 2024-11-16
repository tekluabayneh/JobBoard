const db = require("../db/db_connection");

const Submitapplicant = async (req, res) => {
  const { fullname, email, phone, resume, description, company_id } = req.body;

  if (!fullname || !email || !phone || !resume || !description || !company_id) {
    res.status(400).json({ message: "All filds are required", success: false });
    console.log("All filds are required");
    return;
  }

  try {
    const data = [fullname, email, phone, resume, description, company_id];
    console.log(data);
    const aplicantQuery = `INSERT INTO applicants (name, email, phone_number, resume, description, company_id) VALUES(?,?,?,?,?,?)`;
    const [applicantResult] = await db.execute(aplicantQuery, data);

    let result = applicantResult;
    console.log(result);

    res.status(200).json({
      message: `${fullname} apply the job Successfully`,
      result,
      success: true,
    });
  } catch (error) {
    console.log("something went wronmg");
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = Submitapplicant;
