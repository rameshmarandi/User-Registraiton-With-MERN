import React,{useEffect ,useState} from 'react'
import avtar from "../Images/avtar.png";
import {useHistory} from "react-router-dom"; 

const About = () => {
const history = useHistory();

  const [userData, setUserData ] = useState("");
  const callAboutPage = async() =>{
      try{
          
       const res = await fetch("/about", {
           method : "GET",
           headers :{
               Accept : "application/json",
               "Content-Type": "application/json"
           },
           credentials : "include"
       });

       const data = await res.json();
       console.log(data);
       setUserData(data)

       if(!res.status === 200){
           const error = new Error(res.error);
           throw error;
       }

      }catch(err){
          console.log(err);
          history.push("/signin");
      }
  }

  useEffect(()=>{
   callAboutPage();
  }, [])
    return (
        <>
        <div className="about_main_container">
            <div className="container_about mt-5">
               <form method="GET">
               <div className="row">
                    <div className="col-md-6 col-10">
                        <div className="about_left_contianer mt-5">
                            <img src={avtar} alt="left_img" />
                            <div className="about_content">
                                <h1 className="about_name">{userData.name}</h1>
                                <h2>{userData.work}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-10">
                        <div className="about_right_contianer mt-3">
                        <h1>About Me</h1>
                        <ul>
                            <li>Name : <span>{userData.name}</span></li>
                            <li>Profession : <span>{userData.work}</span></li>
                            <li>Email : <span>{userData.email}</span></li>
                            <li>Contact:  <span>{userData.contact}</span></li>

                        </ul>
                        </div>
                    </div>
                </div>
               </form>
            </div>
        </div>
        </>
    )
}

export default About
