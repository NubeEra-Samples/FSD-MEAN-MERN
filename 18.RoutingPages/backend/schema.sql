-- PostgreSQL schema and sample data for fullstack app

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) DEFAULT 'User'
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(12,2) DEFAULT 0,
  quantity INTEGER DEFAULT 0
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  salary NUMERIC(12,2) DEFAULT 0
);

-- Insert a sample user (password: password123)
-- Use bcrypt hash on server or replace with hashed value. For convenience, we'll provide a hashed password generated with bcrypt ($2b$10$...)
-- The following is a bcrypt hash for "password123" with cost 10 (may vary):
INSERT INTO users (email, password, name) VALUES
('admin@example.com', '$2b$10$e0NRZ8b6W9qz1jH3rfr0yO2gLEFhDgS4rQxjw6m6aUoQkW7zZbY3i', 'Administrator');

INSERT INTO products (name, description, price, quantity) VALUES
('Widget A', 'A great widget', 19.99, 100),
('Gadget X', 'Top-notch gadget', 49.5, 25);

INSERT INTO employees (name, position, email, salary) VALUES
('Alice Johnson', 'Developer', 'alice@example.com', 70000),
('Bob Smith', 'Manager', 'bob@example.com', 85000);
