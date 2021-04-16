USE employee_db;
INSERT INTO
  department (name)
VALUES
  ("HR");
INSERT INTO
  department (name)
VALUES
  ("Marketing");
INSERT INTO
  department (name)
VALUES
  ("IT");
INSERT INTO
  department (name)
VALUES
  ("Sales");
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("HR Director", 100, 1);
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Social Media Coordinator", 75, 2);
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Network Engineer", 120, 3);
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Customer Success Manager", 80, 4);
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Sales Lead", 60, 4);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("Murphy", "Charlie", 2);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("James", "Rick", 1);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("Johnson", "Silky", 3);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("Gaga", "Lady", 4);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("Wong", "Aly", 5);