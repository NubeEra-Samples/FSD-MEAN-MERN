
---

# **📌 Most Useful / Trending `psql` Commands**

### **🔍 Schema & Table Info**

* `\dt` — list tables
* `\d table_name` — describe a table (columns, indexes, constraints)
* `\dv` — list views
* `\df` — list functions
* `\di` — list indexes
* `\dn` — list schemas
* `\l` — list databases

---

### **📂 Switching & Connecting**

* `\c dbname` — connect to a database
* `\conninfo` — show current connection info

---

### **📝 Query & Output Helpers**

* `\x` — toggle expanded output (useful for wide tables)
* `\timing` — show execution time for queries
* `\watch 2` — rerun the previous query every 2 seconds

---

### **⚙️ Admin & Maintenance**

* `\du` — list users/roles
* `\dg` — same as above (roles)
* `\db` — list tablespaces
* `\d+ table_name` — extended table info (storage, size, etc.)

---

### **📦 Useful Meta Commands**

* `\q` — quit
* `\?` — help for psql commands
* `\h` — help for SQL commands (`\h SELECT`)

---

### **🔥 Trending / Handy Commands**

* `SELECT version();` — check PostgreSQL version
* `SELECT current_database();` — get current DB
* `SELECT * FROM pg_stat_activity;` — see active connections
* `SELECT * FROM pg_indexes WHERE tablename='your_table';` — list indexes
* `\copy table_name TO 'file.csv' CSV HEADER` — export to CSV
* `\copy table_name FROM 'file.csv' CSV HEADER` — import CSV

---

