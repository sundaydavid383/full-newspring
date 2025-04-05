import React, { useState } from "react";
import "./ContactForm.css";



const ContactForm = ({contactFormData}) => {
  const [emailStatus, setEmailStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [seeEmailStatus, setseeEmailStatus] = useState(false)
  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    address:"",
    age:"",
    phone:"", 
    email: "",
    message: "",
  });
  const handleClick = (e) => {
    const Name = e.target.name;
    setformData((prev) => ({ ...prev, [Name]: e.target.value }));
    console.log(formData);
  };

  // 
  
  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5001/sendmessage/oncontact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:formData.firstname, email:formData.email, message:formData.message})
      })
      if(!response.ok){
        throw new Error("an error occured:", response.statusText);
      }
      setformData({firstname: "",email: "",message: "", });
      const data = await response.json()
      setLoading(false)
      console.log("loading is now false with  this data:",formData.firstname, formData.email, formData.message)
      
      setEmailStatus(data.message)
      setseeEmailStatus(true)
      setTimeout(() => {
        setseeEmailStatus(false)
      }, 3000);

    } catch (error) {
      setLoading(false)
      console.log("loading is now false")
      setformData({firstname: "",email: "",message: "", });
      setEmailStatus(error.message)
      alert(error.message)
      setseeEmailStatus(true)
      setTimeout(() => {
        setseeEmailStatus(false)
      }, 3000);

      console.error("an error ocurred:", error)
     
      
    }
  }

  const onSubmitRetreat = (e)=>{
     e.preventDefault()
    const numberAge = parseInt(formData.age)
     if(isNaN(numberAge)){
       age.classList.add("error")
       setTimeout(() => {
        age.classList.remove("error")
       }, 2000);
       return;
     }
     alert(`succesfully submited for testing ${formData.age}`)
  } 
 
 

  return (
    <div className="contactForm container_flex_around">
      <img src={contactFormData.formSrc} alt="" />
      {loading?<div className="loading">
        <div className="loader">
        </div>
       </div>:null}
      {contactFormData.type === "forRereat"? 
      <form onSubmit={onSubmitRetreat} className="contactForm-form">
      <h2>{contactFormData.formTitle}</h2>
      <p>{contactFormData.formText}</p>
      <div className="contactForm_name">
        <input
          onChange={handleClick}
          value={formData.firstname}
          name="firstname"
          type="text"
          required
          placeholder="First Name"
          aria-label="Enter your Firstname" 
        />
         <input
          onChange={handleClick}
          value={formData.lastname}
          name="lastname"
          type="text"
          required
          placeholder="Last Name"
          aria-label="Enter your Lastname" 
        />
       
      </div>
      <div className="contactForm_name">
      <input
          onChange= {handleClick}
          value={formData.age}  
          name="age"
          type="age"
          required
          id="age"
          placeholder="how old are you "
          maxLength={2}
          aria-label="Enter your age" 
        />
         <input
          onChange={handleClick}
          value={formData.phone}
          name="phone"
          type="tel"
          required
          placeholder="phone number"
          aria-label="Enter your phone number" 
        />
        </div>
        <input
          onChange={handleClick}
          value={formData.email}
          name="email"
          type="email"
          required
          placeholder="Email"
          aria-label="Enter your email" 
        />
         <input
          onChange={handleClick}
          value={formData.address}
          name="address"
          type="Home address"
          required
          placeholder="House Address"
          aria-label="Enter your house address" 
        />
      <textarea
        onChange={handleClick}
        value={formData.message}
        name="message"
        required
        id=""
        placeholder="Your Message"
        aria-label="Enter your message" 
      ></textarea>
      <button aria-label="Submit Form" type="submit" className="btn">
        <p>Register</p>
      </button>
    </form>
    
    :

      <form onSubmit={onSubmit} className="contactForm-form">
      <h2>{contactFormData.formTitle}</h2>
      <p>{contactFormData.formText}</p>
      <div className="contactForm_name">
        <input
          onChange={handleClick}
          value={formData.firstname}
          name="firstname"
          type="text"
          required
          placeholder="First Name"
          aria-label="Enter your name" 
        />
        <input
          onChange={handleClick}
          value={formData.email}
          name="email"
          type="email"
          required
          placeholder="Email"
          aria-label="Enter your email" 
        />
      </div>
      <textarea
        onChange={handleClick}
        value={formData.message}
        name="message"
        required
        id=""
        placeholder="Your Message"
        aria-label="Enter your message" 
      ></textarea>
      <button aria-label="Submit Form" type="submit" className="btn">
        <p>Submit</p>
      </button>
    </form>}
      
     { seeEmailStatus ?<div className="emial_status">
        <p>{emailStatus}</p>
        <div onClick={()=>{setseeEmailStatus(false)}} className="btn">Got it</div>
      </div>:null}
    </div>
  );
};

export default ContactForm;
