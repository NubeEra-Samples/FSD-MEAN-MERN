# FSD Fullstack App (React + Node + PostgreSQL)

This repository contains a minimal full-stack example with authentication (JWT), and CRUD APIs for Products and Employees.

Layout:
- backend/: Express server using `pg` to connect to PostgreSQL.
- frontend/: React app (React Router, Axios) with Login, Dashboard, Products, Employees pages.

Quick start (local):

1. Create PostgreSQL database and run schema
   - Create database: `createdb fsd_app` (or use pgAdmin)
   - Run `schema.sql` to create tables and insert sample data.

   Example using psql:
   ```bash
   psql -d fsd_app -f backend/schema.sql
   ```

2. Backend
   - Copy `backend/.env.sample` to `backend/.env` and set `DATABASE_URL` and `JWT_SECRET`.
   - Install dependencies and start:
     ```bash
     cd backend
     npm install
     npm run dev
     ```

3. Frontend
   - Edit `frontend/.env` if you need to change API base (optional). By default client uses http://localhost:4000
   - Install and start:
     ```bash
     cd frontend
     npm install
     npm start
     ```

4. Login
   - Sample user: admin@example.com / password123

Notes and next steps
- This example aims to be minimal and instructive. Add validation, better forms, and role-based auth as needed.
- For production, use secure environment values, HTTPS, CORS restrictions, and stronger password policies.
