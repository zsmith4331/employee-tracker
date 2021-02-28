const mysql = require("mysql");
const { prompt } = require("inquirer")

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