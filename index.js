const inquirer = require("inquirer");
const mysql = require("mysql");
const { printTable } = require("console-table-printer");
const CFonts = require("cfonts");


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
        colors: ["greenbright"],
        lineHeight: 2
      }));
  
      startApplication();
    });
  };

  const startApplication = () => {
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

                startApplication();
            }
        )
    })

};

const addRole = () => { 
    connection.query("select * from department", (error, response) => {
        const department = response.map((department) => {
            return {
                id: department.id,
                name: department.department_name
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
                name: "departmentId",
                message: "Which department is this role assigned to?",
                choices: department
            }
        ]).then((response) => {
            connection.query("INSERT INTO roles SET ?",
                {
                    title: response.title,
                    salary: response.salary,
                    departmentId: response.departmentId
                },
                (error) => {
                    
                    if (error) throw error;
                    console.log("New role has been added.")
    
                    startApplication();
                }
            )
        });
    })
   

};

const addEmployee = () => { 
    connection.query("select * from roles", (error, response) => {

        const roles = response.map((roles) => {
            return {
                id: roles.id,
                name: roles.title
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
                choices: roles
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
                    console.log("Employee has been added.")

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