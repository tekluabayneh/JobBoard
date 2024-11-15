const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const checkuser = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided.",
    });
  }

  try {
    JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Token is invalid or expired.",
        });
      }

      // Token is valid; send success response
      res.status(200).json({
        success: true,
        message: "Access granted",
        data: { decoded },
      });
    });
  } catch (error) {
    res.status(500).josn({ message: "somethignwent wrong" });
    console.log(error);
  }
};

module.exports = checkuser;
