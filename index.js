const inquirer = require("inquirer");
const mysql = require("mysql");
const { tablePrinter } = require("console-table-printer");

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
            message: "Where would you like to begin?",
            name:"startApplication",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Employee Role",
                // "Update Employees Manager",
                // "View Employees by Manager",
                // "Delete Department",
                // "Delete Role",
                // "Delete Employee",               
                // "View Total Utilized Budget by Department",
                "Exit Applicaiton"
            ]
    
      }).then((response) => {
          switch (response.choice) {

                case "Add Department":
                    addDepartment();
                break;

                case "Add Role":
                    addRole();
                break;

                case "Add Employee":
                    addEmployee();
                break;

                case "View Departments":
                    viewDepartments();
                break;

                case "View Roles":
                    viewRoles();
                break;

                case "View Employees":
                    viewEmployees();
                break;
                    
                case "Update Employee Role":
                    updateEmployeeRole();
                break;

                // case "Update Employees Manager":
                //     updateEmployeeManager();
                // break;
                
                // case "View Employees by Manager":
                //     viewEmployeeByMangaer();
                // break;
                
                // case "Delete Department":
                //     deleteDepartment();
                // break;
                
                // case "Delete Role":
                //     deleteRole();
                // break;

                // case "Delete Employee":
                //     deleteEmployee();
                // break;
                
                // case "View Total Utilized Budget by Department":
                //     viewTotalBudget();
                // break;
                
                case "Exit Applicaiton":
                    connection.end();
                break;
          }
      });
  };

const addDepartment = () => { 
    inquirer.prompt([
        {
        type: "input",
        name: "addDepartment",
        message: "What department would you like to add?",
        }
    ]).then((response) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                department_name: response.addDepartment,
            },
            (error) => {

                if (error) throw error;
                console.log("New department has been added.")

                startApplicaiton();
            }
        )
    })

};

const addRole = () => { 
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What role would would you like to add?"
        }
    ]).then((response) => {
        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: response.title
            },
            (error) => {
                
                if (error) throw error;
                console.log("New role has been added.")

                startApplicaiton();
            }
        )
    });

};

const addEmployee = () => { 
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employees first name."
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employees last name."
        },

        // Need to find a way to grab this data //

        // {
        //     type: "list",
        //     name: "role",
        //     message: "Select employees role."
        // },
        // {
        //     type: "list",
        //     name: "manager",
        //     message: "Select employees manager."
        // },

    ]).then((response) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: response.first_name,
                last_name: response.last_name,
                // role: response.role,
                // manager: response.manager
            },
            (error) => {

                if (error) throw error;
                console.log("Employee has been added.")

                startApplicaiton();
            }
        )
    })

};

const viewDepartments = () => { 
    connection.query(
        "SELECT * FROM department", (error, response) => {

            if (error) throw error;
            tablePrinter(response);

            startApplicaiton();

        }
    )

};

const viewRoles = () => { 

};

const viewEmployees= () => { 

};
const updateEmployeeRole = () => { 

};

const updateEmployeeManager = () => { 

};

const viewEmployeeByMangaer = () => { 

};

const deleteDepartment = () => { 

};

const deleteRole = () => { 

};

const deleteEmployee = () => { 

};

const viewTotalBudget = () => {

};