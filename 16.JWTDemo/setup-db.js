// setup-db.js - Create database and users table
const { Client } = require('pg');

async function setupDatabase() {
  let client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123',
    database: 'postgres', // Connect to default database first
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Check if database exists
    const dbResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'dbcustomer'"
    );

    if (dbResult.rows.length === 0) {
      console.log('📝 Creating database "dbcustomer"...');
      await client.query('CREATE DATABASE dbcustomer');
      console.log('✅ Database "dbcustomer" created');
    } else {
      console.log('✅ Database "dbcustomer" already exists');
    }

    await client.end();

    // Now connect to dbcustomer and create table
    client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '123',
      database: 'dbcustomer',
    });

    await client.connect();
    console.log('✅ Connected to dbcustomer');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log('✅ Table "users" created (or already exists)');

    // Verify table
    const tableCheck = await client.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users'"
    );
    console.log('📊 Table structure:', tableCheck.rows);

    await client.end();
    console.log('\n🎉 Database setup complete! You can now run: node app.js');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

setupDatabase();
