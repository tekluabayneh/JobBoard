const db = require("../db/db_connection");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const Register = async (req, res) => {
  const { firstname, lastname, password, email } = req.body;

  // checking if the user required filde is filled
  if (!firstname || !lastname || !password || !email) {
    res.status(400).json({ message: "all filed is requied" });
    return;
  }
  try {
    // check if the user has laready acount
    const query = `SELECT * FROM user WHERE  email = ?`;
    const [result] = await db.execute(query, [email]);

    // check is the user is not already exist
    if (result.length > 0) {
      res.status(400).json({ message: "The user has already registered" });
      return;
    }

    //check if the password is grater than 6
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
      return;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(password, salt);

    // add the user if the user is not register before
    const inserQuery = `INSERT INTO user(firstname, lastname, password, email)VALUES(?, ?, ?, ?)`;
    await db.execute(inserQuery, [firstname, lastname, HashedPassword, email]);

    // response the success if it success
    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Something went Wrong");
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    // Check if the user provided login credentials
    if (!password || !email) {
      res.status(400).json({ message: "Email and password are required" });
      console.log("Email and password are required");
      return;
    }

    // Check if the user has a record
    const sqlquery = `SELECT * FROM user WHERE email = ?`;
    const [result] = await db.execute(sqlquery, [email]);

    // Handle case when user is not found
    if (result.length === 0) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Get the hashed password from the database
    let hashedPassword = result[0].password;

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Sign the JSON Web Token with the email
    const token = JWT.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Send success message and token
    res
      .status(200)
      .json({ success: true, message: "User login successfully", token });
    console.log("Login is successful");
  } catch (error) {
    console.log("Error during login:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { login, Register };
