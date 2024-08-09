const inquirer = require('inquirer');
const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_db',
  password: 'password',
  port: 5432,
});

// Main menu function
const mainMenu = async () => {
  const answers = await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Exit'
    ]
  });

  switch (answers.action) {
    case 'View All Departments':
      return viewAllDepartments();
    case 'View All Roles':
      return viewAllRoles();
    case 'View All Employees':
      return viewAllEmployees();
    case 'Add a Department':
      return addDepartment();
    case 'Add a Role':
      return addRole();
    case 'Add an Employee':
      return addEmployee();
    case 'Update an Employee Role':
      return updateEmployeeRole();
    case 'Exit':
      pool.end();
      console.log('Goodbye!');
      return;
  }
};

// View all departments
const viewAllDepartments = async () => {
  try {
    const result = await pool.query('SELECT * FROM department');
    console.table(result.rows);
  } catch (err) {
    console.error(err.message);
  }
  mainMenu();
};

// View all roles
const viewAllRoles = async () => {
  try {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;
    const result = await pool.query(query);
    console.table(result.rows);
  } catch (err) {
    console.error(err.message);
  }
  mainMenu();
};

// View all employees
const viewAllEmployees = async () => {
  try {
    const query = `
      SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department, 
        role.salary, 
        manager.first_name AS manager_first_name, 
        manager.last_name AS manager_last_name
      FROM 
        employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;
    const result = await pool.query(query);
    console.table(result.rows);
  } catch (err) {
    console.error(err.message);
  }
  mainMenu();
};

// Add a department
const addDepartment = async () => {
  const answers = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  });

  try {
    const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [answers.name]);
    console.log(`Added department: ${result.rows[0].name}`);
  } catch (err) {
    console.error(err.message);
  }
  mainMenu();
};

// Add a role
const addRole = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary of the role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for the role:'
    }
  ]);

  try {
    const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [answers.title, answers.salary, answers.department_id]);
    console.log(`Added role: ${result.rows[0].title}`);
  } catch (err) {
    console.error(err.message);
  }
  mainMenu();
};

// Add an employee
const addEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID for the employee:'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID for the employee (or leave blank if none):'
    }
  ]);

  try {
    const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id || null]);
    console.log(`Added employee: ${result.rows[0].first_name} ${result.rows[0].last_name}`);
  } catch (err) {
    console.error(err.message);
  }
  mainMenu();
};

// Update an employee role
const updateEmployeeRole = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID for the employee:'
    }
  ]);

  try {
    const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [answers.role_id, answers.employee_id]);
    console.log(`Updated employee: ${result.rows[0].first_name} ${result.rows[0].last_name}`);
  } catch (err) {
    console.error(err.message);
  }
  mainMenu();
};

// Start the application
mainMenu();
