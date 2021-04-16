// Dependencies

const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const promisemysql = require("promise-mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Topanga_801",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

// ALL OF THE PROMPTS!

function startPrompt() {
    inquirer.prompt({

        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [

            "View all employees.",
            "View all employees by Role.",
            "View all employees by Departments.",
            "Update employee Role."
        ]
    })

        .then((answer) => {

            // Switch case for user option

            switch (answer.action) {
                case "View all employees.":
                    viewAllEmployees();
                    break;

                case "View all employees by Role.":
                    viewAllEmployeesByRole();
                    break;

                case "view all employees by Departments.":
                    viewAllEmployeesByDept();
                    break;

                case "Update employee Role.":
                    updateEmployeeRole();
                    break;
            }

        });
}

// view all employees 

function viewAllEmployees() {

    // query to view all employees

    let query = 'SELECT CONCAT(e.first_name, " ", e.last_name) AS Employee,title,salary,name,CONCAT(A.first_name, " ",A.last_name) AS ManagerName FROM employee e LEFT JOIN role R on e.role_id = R.id LEFT JOIN department D on r.department_id = D.id LEFT JOIN employee A on e.manager_id = a.id';

    // Query from connection
    connection.query(query, function (err, res) {
        if (err) return err;
        console.log("\n");

        // display query results using console.table
        console.table(res);

        // this will take us back to the beginning
        startPrompt();
    });

}