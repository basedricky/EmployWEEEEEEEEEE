// Dependencies

const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const conneection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Topanga_801",
    database: "employee_db"
});

conneection.connect(function (err) {
    if (err) throw err
    console.log("Connected as Id" + conneection.threadId)
    startPrompt();
});

// ALL OF THE PROMPTS!

function startPrompt() {
    inquirer.prompt({


        type: "list",
        message: "What would you like to do?",
        choices: [

            "View all employees.",
            "View all employees by Role.",
            "View all employees by Deparments.",
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
            }


        });
}