const db = require("../db/db_connection");

const postJob = async (req, res) => {
  let {
    company_id,
    title,
    is_remote,
    job_type,
    salary,
    country,
    state,
    city,
    logo_icon,
    person_image,
    contact_phone,
    contact_name,
    contact_email,
    description,
  } = req.body;

  // Validation logic
  if (
    !company_id ||
    !title ||
    !is_remote ||
    !job_type ||
    !salary ||
    !country ||
    !state ||
    !city ||
    !contact_name ||
    !contact_phone ||
    !contact_email ||
    !description
  ) {
    res.status(400).json({
      message: "All required fields must be provided",
      success: false,
    });
    console.log("All required fields must be provided.");
    return;
  }

  try {
    // Check if the company exists
    const QUERY = `SELECT * FROM companies WHERE company_id = ?`;
    const [result] = await db.execute(QUERY, [company_id]);
    console.log("Company check result:", result);

    if (result.length === 0) {
      res.status(400).json({ message: "Company is not found" });
      return;
    }

    // Post the job
    const insertJobQuery = `
      INSERT INTO jobs 
      (company_id, title, is_remote, job_type, salary, country, state, city, logo_icon, person_image, contact_name, contact_phone, contact_email, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const data = [
      company_id,
      title,
      is_remote,
      job_type,
      salary,
      country,
      state,
      city,
      logo_icon,
      person_image,
      contact_name,
      contact_phone,
      contact_email,
      description,
    ];

    const [insertResult] = await db.execute(insertJobQuery, data);

    res.status(200).json({
      message: "Job posted successfully",
      jobId: insertResult.insertId,
      success: true,
    });
    console.log("Job insertion result:", insertResult);
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = postJob;
