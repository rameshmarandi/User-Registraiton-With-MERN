const express = require('express');
const router = express.Router();
require("../db/conn");
const Employee = require("../model/userSchema");
// const bcrypt = require('bcrypt');
const bcrypt = require('bcrypt');
const authenticate = require("../middleware/authenticate");

router.get("/" , (req, res) =>{
    res.send("Hello  outer page");
});

router.post("/register" , async(req, res) =>{
    const{name , email , contact , work , password , cpassword} = req.body;

    try{

        if(!name || !email || !contact || !work || !password || !cpassword){
            return res.status(422).json({Message : "Please Fill Details"});
         }

         const userExist = await Employee.findOne({email:email});
         if(userExist){
             return res.status(200).json({Message:"User Already Exists"});
         }

         const newUser = new Employee({name , email , contact , work, password, cpassword})
         
         const userRegistered = await newUser.save();
         if(userRegistered){
             return res.status(201).json({message:"User Registered Successfully"});
         }



    }catch(e){
        console.log(e);
    }

  
});


// Login Functionality  Code 


router.post("/signin", async (req,res) =>{
    const {email , password} = req.body;

    try{
        if(!email || !password){
            return res.status(402).json({Message:"Please Fill the Details"});
         }
        const validUser = await Employee.findOne({email: email});
        console.log(validUser);
        if(!validUser){
            return res.status(400).json({Message : "User Not Found"})
        }

        //Generate The Tokens

        const token = await validUser.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken" , token , {
            expires: new Date(Date.now() + 5000000),
            httpOnly : true
        })
        if(validUser){
            const isMatch = await  bcrypt.compare(password, validUser.password);
            if(!isMatch){
                return res.status(400).json({Message : "Please fill the Details"})
            }else{
                return res.json({Message:"User Login Successfull"});
            }
        }else{
            return res.status(400).json({Message:"Invalid Details"});
        }
            

    }catch(e){
        console.log(e);
    }

});

//Authenticate the user after user verify he can access..
// so we are using here middleware for verfification

// router.use(cookieParser());
router.get("/about", authenticate ,  (req, res) =>{
    console.log("WElcome to About page");
    res.send(req.rootUser);

}) ; 


// Get user Data for Contactus Page and Home Page

router.get("/getData", authenticate ,  (req, res) =>{
    console.log("WElcome to About page");
    res.send(req.rootUser);

}) ; 


// Logout ka pages

router.get("/logout", (req, res) =>{
    console.log("WElcome to Logout page page");
    res.clearCookie("jwtoken" , {path:"/"}) ; // Clear the all the Cookie
    res.status(200).send("User logout");

}) ; 

//Contact us ka Pages

router.post("/contact", authenticate, async (req, res) =>{
    try{

   const {name , email , contact , message} = req.body;

    if(!name || !email || !contact || !message ){
        console.log("Error in Contact Us page")
        return res.json({error : "Plese fill the contact form"});
    }

    const userContact = await Employee.findOne({_id: req.userID});
      
    if(userContact){
        const userMessage =await userContact.addMessage(name, email , contact, message);
        await userContact.save();
        res.status(201).json({message : "User send Messages"});
    }


    }catch(error){
        console.log(error);
    }
}) 


module.exports = router;