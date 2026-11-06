
const mysql = require('mysql');
// const dotenv = require("dotenv");

// Initialize Dotenv
// dotenv.config();
const processEnv = process.env;
const PORT = processEnv.PORT || 5000;

// MySQL
const dbDatas = mysql.createPool({
    connectionLimit: 10,
    host: processEnv.DB_HOST,
    database: processEnv.DB_NAME,
    user: processEnv.DB_USERNAME,
    password: processEnv.DB_PASSWORD
});


exports.view = (req, res) => {
    const students = [
        {
            id: 1,
            name: "Ligesh",
            age: 25,
            city: "Chennai"
        },
        {
            id: 2,
            name: "Vignesh",
            age: 20,
            city: "Coimbatore"
        },
        {
            id: 3,
            name: "Rakesh",
            age: 25,
            city: "Trichy"
        },
        {
            id: 4,
            name: "Sudha",
            age: 20,
            city: "Chennai"
        },
    ];
    // Check Database Connection
    dbDatas.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connection Successful");
        connection.query(`SELECT * FROM users`, (err, rows) => {
            console.log("rows", rows);
            connection.release();
            if (!err) {
                console.log("Data Fetched Successfully");
                res.render("home", { rows });
            }
            else {
                console.log("Error in listing Data", err);

            }
        });
    });
    // res.render("home", { students });
};

exports.addUser = (req, res) => {
    // const { name, age, city} = req.body;
    // Check Database Connection
    // dbDatas.getConnection((err, connection) => {
    //     if (err) throw err;
    //     console.log("Connection Successful");
    //     connection.query(`SELECT * FROM users`, (err, rows) => {
    //         console.log("rows", rows);
    //         connection.release();
    //         if (!err) {
    //             console.log("Data Fetched Successfully");
    //             res.render("add-student");
    //         }
    //         else {
    //             console.log("Error in listing Data", err);

    //         }
    //     });
    // });
    res.render("add-student");
};

exports.editUserPage = (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    dbDatas.getConnection((err, connection) => {
        if (!err) {
            connection.query(`SELECT * FROM users WHERE id=?`, [id], (error, rows) => {
                if (!err) {
                    console.log("row", rows);
                    res.render('edit-user', { student: rows[0] });
                }
                else {
                    console.log("Error fetching individual record", error);
                }
            })
        }
        else {
            console.log("Connection failed", err);
        }
    });
    // res.render("edit-user");
}

exports.updateUser = (req, res) => {
    const { name, age, city } = req.body;
    console.log("req.body", req.body);
    const id = req.params.id;
    dbDatas.getConnection((err, connection) => {
        if (err) {
            console.log("error", err)
        }
        else {

            console.log("Connection Successful");

            connection.query(`UPDATE users SET name=?, age=?, city=? WHERE id=?`, [name, age, city, id], (err, rows) => {
                connection.release();
                if (!err) {
                    console.log("User Updated Successfully");
                    res.redirect('/');
                }
                else {
                    console.log("Error in Updating user", err);

                }
            });
        }

    });
}

exports.saveUser = (req, res) => {
    const { name, age, city } = req.body;
    dbDatas.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connection Successful");
        connection.query(`INSERT INTO users (NAME, age, city) VALUES(?, ?, ?)`, [name, age, city], (err, rows) => {
            connection.release();
            if (!err) {
                console.log("User created Successfully");
                res.redirect('/');
            }
            else {
                console.log("Error in adding user", err);

            }

        });
    });
};

exports.deleteUser = (req, res) => {
    console.log("req", req);
    const id = req.params.id;
    console.log("id", id);
    dbDatas.getConnection((err, connection) => {
        if (!err) {
            connection.query(`DELETE FROM users WHERE id=?`, [id], (err, rows) => {
                connection.release();
                if (!err) {
                    console.log("User deleted");
                    res.redirect('/');
                }
                else {
                    console.log("Error in deleting data", err);
                }
            })
        }
    })
}