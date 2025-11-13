-- 1. Create the table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    city VARCHAR(50),
    country VARCHAR(50),
    join_date DATE,
    total_spent NUMERIC(10, 2)
);

-- 2. Insert 10 records
INSERT INTO customers (first_name, last_name, email, city, country, join_date, total_spent)
VALUES
('Alice', 'Johnson', 'alice.johnson@example.com', 'New York', 'USA', '2022-05-10', 1200.50),
('Bob', 'Smith', 'bob.smith@example.com', 'Los Angeles', 'USA', '2021-08-14', 845.75),
('Charlie', 'Brown', 'charlie.brown@example.com', 'London', 'UK', '2023-02-20', 1540.00),
('Diana', 'Evans', 'diana.evans@example.com', 'Toronto', 'Canada', '2022-10-03', 975.20),
('Ethan', 'Wright', 'ethan.wright@example.com', 'Sydney', 'Australia', '2021-12-19', 2100.00),
('Fiona', 'Clark', 'fiona.clark@example.com', 'Dublin', 'Ireland', '2022-06-29', 640.30),
('George', 'Hall', 'george.hall@example.com', 'Berlin', 'Germany', '2023-03-15', 1875.90),
('Hannah', 'Lee', 'hannah.lee@example.com', 'Seoul', 'South Korea', '2022-01-22', 1320.45),
('Ian', 'Martinez', 'ian.martinez@example.com', 'Madrid', 'Spain', '2023-07-11', 890.75),
('Julia', 'Nguyen', 'julia.nguyen@example.com', 'San Francisco', 'USA', '2021-11-08', 2300.60);

-- 3. Retrieve all records
SELECT * FROM customers;
