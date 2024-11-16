const db = require("../db/db_connection");

const getJobDetail = async (req, res) => {
  const { jobId } = req.body;
  if (!jobId) {
    res.status(400).json({ message: "job id is not found" });
    console.log("job id is not found");
    return;
  }

  const jobdetailQuery = `SELECT * FROM jobs WHERE job_id = ?`;
  let [result] = await db.execute(jobdetailQuery, [jobId]);

  if (result.length === 0) {
    console.log("no job found with that id");
    res.status(400).json({ message: "job not found" });
    return;
  }

  res.status(200).json({
    message: "Job Found with that job id",
    result,
    success: true,
  });
};

module.exports = getJobDetail;
