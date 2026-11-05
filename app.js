// Imports
const express = require("express");
const dotenv = require("dotenv");
const { engine } = require("express-handlebars");
const exphbar = require("express-handlebars");
const bodyParser = require('body-parser'); // used to handle JSON data
const mysql = require('mysql');
const processEnv = process.env;
// Initialize Dotenv
dotenv.config();
const PORT = processEnv.PORT || 5000;




// Create an Express App
const app = express();

// To Access Static Files inside Public Folder
app.use(express.static('public'));

// Parse Data From Forms
app.use(bodyParser.urlencoded({ extended: false }));

// Parse Request body so that it will be available in request.body
app.use(bodyParser.json());

// MySQL
const connection = mysql.createPool({
    connectionLimit: 10,
    host: processEnv.DB_HOST,
    database: processEnv.DB_NAME,
    user: processEnv.DB_USERNAME,
    password: processEnv.DB_PASSWORD
});

// Check Database Connection
connection.getConnection

// Configure handlebars
const handlebars = exphbar.create({
    extension: ".hbs"
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// app.engine('handlebars', exphbar.engine());  
// app.set('view engine', 'handlebars');



// API Routes
app.get('/home', (req, res) => {
    const employee = {
        name: "Murugan",
        email: "murugan@gmail.com",
        department: "IT",
        salary: 5000
    };
    res.render('home', { employee });
});
app.get('/', (req, res) => {
    const students = [
        {
            id: 1,
            name: "Ligesh",
            age: 25,
            location: "Chennai"
        },
        {
            id: 2,
            name: "Vignesh",
            age: 20,
            location: "Coimbatore"
        },
        {
            id: 3,
            name: "Rakesh",
            age: 25,
            location: "Trichy"
        },
        {
            id: 4,
            name: "Sudha",
            age: 20,
            location: "Chennai"
        },
    ];
    res.render("home", {students});
});

app.get('/loops', (req, res) => {

    const employees = [
        {
            name: "Muruguganesan",
            department: "IT"
        },
        {
            name: "David",
            department: "HR"
        }
    ];

    res.render('employees', { employees })
});


app.listen(PORT, () => console.log(`Server running in the port: http://localhost:${PORT}`))
