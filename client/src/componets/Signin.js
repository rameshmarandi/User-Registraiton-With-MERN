import {React,useState,useContext} from 'react'

import {NavLink,useHistory} from "react-router-dom";
import login from "../Images/login.png";
 import {UserContext} from "../App"
const Signin = () => {

   const {state, dispatch }  = useContext(UserContext);

     const history = useHistory();
     const [email , setEmail] = useState("");
     const [password , setPassword] = useState("");
     

  const signinUser = async (e) =>{
    e.preventDefault();
  const res =   await fetch("/signin" ,  {
      method : "POST",
      headers:{
          "Content-Type": "application/json"
        //   'Accept': 'application/json'
      },
      body:JSON.stringify({
          email, password
      })
  });

  const data = await res.json();
  console.log(data);
  if(res.status === 400 || !data){
      alert("Invalid Details or User Not Found");
  }else if(res.status === 402){
      alert("Please fill the Details")
  } else{
    dispatch({type:"USER" , payload:true})
      alert("User Login Sucessfully");
      history.push("/");
  }
     
  }

   return (
        <>
             <div className="container">
                   <div className="center_container mt-5">
                       {/* Leftside Container */}



                       <div className="row">

                       <div className="col-md-6">
                                   <div className="right_side_div">
                                       <img src={login} alt="lgo" className="login_img" />
                                   </div>
                               </div>


                           <div className="col-md-6 col-10 login_right">
                           <form method = "POST">
                             <h1 className="heading text-align-left">Login</h1>
                             
                               <div className="form-group">
                                  <label htmlFor="email">
                                  <i className="zmdi zmdi-email"></i>
                                   </label>
                                   <input type="email" name="email" id="email" 
                                    
                                      value = {email}
                                      onChange={(e) =>{setEmail(e.target.value)}}
                                   placeholder="Enter Email" autoComplete="off"/>
                               </div>

                               <div className="form-group">
                                  <label htmlFor="password">
                                  <i className="zmdi zmdi-lock"></i>
                                   </label>
                                   <input type="password" name="password" id="password" 
                                    
                                    value = {password}
                                    onChange={(e) =>{setPassword(e.target.value)}}
                                      placeholder="Enter Password" autoComplete="off"/>
                               </div>

                              
                               <button type="submit" onClick={signinUser} className="btn btn-primary btn-lg" name ="submit_btn" id="submit_btn">Submit</button>
                              <NavLink to="/signup" className="redirect_to_login">Register</NavLink>
                           </form>
                           </div>

                               {/* Right side Container */}
                               

                       </div>
                   </div>
            </div>  

        </>
    )
}

export default Signin


// 