import React from 'react';
import {NavLink} from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
          <div className="error_page">
           <div className="error_content">
           <h1>404</h1>
           <h3>Oops! Page not found</h3>    
   
          
      <NavLink to="/" className="error_btn ">Back </NavLink>   
           
   
           </div>
         </div>  
        </>
    )
}

export default ErrorPage
