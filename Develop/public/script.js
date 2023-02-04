const inquirer = require('inquirer');

// const directoryPrompts = [{
//     type: 'input',
//     message: 'What would you like to do?',
//     choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add an employee', 'Update an employee role'],
//     name: 'Directory'
// }];

function directory(){
    inquirer.prompt([
        {
            type: 'input',
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
        }else if(data.Directory === "Add an employee"){
            //add an employee
        }else if(data.Directory === "Update an employee role"){
            //update employee role
        }else{return}
    })
}

directory();