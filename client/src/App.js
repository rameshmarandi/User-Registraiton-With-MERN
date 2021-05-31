import React,{createContext,useReducer} from 'react'
import Navbar from "./componets/Navbar";
import Home from "./componets/Home";
import About from "./componets/About";
import Signin from "./componets/Signin";
import Signup from "./componets/Signup";
import Contact from "./componets/Contact";
import { Route ,Switch } from "react-router-dom";
import ErrorPage from "./componets/ErrorPage";
import Logout from "./componets/Logout";

import {initialState , reducer} from "../src/reducer/UseReducer";

// 1.Context aPI
export const UserContext = createContext();

const Routing = () =>{
  return(
    <Switch>
      <Route  exact path= "/" >
        <Home/>
      </Route>
      <Route  exact path= "/about" >
        <About/>
      </Route>
      <Route  exact path= "/contact" >
        <Contact/>
      </Route>
      <Route  exact path= "/signin" >
        <Signin/>
      </Route>
      <Route  exact path= "/signup" >
        <Signup/>
      </Route>
      <Route  exact path= "/logout" >
        <Logout/>
      </Route>
      <Route exact path= "">
            <ErrorPage/>
      </Route>
      </Switch>
  )
}
const App = () => {
  const [state , dispatch] = useReducer(reducer , initialState)

  return (
    <>
   <UserContext.Provider value={{state, dispatch}}>
      <Navbar/>
      <Routing/>
    </UserContext.Provider>
    </>
  )
}

export default App
