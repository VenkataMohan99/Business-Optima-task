const mysql = require("mysql");

exports.connection = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    port: 3306,
    user: "sql10725467",
    password: "HB7csGJRLW",
    database: "sql10725467"
});
