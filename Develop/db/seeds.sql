INSERT INTO department (dept_name)
VALUES  ("Customer Service"),
        ("Production"),
        ("Human Resources"),
        ("Executive");

INSERT INTO roles (department_id, title, salary)
VALUES  (001, "Barista", 35000),
        (004, "Founder", 90000),
        (002, "Baker", 40000),
        (001, "Shift Supervisor", 40500),
        (002, "Executive Pastry Chef", 75000),
        (003, "Payroll Admin", 37500),
        (004, "Operations Manager", 80000),
        (003, "Financial Manager", 55000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jane", "Dough", 002, NULL),
        ("James", "Bond", 002, 007),
        ("Jeffrey", "Huxtable", 006, 008),
        ("Blade", "Blurbrick", 001, 004),
        ("Aurelia", "Banks", 005, NULL),
        ("Leo", "Johnson", 004, NULL),
        ("Monet", "Bags", 008, NULL),
        ("Susie", "Johnson", 003, 005);
