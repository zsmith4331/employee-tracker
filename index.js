const inquirer = require("inquirer");
const mysql = require("mysql");
const { printTable } = require("console-table-printer");
const CFonts = require("cfonts");
const chalk = require("chalk");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // Update with your own mysql password //
    password: "Pathfinder#15",
    database: "employee_tracker",
  });

  const startSession = () => {
    connection.connect((err) => {
      if (err) throw err;
      console.log(CFonts.say("Employee Tracker", {
        font: "block",
        colors: ["greenbright"]
      }));
  
      startApplication();
    });
  };

  const startApplication = () => {
      inquirer.prompt({
            type: "list",
            message: "Please select task you would like tom complete from below.",
            name:"choiceSelection",
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
          
          switch (response.choiceSelection) {

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
                console.log(chalk.greenBright("\nNew department has been added.\n"))

                startApplication();
            }
        )
    })

};

const addRole = () => { 
    connection.query("select * from department", (error, response) => {
        const departmentList = response.map((departmentList) => {
            return {
                value: departmentList.id,
                name: departmentList.department_name
            };
        });

        if(error) throw error;

        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What role would would you like to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for the role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department is this role assigned to?",
                choices: departmentList
            }
        ]).then((response) => {
            connection.query("INSERT INTO role SET ?",
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.department_id
                },
                (error) => {
                    
                    if (error) throw error;
                    console.log(chalk.greenBright("\nNew role has been added.\n"))
    
                    startApplication();
                }
            )
        });
    })
   

};

const addEmployee = () => { 
    connection.query("select * from role", (error, response) => {

        const role = response.map((role) => {
            return {
                id: role.id,
                name: role.title
            };
        });

        connection.query("select * from employee", (error, response) => {

            const employeeManager = response.map((employee) => {
                
                return {
                    id: employee.id,
                    name: employee.first_name + " " + employee.last_name
                };
            });

        });        
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
            {
                type: "list",
                name: "role",
                message: "Select employees role.",
                choices: role
            },
            {
                type: "list",
                name: "manager",
                message: "Select employees manager.",
                choices: employeeManager
            },

        ]).then((response) => {

            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role: response.role,
                    employeeManager: response.employeeManager
                },
                (error) => {

                    if (error) throw error;
                    console.log(chalk.greenBright("\nNew Employee has been added.\n"))

                    startApplication();
                }
            )
        });

    });
};


const viewDepartments = () => { 
    connection.query(
        "SELECT * FROM department", (error, response) => {

            if (error) throw error;
            printTable(response);

            startApplication();

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

startSession();