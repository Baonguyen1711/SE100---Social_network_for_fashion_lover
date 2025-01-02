// dbMiddleware.js
const db = require("../config/database/db");
const uri = process.env.DB_URI


const dbMiddleware = async (req, res, next) => {
  try {

    req.db = await db.connect(uri); 

    next(); 
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ message: "Database connection failed." });
  }
  
};

module.exports = dbMiddleware;

