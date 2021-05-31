const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:"./config.env"});

const DB = process.env.DATABASE;

// const DB = "mongodb+srv://ramesh:ramesh745@cluster0.8ffij.mongodb.net/EmployeeRegistration?retryWrites=true&w=majority"

mongoose.connect(DB , {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() =>{
    console.log("Connection Successful");
}).catch((err) =>{
    console.log("No Connection");
})
