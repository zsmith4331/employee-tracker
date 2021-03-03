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
    connection.connect((error) => {

      if (error) throw error;
      console.log(CFonts.say("Employee Tracker", {
            font: "block",
            align: "center",
            colors: ["greenbright"],
        }));
        
      startApplication();
      
    });
  };

  const startApplication = () => {
      inquirer.prompt({
            type: "list",
            message: (chalk.greenBright("Please select task you would like tom complete from below:\n")),
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
        message: (chalk.greenBright("What department would you like to add?")),
        }
    ]).then((response) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                department_name: response.addDepartment,
                
            },
            (error) => {

                if (error) throw error;
                console.log(chalk.magentaBright("\nNew department has been added.\n"))

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
                message: "\nWhat role would would you like to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "\nWhat is the salary for the role?"
            },
            {
                type: "list",
                name: "department_id",
                message: (chalk.greenBright("\nPlease select department assigned to this role from below:\n")),
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
                    console.log(chalk.magentaBright("\nNew role has been added.\n"))
    
                    startApplication();
                }
            )
        });
    })
   

};

const addEmployee = () => {
    connection.query(
        "select * from role",
        (error, response) => {

        const role = response.map((role) => {
            return {
                value: role.id,
                name: role.title                
            };
        });

        connection.query(
            "select * from employee",
            (error, response) => {
            
            const employeeManager = response.map((employee) => {
                return {

                    value: employee.id,
                    name: employee.first_name + " " + employee.last_name,
                    
                };
        });
        inquirer.prompt([
            {
              type: "input",
              name: "first_name",
              message: "Enter employees first name.",
              
            },
            {
              type: "input",
              name: "last_name",
              message: "Enter employees last name",
              
            },
            {
              type: "list",
              message: "Select employees role.",
              name: "role",
              choices: role,
            },
            {
              type: "list",
              message: "Select employees manager",
              name: "manager",
              choices: employeeManager,
            },
          ]).then((response) => {

            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: response.role,
                manager_id: response.manager,
              },
              (error) => {

                if (error) throw error;
                console.log(chalk.magentaBright("\nNew Employee has been added.\n"))
                
                startApplication();
              }
            );
          });
      });
    });
  };


const viewDepartments = () => { 
    connection.query(
        "SELECT * FROM department",

        (error, response) => {
            if (error) throw error;
            printTable(response);

            startApplication();
        }
    );

};

const viewRoles = () => { 
    connection.query(
        `SELECT role.id, role.title, role.salary, (department.department_name) department
        FROM role 
        LEFT JOIN department
        ON role.department_id = department.id;`,

        (error, response) => {
          if (error) throw error;
          printTable(response);

          startApplication();
        }
      );

};

const viewEmployees= () => { 
    connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, " ", manager.last_name) manager
        FROM employee 
        LEFT JOIN role
        ON employee.role_id=role.id
        LEFT JOIN employee manager
        ON manager.id=employee.manager_id;`,
        (error, response) => {
          if (error) throw error;
          printTable(response);
          startApplication();
        }
      );

};
const updateEmployeeRole = () => { 
    connection.query(
        "select * from role",
        (error, response) => {
            const updatedEmployeeRole = response.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                };
            });

            connection.query("select * from employee",
            (error, response) => {
                const updateEmployee = response.map((employee) => {
                    return {
                        value: employee.id,
                        name: employee.first_name + " " + employee.last_name,
                    };
                });

                connection.query("select * from employee",
                (error, response) => {
                const updateEmployeeManager = response.map((employee) => {
                    return {
                        value: employee.id,
                        name: employee.first_name + " " + employee.last_name,
                        manager: employee.manager_id
                    };
                });
                inquirer.prompt([
                    {
                        type: "list",
                        name: "Employee",
                        message: console.log(chalk.greenBright("\nPlease select the employee to update from below:\n")),
                        choices: updateEmployee
                    },
                    {
                        type: "list",
                        name: "Role",
                        message: console.log(chalk.greenBright("\nPlease select the employees new role from below:\n")),
                        choices: updatedEmployeeRole
                    },
                    {
                        type: "list",
                        name: "Manager",
                        message: console.log(chalk.greenBright("\nPlease select the employees Manager from below:\n")),
                        choices: updateEmployeeManager

                    }
                ]).then((response) => {                    
                    let newEmployee = response.employee;
                    let newRole = response.role;
                    let newManager = response.manager;

                    connection.query(
                        `update employee set role_id=${newRole} where id=${newEmployee}`
                    );
                    connection.query(
                        `update employee set manager_id=${newManager} where id=${newEmployee}`
                    );

                    if (error) throw error;
                    console.log(chalk.magentaBright("\nUpdates have been completed!\n"));

                    startApplication();
                })
            });
        }
    )

})
};

// const updateEmployeeManager = () => { 

// };

// const viewEmployeeByMangaer = () => { 

// };

// const deleteDepartment = () => { 

// };

// const deleteRole = () => { 

// };

// const deleteEmployee = () => { 

// };

// const viewTotalBudget = () => {

// };

startSession();