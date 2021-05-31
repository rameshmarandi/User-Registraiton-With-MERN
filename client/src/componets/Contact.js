import React,{useState,useEffect} from 'react';

const Contact = () => {

    const [userData, setUserData ] = useState({name:"" , email : "" , contact:""  , message  : ""});
  const callContactPage = async() =>{
      try{
          
       const res = await fetch("/getData", {
           method : "GET",
           headers :{              
               "Content-Type": "application/json"
           },
         
       });

       const data = await res.json();
       console.log(data);
       setUserData({...userData , name:data.name , email:data.email, contact:data.contact})

       if(!res.status === 200){
           const error = new Error(res.error);
           throw error;
       }

      }catch(err){
          console.log(err);
          
      }
  }

  useEffect(()=>{
   callContactPage();
  }, [])

  // We are storing data in State

  const handleInput = (e) =>{
  
     const name = e.target.name;
     const value = e.target.value;
     setUserData({...userData ,[name] : value});

  }

  // Send the data into Backend means message and contact and email

  const contactForm =async (e) =>{
        e.preventDefault();
            const {name , email , contact, message } = userData;

        const res = await fetch("/contact" , { 
            method : "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name , email , contact, message
            })
        });

        const data = await res.json();

        if(!data){
            console.log("Message not send");
        }else{
            alert("Message Send Sucessfully");
            setUserData({...userData , message:""});
        }
  }

    return (
        
           <>
           <div className="top_container">
               <div className="contianer-fluid mt-4 offset-2">
                   <div className="row  ">
                       <div className="col-md-3 col-sm-10   ">
                            <div className="contianer_data">
                                <div className="left_content">
                                <i class="zmdi zmdi-phone"></i>
                                </div>
                                <div className="right_content">
                                    <div className="title">
                                        Phone
                                    </div>
                                    <div className="content">
                                        +91-
                                       {userData.contact}
                                    </div>
                                </div>
                            </div>
                       </div>


                       <div className="col-md-3  col-sm-10  ">
                            <div className="contianer_data">
                                <div className="left_content">
                                <i class="zmdi zmdi-email"></i>
                                </div>
                                <div className="right_content">
                                    <div className="title">
                                        Email
                                    </div>
                                    <div className="content">
                                       {userData.email}
                                    </div>
                                </div>
                            </div>
                       </div> 


                       <div className="col-md-3 col-sm-10  ">
                            <div className="contianer_data">
                                <div className="left_content">
                                <i class="zmdi zmdi-gps-dot"></i>
                                </div>
                                <div className="right_content">
                                    <div className="title">
                                        Address
                                    </div>
                                    <div className="content">
                                        Pimple Guruv, Pune
                                    </div>
                                </div>
                            </div>
                       </div>
               
                   </div>
               </div>
           </div>


           {/* ************************Message Boxes**************** */}


           <div className="main_container">
               <div className="message_Box">
                   <h1 className="heading">Get in Touch</h1>
                   <div className="form_Data">
                       <form method = "POST">
                          <div className="input_Box">
                          <input type="text" name="name" id="name"  
                          onChange={handleInput}
                          
                         value={userData.name} disabled placeholder="Your Name"/>
                           <input type="email" name="email" id="email"  
                           onChange={handleInput}
                           
                          value={userData.email} disabled placeholder="Your Email"/>
                           <input type="text" name="contact" id="phone"  
                           onChange={handleInput}
                           
                          value={userData.contact} disabled placeholder="Your Phone"/>

                          </div>
                           <div className="text_Section">
                           <textarea className="msg_text" id="" cols="50" 
                           onChange={handleInput}
                           name="message"                            
                          value={userData.message} rows="5" placeholder="Message"></textarea>
                           <button type="submit"
                            onClick={contactForm}
                           className="btn btn-primary btn-lg button" name ="submit_btn" id="submit_btn">Send Message</button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
        </>
      
    )
}

export default Contact
