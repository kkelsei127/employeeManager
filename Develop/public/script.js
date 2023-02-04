const inquirer = require('inquirer');

// const directoryPrompts = [{
//     type: 'list',
//     message: 'What would you like to do?',
//     choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add an employee', 'Update an employee role'],
//     name: 'Directory'
// }];


function addDept(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the departments name?',
            name: dept_name
        }
    ]).then(data =>{
        //add data to dept name in db
    });
    console.log(`Added new department to directory!`);
    directory();
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the role called?',
            name: title
        },
        {
            type: 'input',
            message: 'What is the salary amount?',
            name: salary
        },
        {
            type: 'list',
            message: "What department does this role belong to?",
            choices: ['Customer Service', 'Production', 'Human Resources', 'Executive'], //insert choices ,
            name: department
        }
    ]).then(data => {
        //add role to data
    });
    console.log(`Added new role to directory!`);
    directory();
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: first_name
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: last_name
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            choices: ['Barista', 'Founder', 'Baker', 'Shift Supervisor', 'Executive Pastry Chef', 'Payroll Admin', 'Operations Manager', 'Financials Manager'],
            name: role
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            choices: ['Jane Dough', "Leo Johnson", "Aurelia Banks", "Monet Bags"],
            name: manager
        }
    ])
    console.log(`Added new employee to directory!`);
    directory();
}


function directory(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add an employee', 'Update an employee role', 'Exit'],
            name: 'Directory' 
        }
    ]).then(data => {
        if(data.Directory === "View all departments") {
            //show all departments
        }else if(data.Directory === "View all roles") {
            //view all roles
        }else if(data.Directory === "View all employees"){
            //view all employees
        }else if(data.Directory === "Add a department"){
            //add a department
            addDept();
        }else if(data.Directory === "Add an employee"){
            //add an employee
            addRole();
        }else if(data.Directory === "Update an employee role"){
            //update employee role
            addEmployee();
        }else{return}
    })
}

directory();