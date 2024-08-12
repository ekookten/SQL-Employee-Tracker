Employee Tracker

Description

Employee Tracker is a command-line application that allows business owners to manage their company's employee database. The application enables users to view and manage departments, roles, and employees, helping to organize and plan the business effectively. This project is built using Node.js, Inquirer, and PostgreSQL.

Features

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## Installation

1 Clone the repository

2- Install the required npm packages

3- Set up the PostgreSQL database:
Connect to PostgreSQL:
Execute the db.sql file to create and switch to the employee_db database
Execute the schema.sql file to create the tables
Execute the seeds.sql file to insert the seed data

4- Create a .env file in the root directory and add your PostgreSQL connection details.

How to Run

Start the application:
~ bash

node server.js
Follow the prompts:
When the application starts, you will be presented with a menu of options.
Use the arrow keys to navigate the menu and press Enter to select an option.
Follow the prompts to view or manage departments, roles, and employees.
Usage

The application provides a series of prompts to manage your company's employee database. You can perform the following actions:

View all departments: Displays a list of all departments.
View all roles: Displays a list of all roles, including job title, role ID, the department the role belongs to, and salary.
View all employees: Displays a list of all employees, including employee ID, first name, last name, job title, department, salary, and manager.
Add a department: Prompts for the name of the new department and adds it to the database.
Add a role: Prompts for the name, salary, and department of the new role and adds it to the database.
Add an employee: Prompts for the first name, last name, role, and manager of the new employee and adds them to the database.
Update an employee role: Prompts to select an employee and their new role, then updates the employee's role in the database.


Google Drive Link:

Github Link: