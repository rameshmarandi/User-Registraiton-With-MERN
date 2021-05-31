import React,{useState} from 'react'
import signup from "../Images/signup.png";

import {  NavLink ,useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const history = useHistory();
   const[user , setUser] = useState({
            name : "",
            email : "",
            contact : "",
            work :"",
            password : "",
            cpassword : ""
   })

const inputHandler = (e) => {
   e.preventDefault();

   let name , value;
   name = e.target.name;
   value = e.target.value
  console.log(name , value)
  setUser({...user , [name] : value})

}



//Sending Data into Backend and Database


const postDdata = async (e) =>{
   e.preventDefault();
   
   const {name , email, contact , work , password , cpassword} = user;

  const res =  await fetch("/register", {
      method: "POST",
      headers: {
          "Content-Type" : "application/json",

      },
      body:JSON.stringify({
        name , email, contact , work , password , cpassword
      })
  });

  const data = await res.json();
  
  if(res.status === 422 || !data){
    //   alert("Please Fill The Data");
    //   console.log("Please fill the data")
      toast.error("Please Fill The Data!",  {
        position: "top-center",
        autoClose: 2800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
       
  } else if(res.status === 200){
    alert("User Already Exists");
    history.push("/signin");
  }else{
      alert("User Register Sucessfully");
    //   console.log("User Register Sucessfully");
      // toast.success("User Register Sucessfully",  {
      //   position: "top-center"
        
      //   })

      history.push("/signin");
  }

}


    return (
        <>
           <div className="container">
                   <div className="center_container">
                       {/* Leftside Container */}

                       <div className="row">
                           <div className="col-md-6 col-10">
                           <form method = " POST">
                             <h1 className="heading text-align-left">Signup</h1>
                              <div className="form-group">
                                  <label htmlFor="name">
                                    <i className="zmdi zmdi-account"></i>
                                   </label>
                                   <input type="text" name="name" id="name" 
            
                                  value={user.name} onChange={inputHandler}

                                  placeholder="Enter Name" autoComplete="off"/>
                               </div>
                               <div class="form-group">
                                  <label htmlFor="email">
                                  <i class="zmdi zmdi-email"></i>
                                   </label>
                                   <input type="email" name="email" id="email" 
                                           value={user.email} onChange={inputHandler}
                                   placeholder="Enter Email" autoComplete="off"/>
                               </div>

                               <div class="form-group">
                                  <label htmlFor="contact">
                                  <i class="zmdi zmdi-phone"></i>
                                   </label>
                                   <input type="text" name="contact" id="contact" 
                                  value={user.contact} onChange={inputHandler}
                                     placeholder="Enter Phone" autoComplete="off"/>
                               </div>

                               <div class="form-group">
                                  <label htmlFor="work">
                                  <i class="zmdi zmdi-case"></i>
                                   </label>
                                   <input type="text" name="work" id="work" 
            
                                  value={user.work} onChange={inputHandler}
                                  placeholder="Enter Profession" autoComplete="off"/>
                               </div>

                               <div class="form-group">
                                  <label htmlFor="password">
                                  <i class="zmdi zmdi-lock"></i>
                                   </label>
                                   <input type="password" name="password" id="password" 
                                      value={user.password} onChange={inputHandler}
                                      placeholder="Enter Password" autoComplete="off"/>
                               </div>

                               <div class="form-group">
                                  <label htmlFor="cpassword">
                                  <i class="zmdi zmdi-lock"></i>
                                   </label>
                                   <input type="password" name="cpassword" id="cpassword"
                                   
                                   
                                          value={user.cpassword} onChange={inputHandler}
                                       placeholder="Enter Confirm Password" autoComplete="off"/>
                               </div>
                               <button type="submit" onClick={postDdata}     className="btn btn-primary btn-lg" name ="submit_btn" id="submit_btn">Submit</button>
                              <NavLink to="/signin" className="redirect_to_login">Login</NavLink>
                           </form>
                           </div>

                               {/* Right side Container */}
                               <div className="col-md-6">
                                   <div className="right_side_div">
                                       <img src={signup} alt="lgo" className="sing_up_img" />
                                   </div>
                               </div>

                       </div>
                   </div>
            </div>  
            <ToastContainer />
           
        </>
    )
}

export default Signup
