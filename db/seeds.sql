INSERT INTO department(name) 
    VALUES ('Human Resources'), 
           ('Marketing'),
           ('Finance'),
           ('Legal');;


INSERT INTO role(title, salary, department_id) 
    VALUES ('HR Manager', 85000, 1), 
           ('Marketing Director', 120000, 2),
           ('Financial Analyst', 75000, 3),
           ('Legal Advisor', 95000, 4),
           ('Recruitment Specialist', 70000, 1),
           ('SEO Specialist', 60000, 2),
           ('Accountant', 65000, 3),
           ('Paralegal', 55000, 4);



INSERT INTO employee (first_name, last_name, role_id, is_manager, manager_id)
VALUES ('Alice', 'Smith', 1, TRUE, NULL),  -- HR Manager
       ('Bob', 'Johnson', 2, TRUE, NULL),  -- Marketing Director
       ('Carol', 'Williams', 3, TRUE, NULL),  -- Financial Analyst
       ('Dave', 'Brown', 4, TRUE, NULL),  -- Legal Advisor
       ('Eve', 'Davis', 5, FALSE, 1),  -- Recruitment Specialist, reports to HR Manager
       ('Frank', 'Miller', 6, FALSE, 2),  -- SEO Specialist, reports to Marketing Director
       ('Grace', 'Wilson', 7, FALSE, 3),  -- Accountant, reports to Financial Analyst
       ('Hank', 'Moore', 8, FALSE, 4);  -- Paralegal, reports to Legal Advisor