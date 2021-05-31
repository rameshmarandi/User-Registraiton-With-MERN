const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');



const dotenv = require('dotenv');

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT;
// Database

const result = require("./db/conn");

// Employee Schema 

const Employee = require("./model/userSchema");
app.use(express.json());
// app.use(cors());
app.use(cookieParser()); //Very important to verify the token it must include in app.js file


// Router Path for
app.use(require("./router/auth"));



app.get("/" , (req, res) =>{
    res.send("Hello  from Home page");
});

// app.get("/about", middelware ,  (req, res) =>{
//     res.send("WElcome to About page");

// })

app.get("/register" , (req, res) =>
{
    res.send("Wlcome to register page")
});

app.get("/signin" , (req, res) =>{
    res.send("Welcome to Signin page");
})

app.listen(PORT , () =>{
    console.log(`Server is running at ${PORT}`)
})