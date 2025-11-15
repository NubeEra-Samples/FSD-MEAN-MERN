// verify-db.js - Check if database and table exist
const { DataSource, EntitySchema } = require('typeorm');

const UserSchema = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: { primary: true, type: Number, generated: true },
    username: { type: String, unique: true },
    password: { type: String },
  },
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'dbcustomer',
  synchronize: false,
  logging: true,
  entities: [UserSchema],
});

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connected to PostgreSQL - dbcustomer');
    console.log('📋 Checking if users table exists...');
    
    // Check tables
    AppDataSource.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `).then(tables => {
      console.log('📊 Tables in database:', tables);
      process.exit(0);
    }).catch(err => {
      console.error('❌ Error checking tables:', err.message);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('❌ Connection Error:', err.message);
    console.error('\n⚠️  POSSIBLE ISSUES:');
    console.error('1. Database "dbcustomer" does not exist');
    console.error('2. Table "users" does not exist in "dbcustomer"');
    console.error('3. PostgreSQL is not running');
    console.error('4. Wrong credentials (username/password)');
    process.exit(1);
  });
