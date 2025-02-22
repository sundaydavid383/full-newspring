import React, { useState, useEffect, useRef } from "react";
import "./hero.css";

const Hero = ({ sections, sectionType, buttonType, dataBase, setDataBase, onLoad }) => {
  let buttonParagrah = "Read More"
  if(buttonType === "raedArticle"){
      buttonParagrah = "views articles"
  }else if(buttonType == "article"){
     buttonParagrah = "Read article"
  }
  else{
    buttonParagrah = "Read More"
  }

  const [title, setTitle] = useState("");
  const [opeTitle, setOpeTitle] = useState("N");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentidx = useRef(currentIndex);
  const [registerNames, setRegisterNames] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    
  })

  useEffect(() => {
    currentidx.current = currentIndex;
  }, [currentIndex]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sections.length);
    }, 76000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    setTitle(sections[currentIndex].title);
  }, [currentIndex]);

  // useEffect(() => {
  //   // if(title.)
  //   if(opeTitle){
  //     setOpeTitle(title[0])
  //   }

  //   let i = 0;
  //   const intervalId = setInterval(() => {
  //   if (i < title.length-1){
  //       setOpeTitle(prev=>prev+title[i])
  //       i++
  //   }
  // else{
  //       clearInterval(intervalId)
  //     }
  //   }, 130);
  //   return () => {

  //     clearInterval(intervalId)

  //   }
  // }, [title])

  const handleLearnMore = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };
 
  const handleNameChange = (e)=>{
    const name = e.target.name;
    setRegisterNames((prev)=>prev, registerNames[name] = e.target.value)
    console.log(registerNames);
  }
  const onSubmit = (e)=>{
    e.preventDefault()

    const firstNameLable =  document.getElementById("firstNameLable");
    const firstname = document.getElementById("firstname");
    const lastNameLable = document.getElementById("lastNameLable")
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const emailLabel = document.getElementById("emailLabel");
    const phone = document.getElementById("phone");
    const phoneLable = document.getElementById("phoneLable");
    const phoneRegx = /^\+?[0-9]\d{10,13}$/;
    const emailRegx = /^[A-Za-z0-9%._+-]+@[A-Za-z0-9._\-]+\.[A-Za-z-0-9-.]{2,6}$/;


    if(registerNames.firstName.trim() === ""){
        firstname.classList.add("alert");
        firstNameLable.textContent = "input your first name";
        setTimeout(() => {
          firstname.classList.remove("alert");
        }, 2000);
        
        return
    }
    else if(registerNames.lastName.trim() === ""){
      lastname.classList.add("alert");
      lastNameLable.textContent = "input your last name";
      setTimeout(() => {
        lastname.classList.remove("alert");
      }, 2000);
      return
  }
  else if(registerNames.email.trim() === ""){
    email.classList.add("alert");
    emailLabel.textContent = "input email address";
    setTimeout(() => {
      email.classList.remove("alert");
    }, 2000);
    return
}
 else if(!emailRegx.test(registerNames.email)){
   email.classList.add("alert");
   emailLabel.textContent = "input a valid email address";
   setTimeout(() => {
     email.classList.remove("alert");
   }, 2000);
   return;
 }
 else if(registerNames.phone.trim() === ""){
  phone.classList.add("alert");
  phoneLable.textContent = "input a phone number";
  setTimeout(() => {
    phone.classList.remove("alert");
  }, 2000);
  return;
}
else if(!phoneRegx.test(registerNames.phone)){
   phone.classList.add("alert");
   phoneLable.textContent = "input a valid phone number";
   setTimeout(() => {
     phone.classList.remove("alert");
   }, 2000);
   return;
 }
 else{
  e.target.reset()
  
 lastNameLable.textContent = ""
  firstNameLable.textContent = ""
  emailLabel.textContent = ""
  phoneLable.textContent = ""
 phone.classList.remove("alert")
 email.classList.remove("alert")
 lastname.classList.remove("alert")
 firstname.classList.remove("alert")
  alert("You have been successfully added to the list!")
   console.log("this are the datas", registerNames.firstName, registerNames.email, registerNames.lastName, registerNames.phone);
   addPerson(registerNames.firstName, registerNames.lastName, registerNames.email, registerNames.phone)

  }
}
console.log("database in Hero.jsx",dataBase )
async function addPerson(firstname, lastname, email, phone) {
  try {
   const response = await fetch('http://localhost:5000/api/people',{
     method: 'POST',
     headers:{'Content-Type': 'application/json'},
     body:JSON.stringify({firstname, lastname, email, phone})
   });
   const data = await response.json()
   console.log(data.data)
    setDataBase(data.data)
    onLoad() 
    console.log("new dataBase",dataBase)
  } catch (error) {
    console.error(error);
    alert("An Error Occurred")
  }
}
  return (
    <div className="hero">
      {currentIndex < 3?<i onClick={()=>{setCurrentIndex((prev)=>prev+1)}} className="fa-solid fa-arrow-right"></i>:null}
      {currentIndex > 0?<i onClick={()=>{setCurrentIndex((prev)=>prev-1)}}className="fa-solid fa-arrow-left"></i>:null}
      {sections.map((section, index) =>
        currentidx.current == index ? (
          <div
            key={index}
            className={`container_flex_between hero_text_content ${
              sectionType == "contact" ? "noContact" : ""
            } hero_text_content${section.id}`}
          >
            <div className="hero_text">
              <h1
                dangerouslySetInnerHTML={{ __html: section.title }}
                className="hero_header"
              />
              <div className="hero_para">
                {section.paragraphs.map((paragraph, paraindex) => (
                  <p className="para" key={paraindex}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="hero_button">
              <button onClick={handleLearnMore} className="btn">
                <p>{buttonParagrah}</p>
              
              
              </button>
            </div>
          </div>
        ) : null
      )}
      <div className="bar_active">
        <span
          onClick={() => {
            setCurrentIndex(0);
          }}
          className={`${currentidx.current == 0 ? "opacity1" : ""}`}
        ></span>
        <span
          onClick={() => {
            setCurrentIndex(1);
          }}
          className={`${currentidx.current == 1 ? "opacity1" : ""}`}
        ></span>
        <span
          onClick={() => {
            setCurrentIndex(2);
          }}
          className={`${currentidx.current == 2 ? "opacity1" : ""}`}
        ></span>
        <span
          onClick={() => {
            setCurrentIndex(3);
          }}
          className={`${currentidx.current == 3 ? "opacity1" : ""}`}
        ></span>
      </div>
      {sectionType !== "contact" ? (
        <form onSubmit={onSubmit}>
          <h2>Register as a member</h2>{" "}
          <div className="inputs">
            <div className="names">
              <div className="input">
                <label htmlFor="">First Name:</label>
                <input
                  onChange={handleNameChange}
                  type="text"
                  name="firstName"
                  id="firstname"
                />
                <label className="realLabels" id="firstNameLable"></label>{" "}
              </div>
              <div className="input">
                
                <label htmlFor="">Last Name:</label>{" "}
                <input
                  onChange={handleNameChange}
                  type="text"
                  name="lastName"
                  id="lastname"
                />
                <label className="realLabels" id="lastNameLable"></label>{" "}
              </div>
            </div>
            <div className="input">
              
              <label htmlFor="">Email:</label>{" "}
              <input onChange={handleNameChange} type="text" name="email" id="email" />{" "}
              <label className="realLabels" id="emailLabel"></label>{" "}
            </div>
            <div className="input">
              
              <label htmlFor="">Phone:</label>{" "}
              <input onChange={handleNameChange} type="text" name="phone" id="phone" />{" "}
              <label className="realLabels" id="phoneLable"></label>{" "}
            </div>{" "}
            <button className="btn-slide" type="submit">
              {" "}
              <p>Register</p>{" "}
            </button>{" "}
          </div>{" "}
          <p></p>{" "}
        </form>
      ) : null}
      <div className="hero_form"></div>
    </div>
  );
};

export default Hero;
