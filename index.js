const mysql = require("mysql");
const { prompt } = require("inquirer");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // Update with your own mysql password //
    password: "Pathfinder#15",
    database: "employee_tracker",
  });

  connection.connect((error) => {
    if (error) throw error;
    startApplicaiton();
  });

  const startApplicaiton = () => {
      inquirer.prompt({
            type: "list",
            message: "Where would you like to begin",
            choice: [
                "View all employees",
                "Add new employee",
                "Update existing employee",
                "Exit applicaiton"
            ]
    
      }).then((response) => {
          if(response.choice === "View all employees") {
              viewAllEmployees();
          } else if (response.choice === "Add new employee") {
              addNewEmployee();
          } else if (response.choice === "Update existing employee") {
              updateExistingEmployee();
          } else {
              connection.end();
          }
      });
  };

  const viewAllEmployees = () => {
      inquirer.prompt([
          {

          }
      ])
  };

  const addNewEmployee = () => { 

  };

  const updateExistingEmployee = () => {

  };