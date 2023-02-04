INSERT INTO department (id, dept_name)
VALUES  (001, "Customer Service"),
        (002, "Production"),
        (003, "Human Resources"),
        (004, "Executive");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, "Barista", 35,000.00, 001),
        (002, "Founder", 400,000.00, 004),
        (003, "Baker", 40,000.00, 002),
        (004, "Shift Supervisor", 40,500.00, 001),
        (005, "Executive Pastry Chef", 75,000.00, 002),
        (006, "Payroll Admin", 37,500.00, 003),
        (007, "Operations Manager", 80,000.00, 004),
        (008, "Financial Manager", 55,000.00, 003);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES   (001, "Jane", "Dough", 002,),
         (002, "James", "Bond", 002, 007),
         (003, "Jeffrey", "Huxtable", 006, 008),
         (004, "Blade", "Blurbrick", 001, 004),
         (005, "Aurelia", "Banks", 005),
         (006, "Leo", "Johnson", 004),
         (007, "Monet", "Bags", 008),
         (008, "Susie", "Johnson", 003, 005);
