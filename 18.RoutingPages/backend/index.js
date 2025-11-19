const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '1h';

app.use(cors());
app.use(express.json());

// --- Auth routes ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  try {
    const userQ = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (userQ.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    const user = userQ.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const payload = { userId: user.id, email: user.email, name: user.name };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

app.get('/api/auth/verify', verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// --- Products routes ---
app.get('/api/products', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/products', verifyToken, async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, description, price, quantity) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, description, price, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/products/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const result = await pool.query(
      'UPDATE products SET name=$1, description=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *',
      [name, description, price, quantity, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/products/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted', product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Employees routes ---
app.get('/api/employees', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/employees/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM employees WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/employees', verifyToken, async (req, res) => {
  try {
    const { name, position, email, salary } = req.body;
    const result = await pool.query(
      'INSERT INTO employees (name, position, email, salary) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, position, email, salary]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/employees/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, email, salary } = req.body;
    const result = await pool.query(
      'UPDATE employees SET name=$1, position=$2, email=$3, salary=$4 WHERE id=$5 RETURNING *',
      [name, position, email, salary, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/employees/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM employees WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Deleted', employee: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
