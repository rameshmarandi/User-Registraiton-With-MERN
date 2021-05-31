import React,{useState, useEffect} from 'react'

const Home = () => {


    const [userData, setUserData ] = useState("");
    const [show , setShow] = useState(false);
  const callHomePage = async() =>{
      try{
          
       const res = await fetch("/getData", {
           method : "GET",
           headers :{              
               "Content-Type": "application/json"
           },
         
       });

       const data = await res.json();
       console.log(data);
       setUserData(data.name)
       setShow(true);

    
      }catch(err){
          console.log(err);
          
      }
  }

  useEffect(()=>{
   callHomePage();
  }, [])

    return (
        <>
        <div className="main_div">
           <div className="center_div">
                
           <p>Welcome</p>
           <h1>{userData}</h1>
           <h2>{show ? "Happy , to see you back" : "WE ARE  THE MERN DEVELOPER"}</h2>
           </div>
        </div>
        </>)
}

export default Home
