const cors = require("cors");
const express = require("express");
const { connection } = require("./config/dbconnection");
const authRoutes = require('./routes/authenticationRoutes');

const app = express();
app.use(cors());

app.use(express.json());

app.listen(9985, () => {
    console.log("listening to port 9985");
})

//Data dase connection 
connection.connect((error) => {
    if (error) {
        console.log("Unable to connect to data base");
    }
    else {
        console.log("Successfully connected to data base");
    }

})

//authentication routes
app.use('/', authRoutes)
