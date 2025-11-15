Awesome 🔥 — let’s extend your learning by creating a **Node.js JWT-based login system** (using Express and PostgreSQL for persistence) and test it with **curl** in Windows Command Prompt.

We’ll build a minimal, clean setup that lets you:

* Register a new user
* Log in and receive a JWT token
* Access a protected route using the token

---

## 🧩 Step 1: Create Project Folder

Open **Command Prompt** and run:

```bash
mkdir node-jwt-auth
cd node-jwt-auth
```

---

## ⚙️ Step 2: Initialize & Install Dependencies

```bash
npm init -y
npm install express bcryptjs jsonwebtoken typeorm reflect-metadata pg body-parser
```

---

## 📁 Step 3: Folder Structure

```
node-jwt-auth/
│
├── app.js
└── package.json
```

We’ll keep everything in one file (`app.js`) for simplicity.

---

## 🧠 Step 4: Create PostgreSQL Table

Run this SQL in your PostgreSQL database:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

---

## 🧷 Step 5: Create `app.js`

```js
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
  password: 'your_password',   // 👈 update
  database: 'your_database',   // 👈 update
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
```

---

## ▶️ Step 6: Run the Server

In Command Prompt:

```bash
node app.js
```

You should see:

```
✅ Connected to PostgreSQL
🚀 Server running on http://localhost:4000
```

---

## 🧪 Step 7: Test with **curl** (Windows Command Prompt)

### 1️⃣ Register a user

```bash
curl -X POST http://localhost:4000/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"john\",\"password\":\"mypassword\"}"
```

Expected:

```json
{"message":"User registered successfully"}
```

---

### 2️⃣ Login to get JWT token

```bash
curl -X POST http://localhost:4000/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"john\",\"password\":\"mypassword\"}"
```

Expected response:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

Copy the `token` value.

---

### 3️⃣ Access a protected route

```bash
curl http://localhost:4000/profile ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Expected:

```json
{
  "message": "Protected content",
  "user": {
    "id": 1,
    "username": "john",
    "password": "<hashed_password>"
  }
}
```

---

## ✅ Summary

You now have a fully working **JWT-based authentication API** using:

* **Node.js + Express**
* **TypeORM (PostgreSQL persistence)**
* **bcryptjs** for password hashing
* **jsonwebtoken** for secure tokens

---

