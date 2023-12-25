const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
// const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inventory',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('Connected to MySQL');
});

// Routes
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        console.log("Inserted Data");
        res.status(201).send("User registered successfully");
    });
});


app.post('/LoginUsers', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * from users WHERE email = ?'
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ message: 'Internal server error. Please try again later.' });
            return;
        }

        if (results.length > 0) {

            if (password === results[0].password) {
                res.json({ message: 'Login successful', user: results[0] });
            } else {
                res.status(401).json({ message: `Incorrect password. Please try again.` });
            }
        } else {
            res.status(404).json({ message: 'User not found. Please check your username.' });
        }
    });
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
