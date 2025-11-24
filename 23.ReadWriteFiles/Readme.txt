Create Database Table iris:
---------------------------
CREATE TABLE iris (
  id SERIAL PRIMARY KEY,           -- Automatically generated unique ID
  sepal_length NUMERIC,            -- Sepal length (numeric for decimal values)
  sepal_width NUMERIC,             -- Sepal width (numeric for decimal values)
  petal_length NUMERIC,            -- Petal length (numeric for decimal values)
  petal_width NUMERIC,             -- Petal width (numeric for decimal values)
  variety VARCHAR(50)              -- Variety of the iris flower (varchar for strings, up to 50 characters)
);



Command Prompt:
---------------

GET:
curl -X GET http://localhost:3000 ^
     -H "Accept: text/plain"


POST:
curl -X POST http://localhost:3000 ^
     -H "Content-Type: application/json" ^
     -d "{\"sepal.length\": 5.1, \"sepal.width\": 3.5, \"petal.length\": 1.4, \"petal.width\": 0.2, \"variety\": \"setosa\"}"




Powershell Command:
-------------------
GET:
curl -X GET http://localhost:3000 \
     -H "Accept: text/plain"

POST:
curl -X POST http://localhost:3000 \
     -H "Content-Type: application/json" \
     -d "{\"sepal.length\": 5.1, \"sepal.width\": 3.5, \"petal.length\": 1.4, \"petal.width\": 0.2, \"variety\": \"setosa\"}"
