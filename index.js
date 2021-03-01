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
            message: "Where would you like to begin?",
            choice: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Employee Role",
                "Update Employees Manager",
                "View Employees by Manager",
                "Delete Department",
                "Delete Role",
                "Delete Employee",               
                "View Total Utilized Budget by Department",
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

                case "Update Employees Manager":
                    updateEmployeeManager();
                break;
                
                case "View Employees by Manager":
                    viewEmployeeByMangaer();
                break;
                
                case "Delete Department":
                    deleteDepartment();
                break;
                
                case "Delete Role":
                    deleteRole();
                break;

                case "Delete Employee":
                    deleteEmployee();
                break;
                
                case "View Total Utilized Budget by Department":
                    viewTotalBudget();
                break;
                
                case "Exit Applicaiton":
                    connection.end();
                break;
          }
      });
  };

const addDepartment = () => { 

};

const addRole = () => { 

};

const addEmployee = () => { 

};

const viewDepartments = () => { 

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