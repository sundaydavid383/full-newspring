import React, { useState } from "react";
import "./ContactForm.css";
import img1 from "../../assets/rccg66.jpg";


const ContactForm = () => {
  const [emailStatus, setEmailStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [seeEmailStatus, setseeEmailStatus] = useState(false)
  const [formData, setformData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:5000/sendmessage/oncontact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:formData.name, email:formData.email, message:formData.message})
      })
      if(!response.ok){
        throw new Error("an error occured:", response.statusText);
      }
      setformData({name: "",email: "",message: "", });
      const data = await response.json()
      setLoading(false)
      console.log("loading is now false")
      setEmailStatus(data.message)
      setseeEmailStatus(true)
      setTimeout(() => {
        setseeEmailStatus(false)
      }, 3000);

    } catch (error) {
      setLoading(false)
      console.log("loading is now false")
      setformData({name: "",email: "",message: "", });
      setEmailStatus(data.message)
      setseeEmailStatus(true)
      setTimeout(() => {
        setseeEmailStatus(false)
      }, 3000);

      console.error("an error ocurred:", error)
     
      
    }
  }

 

  return (
    <div className="contactForm container_flex_around">
      <img src={img1} alt="" />
      {loading?<div className="loading">
        <div className="loader">
        </div>
       </div>:null}
       
      <form onSubmit={onSubmit} className="contactForm-form">
        <h2>Have Any Questions</h2>
        <p>
          Please feel free to get in touch with us using the contact form below.
          We’d love to hear for you.
        </p>
        <div className="contactForm_name">
          <input
            onChange={handleClick}
            value={formData.name}
            name="name"
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
      </form>
     { seeEmailStatus ?<div className="emial_status">
        <p>{emailStatus}</p>
        <div onClick={()=>{setSeeEmailStatus(false)}} className="btn">Got it</div>
      </div>:null}
    </div>
  );
};

export default ContactForm;
