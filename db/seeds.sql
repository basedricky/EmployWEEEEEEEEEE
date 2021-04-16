USE employee_db;
INSERT INTO
  department (name)
VALUES
  ("Management");
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
  ("CFO", 1000, 1);
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
  ("Murphy", "Charlie", 2, 1);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("James", "Rick", 2, 1);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("Johnson", "Silky", 3, 1);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("Gaga", "Lady", 4, 1);
INSERT INTO
  employee (first_name, last_name, role_id)
VALUES
  ("Wong", "Aly", 5, 1);