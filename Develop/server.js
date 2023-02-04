const express = require('express');
//import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //mySQL username
        user: 'root',
        //mySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

//create employee
app.post('/api/new-employee', ({ body }, res)=> {
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES (?)`;
    const params = [body.first_name, body.last_name, body.role_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//read all departments
app.get('/api/department', (req, res) => {
    const sql = `SELECT id, dept_name AS department FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
             return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//read all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT id, title AS role FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
             return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


//read all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT id, first_name, last_name AS name FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
             return;
        }
        res.json({
            message:'success',
            data: rows
        });
    });
});

//default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});