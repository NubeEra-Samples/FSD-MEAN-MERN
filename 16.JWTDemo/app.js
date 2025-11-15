// app.js
require('reflect-metadata');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DataSource, EntitySchema } = require('typeorm');

// 🔐 Secret key for JWT (in real projects use .env)
const JWT_SECRET = 'mysecretkey123';

// 🧩 Define User Entity
const UserSchema = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: { primary: true, type: Number, generated: true },
    username: { type: String, unique: true },
    password: { type: String },
  },
});

// ⚙️ Configure PostgreSQL connection
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',        // 👈 update
  password: '123',   // 👈 update
  database: 'dbcustomer',   // 👈 update
  synchronize: false,
  logging: false,
  entities: [UserSchema],
});

const app = express();
app.use(bodyParser.json());

let userRepo;

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Start DB + API
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    userRepo = AppDataSource.getRepository('User');

    // 🧩 Register user
    app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      const existing = await userRepo.findOneBy({ username });
      if (existing) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = userRepo.create({ username, password: hashedPassword });
      await userRepo.save(user);

      res.status(201).json({ message: 'User registered successfully' });
    });

    // 🔑 Login route
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await userRepo.findOneBy({ username });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    });

    // 🔒 Protected route
    app.get('/profile', authenticateToken, async (req, res) => {
      const user = await userRepo.findOneBy({ id: req.user.id });
      res.json({ message: 'Protected content', user });
    });

    // 🚀 Start server
    const PORT = 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ DB Connection Error:', err.message));
