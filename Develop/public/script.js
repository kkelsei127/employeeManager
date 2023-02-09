const inquirer = require('inquirer');
const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        //mySQL username
        user: 'root',
        //mySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

function addDept(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the departments name?',
            name: "department"
        }
    ]).then(data =>{
        //add data to dept name in db
        const sql = `INSERT INTO department(dept_name) VALUES (?)`;
        //this returns users input in an [user input]
        const params = [data.department];

        db.query(sql, params, (err, result) => {
            if (err) {
                return;
            }
            console.log(`Added new department to directory!`);
        });
        console.table(data);
        return directory();
    });
}

function addRole(){
    //this allows us to dynamically pull the departments
    const sql = `SELECT id, dept_name FROM department`;
    
    db.query(sql, (err, rows) => {
        if (err) {
             return;
        }
        //create a new object with just departments
        const departments = rows.map(obj => obj.id + " " + obj.dept_name)
        
        console.log(departments)
        inquirer.prompt([
            {
                type: 'list',
                message: "What department id does this role belong to?",
                choices: departments,
                name: 'department'
            },
            {
                type: 'input',
                message: 'What is the role called?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary amount?',
                name: 'salary'
            }            
        ]).then(data =>{
            //add data to roles in db
            const sql = `INSERT INTO roles(department_id, title, salary) VALUES (?,?,?)`;
            const params = [data.department.split(' ')[0], data.title, data.salary];

            console.log(params);//this is returning user input
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(`Added new role to directory!`);
            });
            console.table(data);
            return directory();
        });
    });
}
//need to finish this function
function addEmployee(){
    sqlRoles = "SELECT id, title FROM roles";
    db.query(sqlRoles, (err, rows) => {
        if (err) {
             console.log(err);
        }
        //create a new object with just roles title THIS WORKS WOOHOO
        const roles = rows.map(obj => obj.id + " " + obj.title)
        
        
        //create new query for employees
        sqlEmployees = "SELECT manager_id, first_name FROM employee"
        db.query(sqlEmployees, (err, empRows) => {
            if (err) {
                console.log(err);
            }
            //grab just their first and last names THIS WORKS
            const employees = empRows.map(obj => obj.manager_id + " " + obj.first_name)

            inquirer.prompt([
                {
                    type: 'input',
                    message: "What is the employee's first name?",
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: "What is the employee's last name?",
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: "What is the employee's role id?",
                    choices: roles,
                    name: 'role_id'
                },
                {
                    type: 'list',
                    message: "What is the employees manager id?",
                    choices: employees,
                    name: 'manager_id'
                }
            ]).then(data => {
                //add data to employee in db
                const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                const params = [data.first_name, data.last_name, data.role_id.split(" ")[0], data.manager_id.split(" ")[0]];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`Added new employee to directory!`);
                });
                console.table(data);
                return directory();
            });
        });
    });
}

function allDepts(){
    //use query to view all depts
    const sql = "SELECT * FROM department";
    
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }else{
        console.table(rows)
        return directory();
        }
    });
}


function allRoles(){
    //use query to view all roles
    const sql = 'SELECT * FROM roles';
    
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        return directory();
    });
}

function allEmps(){
    //use query to view all employees
    const sql = `SELECT * FROM employee`;
    
    db.query(sql, (err, rows) => {
        if (err) {
             return;
        }
        console.table(rows);
        return directory();
    });
}

function updateEmp(){
//use query to show employees
    const sqlEmp = "SELECT id, first_name FROM employee";

    db.query(sqlEmp, (err,rows) => {
        if (err) {
            console.log(err);
        }
        const employees = rows.map(obj => obj.id + " " + obj.first_name)

        //this grabs to roles title
        const sqlRole = "SELECT id, title FROM roles"
        db.query(sqlRole, (err,roleRows) => {
            if (err) {
                console.log(err)
            }
            const roles = roleRows.map(obj => obj.id + " " + obj.title)

            inquirer.prompt([
                {
                    type: 'list',
                    message: "Please select an employee you want to update",
                    choices: employees,
                    name: 'employee'
                },{
                    type: 'list',
                    message: "What is the employees new role?",
                    choices: roles,
                    name: 'title'
                }
            ]).then(data => {
                //create update statement
                const sql = "UPDATE employee SET role_id = ? WHERE id = ?"           

                const params = [data.title.split(" ")[0], data.employee.split(" ")[0]];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(`Added new employee to directory!`);
                });
                console.table(data);
                return directory();
            });
        });
    });
}


function directory(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
            name: 'Directory' 
        }
    ]).then(data => {
        if(data.Directory === "View all departments") {
            //show all departments
            allDepts();
        }else if(data.Directory === "View all roles") {
            //view all roles
            allRoles();
        }else if(data.Directory === "View all employees"){
            //view all employees
            allEmps();
        }else if(data.Directory === "Add a department"){
            //add a department
            addDept();
        }else if(data.Directory === "Add a role"){
            //add a role
            addRole();
        }else if(data.Directory === "Add an employee"){
            //add an employee
            addEmployee();
        }else if(data.Directory === "Update an employee role"){
            //update employee role
            updateEmp();
        }else{return}
    })
}

directory();