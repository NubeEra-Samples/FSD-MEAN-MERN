const { Pool } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');
const format = require('pg-format'); // npm install pg-format

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_db',
  password: 'your_password',
  port: 5432,
});

const rows = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', row => {
    const age = parseInt(row.Age, 10);
    if (age >= 10 && age <= 40) {
      rows.push([row.Name, age, row.City]);
    }
  })
  .on('end', async () => {
    if (rows.length === 0) {
      console.log('No valid rows to insert');
      return;
    }

    try {
      const query = format('INSERT INTO users (name, age, city) VALUES %L' , rows);
      await pool.query(query);
      console.log('Data inserted successfully!');
    } catch (err) {
      console.error('Error inserting data:', err);
    } finally {
      await pool.end();
    }
  });
