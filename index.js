const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");

// Connection Properties
const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Topanga_801",
    database: "employee_DB"
}

// Creating Connection
const connection = mysql.createConnection(connectionProperties);


// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;

    // Start main menu function

    console.log("\n Welcome to the employee tracker \n");
    startPrompt();
});

// Main menu function
function startPrompt() {

    // Prompt user to choose an option
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by department",
                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",

            ]
        })
        .then((answer) => {

            // Switch case depending on user option
            switch (answer.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all employees by role":
                    viewAllEmployeesByRole();
                    break;

                case "View all employees by department":
                    viewAllEmployeesByDept();
                    break;


                case "Add employee":
                    addEmployee();
                    break;

                case "Add department":
                    addDept();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
            }
        });
}

// View all employees 
function viewAllEmployees() {

    // Query to view all employees
    let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

    // Query from connection
    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("\n");

        // Display query results using console.table
        console.table(res);

        //Back to main menu
        startPrompt();
    });
}

// View all employees by department
function viewAllEmployeesByDept() {

    // Set global array to store department names
    let deptArr = [];

    // Create new connection using promise-sql
    promisemysql.createConnection(connectionProperties
    ).then((conn) => {

        // Query just names of departments
        return conn.query('SELECT name FROM department');
    }).then(function (value) {

        // Place all names within deptArr
        deptQuery = value;
        for (i = 0; i < value.length; i++) {
            deptArr.push(value[i].name);

        }
    }).then(() => {

        // Prompt user to select department from array of departments
        inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to search?",
            choices: deptArr
        })
            .then((answer) => {

                // Query all employees depending on selected department
                const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
                connection.query(query, (err, res) => {
                    if (err) return err;

                    // Show results in console.table
                    console.log("\n");
                    console.table(res);

                    // Back to main menu
                    startPrompt();
                });
            });
    });
}

// view all employees by role
function viewAllEmployeesByRole() {

    // set global array to store all roles
    let roleArr = [];

    // Create connection using promise-sql
    promisemysql.createConnection(connectionProperties)
        .then((conn) => {

            // Query all roles
            return conn.query('SELECT title FROM role');
        }).then(function (roles) {

            // Place all roles within the roleArry
            for (i = 0; i < roles.length; i++) {
                roleArr.push(roles[i].title);
            }
        }).then(() => {

            // Prompt user to select a role
            inquirer.prompt({
                name: "role",
                type: "list",
                message: "Which role would you like to search?",
                choices: roleArr
            })
                .then((answer) => {

                    // Query all employees by role selected by user
                    const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;
                    connection.query(query, (err, res) => {
                        if (err) return err;

                        // show results using console.table
                        console.log("\n");
                        console.table(res);
                        startPrompt();
                    });
                });
        });
}

// Add employee
function addEmployee() {

    // Create two global array to hold 
    let roleArr = [];
    let managerArr = [];

    // Create connection using promise-sql
    promisemysql.createConnection(connectionProperties
    ).then((conn) => {

        // Query  all roles and all managers. Pass as a promise
        return Promise.all([
            conn.query('SELECT id, title FROM role ORDER BY title ASC'),
            conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
        ]);
    }).then(([roles, managers]) => {

        // Place all roles in array
        for (i = 0; i < roles.length; i++) {
            roleArr.push(roles[i].title);
        }

        // place all managers in array
        for (i = 0; i < managers.length; i++) {
            managerArr.push(managers[i].Employee);
        }

        return Promise.all([roles, managers]);
    }).then(([roles, managers]) => {

        // add option for no manager
        managerArr.unshift('--');

        inquirer.prompt([
            {
                // Prompt user of their first name
                name: "firstName",
                type: "input",
                message: "First name: ",
                // Validate field is not blank
                validate: function (input) {
                    if (input === "") {
                        console.log("**FIELD REQUIRED**");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                // Prompt user of their last name
                name: "lastName",
                type: "input",
                message: "Lastname name: ",
                // Validate field is not blank
                validate: function (input) {
                    if (input === "") {
                        console.log("**FIELD REQUIRED**");
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                // Prompt user of their role
                name: "role",
                type: "list",
                message: "What is their role?",
                choices: roleArr
            }, {
                // Prompt user for manager
                name: "manager",
                type: "list",
                message: "Who is their manager?",
                choices: managerArr
            }]).then((answer) => {

                // Set variable for IDs
                let roleID;
                // Default Manager value as null
                let managerID = null;

                // Get ID of role selected
                for (i = 0; i < roles.length; i++) {
                    if (answer.role == roles[i].title) {
                        roleID = roles[i].id;
                    }
                }

                // get ID of manager selected
                for (i = 0; i < managers.length; i++) {
                    if (answer.manager == managers[i].Employee) {
                        managerID = managers[i].id;
                    }
                }

                // Add employee
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
                    if (err) return err;

                    // Confirm employee has been added
                    console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
                    startPrompt();
                });
            });
    });
}

