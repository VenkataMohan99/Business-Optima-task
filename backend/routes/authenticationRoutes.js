const express = require('express');
const { connection } = require('../config/dbconnection');
const route = express.Router();
const bcrypt = require("bcrypt");

//signup new user 
route.post("/signupUser", async (req, res) => {

    let mySqlfindUserQuery = `select * from users where Email_Id='${req.body.email}'`

    connection.query(mySqlfindUserQuery, async (error, result, fields) => {
        if (error) {
            res.json({
                status: false,
                message: 'error'
            })
        }
        else if (result.length > 0) {
            res.json({
                status: true,
                message: "User already created"
            })
        } else {
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            let mySqlQuery = `insert into users (Full_Name,Email_Id,Password) values 
            ('${req.body.fullName}','${req.body.email}','${hashedPassword}')`

            connection.query(mySqlQuery, (error, result, fields) => {
                if (error) {
                    res.json({
                        status: false,
                        message: 'error'
                    })
                }
                else {
                    res.json({
                        status: true,
                        message: "User Cerated Successfully"
                    })
                }
            })
        }
    })
})

//login user
route.post("/login", (req, res) => {
    let mySqlQuery = `select * from users where Email_Id='${req.body.email}'`
    connection.query(mySqlQuery, async (error, result, fields) => {
        if (error) {
            res.json(error)
        }
        else {

            if (result.length > 0) {
                let checkPassword = await bcrypt.compare(req.body.password, result[0].Password);

                if (checkPassword == true) {
                    res.json(
                        {
                            status: true,
                            message: "Successfully Login",
                            data: result
                        }
                    );

                }
                else {
                    res.json({
                        status: false,
                        message: "Invalid Password",
                    });
                }
            }
            else {
                res.json({
                    status: false,
                    message: "User Detalis Not Found"
                });
            }
        }
    })
})

module.exports = route