// writeToDB.js
const { Pool } = require('pg');

// ⚠️ Update these credentials for your PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'irisdb',
  password: 'your_password',
  port: 5432,
});

async function insertIrisRow(dataObj) {
  const query = `
    INSERT INTO iris (
      sepal_length, sepal_width, petal_length, petal_width, variety
    ) VALUES ($1, $2, $3, $4, $5)
  `;

  const values = [
    dataObj["sepal.length"],
    dataObj["sepal.width"],
    dataObj["petal.length"],
    dataObj["petal.width"],
    dataObj["variety"]
  ];

  try {
    await pool.query(query, values);
  } catch (err) {
    console.error("DB Insert Error:", err);
    throw err;
  }
}

module.exports = insertIrisRow;
