import React, { useState, useEffect, useRef } from "react";
import "./hero.css";

const Hero = ({
  sections,
  sectionType,
  buttonType,
  dataBase,
  setDataBase,
  onLoad,
}) => {
  let buttonParagrah = "Read More";
  if (buttonType === "raedArticle") {
    buttonParagrah = "views articles";
  } else if (buttonType == "article") {
    buttonParagrah = "Read article";
  } else {
    buttonParagrah = "Read More";
  }

  const [title, setTitle] = useState("");
  const [opeTitle, setOpeTitle] = useState("N");
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [seeEmailStatus, setSeeEmailStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentidx = useRef(currentIndex);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    school: "",
    occupation: "",
    hobbies: "",
    heardAboutUs: "",
    interest: "", // Changed from 'interests' to 'interest' for single select
    prayerRequest: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData)
  };
  const onSubmit = (e) => {
    e.preventDefault();
  
    // Get all the DOM elements
    const firstNameLable = document.getElementById("firstNameLable");
    const firstname = document.getElementById("firstname");
    const lastNameLable = document.getElementById("lastNameLable");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const emailLabel = document.getElementById("emailLabel");
    const phone = document.getElementById("phone");
    const phoneLable = document.getElementById("phoneLable");
    const age = document.getElementById("age");
    const ageLabel = document.getElementById("ageLabel");
    const school = document.getElementById("school");
    const schoolLabel = document.getElementById("schoolLabel");
    const occupation = document.getElementById("occupation");
    const occupationLabel = document.getElementById("occupationLabel");
    const hobbies = document.getElementById("hobbies");
    const hobbiesLabel = document.getElementById("hobbiesLabel");
    const heardAboutUs = document.getElementById("heardAboutUs");
    const heardAboutUsLabel = document.getElementById("heardAboutUsLabel");
    const interest = document.getElementById("interest");
    const interestLabel = document.getElementById("interestLabel");
  
    // Regex for phone and email validation
    const phoneRegx = /^\+?[0-9]\d{10,13}$/;
    const emailRegx =
      /^[A-Za-z0-9%._+-]+@[A-Za-z0-9._\-]+\.[A-Za-z-0-9-.]{2,6}$/;
  
    // Check First Name
    if (formData.firstName.trim() === "") {
      firstname.classList.add("alert");
      firstNameLable.textContent = "Input your first name";
      setTimeout(() => {
        firstname.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check Last Name
    else if (formData.lastName.trim() === "") {
      lastname.classList.add("alert");
      lastNameLable.textContent = "Input your last name";
      setTimeout(() => {
        lastname.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check Email
    else if (formData.email.trim() === "") {
      email.classList.add("alert");
      emailLabel.textContent = "Input email address";
      setTimeout(() => {
        email.classList.remove("alert");
      }, 2000);
      return;
    } else if (!emailRegx.test(formData.email)) {
      email.classList.add("alert");
      emailLabel.textContent = "Input a valid email address";
      setTimeout(() => {
        email.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check Phone
    else if (formData.phone.trim() === "") {
      phone.classList.add("alert");
      phoneLable.textContent = "Input a phone number";
      setTimeout(() => {
        phone.classList.remove("alert");
      }, 2000);
      return;
    } else if (!phoneRegx.test(formData.phone)) {
      phone.classList.add("alert");
      phoneLable.textContent = "Input a valid phone number";
      setTimeout(() => {
        phone.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check Age
    else if (formData.age.trim() === "") {
      age.classList.add("alert");
      ageLabel.textContent = "Input your age";
      setTimeout(() => {
        age.classList.remove("alert");
      }, 2000);
      return;
    } else if (isNaN(formData.age) || formData.age < 16|| formData.age > 24) {
      age.classList.add("alert");
      ageLabel.textContent = "Please input a valid age rrom 16 to 24";
      setTimeout(() => {
        age.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check School (optional but should not be empty if provided)
    else if (formData.school.trim() === "" || formData.school.trim().length < 3) {
      school.classList.add("alert");
      schoolLabel.textContent = "Please input none if you not in school";
      setTimeout(() => {
        school.classList.remove("alert");
      }, 2000);
      return;
    }
    //checkk for occupation
    else if (formData.occupation.trim() === "" || formData.occupation.trim().length < 3) {
      occupation.classList.add("alert");
      occupationLabel.textContent = "Please input none if you have no occupation";
      setTimeout(() => {
        occupation.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check Hobbies (optional but should not be empty if provided)
    else if (formData.hobbies.trim() === "" || formData.hobbies.trim().length < 3) {
      hobbies.classList.add("alert");
      hobbiesLabel.textContent = "Please input a valid hobby (at least 3 characters)";
      setTimeout(() => {
        hobbies.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check Heard About Us
    else if (formData.heardAboutUs.trim() === "") {
      heardAboutUs.classList.add("alert");
      heardAboutUsLabel.textContent = "Please select how you heard about us";
      setTimeout(() => {
        heardAboutUs.classList.remove("alert");
      }, 2000);
      return;
    }
    // Check Interests (single select)
    else if (formData.interest.trim() === "") {
      interest.classList.add("alert");
      interestLabel.textContent = "Please select your interest";
      setTimeout(() => {
        interest.classList.remove("alert");
      }, 2000);
      return;
    }
    // If everything is correct, reset the form and handle submission
    else {
      e.target.reset();
      lastNameLable.textContent = "";
      firstNameLable.textContent = "";
      emailLabel.textContent = "";
      phoneLable.textContent = "";
      ageLabel.textContent = "";
      heardAboutUsLabel.textContent = "";
      interestLabel.textContent = "";
      schoolLabel.textContent = "";
      hobbiesLabel.textContent = "";
  
      phone.classList.remove("alert");
      email.classList.remove("alert");
      lastname.classList.remove("alert");
      firstname.classList.remove("alert");
      age.classList.remove("alert");
      heardAboutUs.classList.remove("alert");
      interest.classList.remove("alert");
      school.classList.remove("alert");
      hobbies.classList.remove("alert");
  
      console.log("Form Data:", formData);
  
      // Call your backend function or any necessary API for processing
      addPerson(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.age,
        formData.school,
        formData.occupation,
        formData.hobbies,
        formData.heardAboutUs,
        formData.interest
      );
  
      sendMail(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone
      );
  
      speakAfterRegistration();
  
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        school: "",
        occupation: "",
        hobbies: "",
        heardAboutUs: "",
        interests: "",
      });
    }
  };

  const speakAfterRegistration = async () => {
    const response = await fetch(
      "http://localhost:5001/speak/after/registration",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstName,
          phone: formData.phone,
          email: formData.email,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const sendMail = async (firstname, lastname, email, phone) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5001/sendmessage/oncreated",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstname, lastname, email, phone }),
        }
      );
      if (!response.ok) {
        throw new Error(`an error of ${response.statusText} occured`);
      }
      setLoading(false);
      const data = response.json();
      setSentEmail(true);
      console.log(data.message);
    } catch (error) {
      setLoading(false);
      alert("an error occured");
    }
  };
  console.log("database in Hero.jsx", dataBase);
  async function addPerson(
    firstname,
    lastname,
    email,
    phone,
    age,
    school,
    occupation,
    hobbies,
    heardAboutUs,
    interest
  ) {
    try {
      console.log("Sending data to backend:", {
        firstname,
        lastname,
        email,
        phone,
        age,
        school,
        occupation,
        hobbies,
        heardAboutUs,
        interest,
      });
  
      const response = await fetch("http://localhost:5001/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          age,
          school,
          occupation,
          hobbies,
          heardAboutUs,
          interest,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Received response:", data);
  
      if (!loading) {
        setEmailStatus(
          `${
            sentEmail
              ? "You have been successfully added to the list! We've sent an email to you, check your spam list and remove it from spam list if not found in inbox."
              : "You have been successfully added to the list!"
          }`
        );
        setSeeEmailStatus(true);
      }
  
      onLoad();
      setDataBase(data.data);
    } catch (error) {
      console.error("Error in addPerson:", error);
      setEmailStatus("An error occurred: " + error.message);
      setSeeEmailStatus(true);
    }
  }
  return (
    <div className="hero">
   {loading && (
       <div className="loading">
       <div className="bar bar1"></div>
       <div className="bar bar2"></div>
       <div className="bar bar3"></div>
     </div>
      )}   
      {seeEmailStatus ? (
        <div className="emial_status">
          <p>{emailStatus}</p>
          <div
            onClick={() => {
              setSeeEmailStatus(false);
              setEmailStatus("");
            }}
            className="btn"
          >
            Got it
          </div>
        </div>
      ) : null}
      {currentIndex < 3 ? (
        <i
          onClick={() => {
            setCurrentIndex((prev) => prev + 1);
          }}
          className="fa-solid fa-arrow-right"
        ></i>
      ) : null}
      {currentIndex > 0 ? (
        <i
          onClick={() => {
            setCurrentIndex((prev) => prev - 1);
          }}
          className="fa-solid fa-arrow-left"
        ></i>
      ) : null}
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
       <h2>Register as a member</h2>
       <div className="inputs">
         <div className="names">
           <div className="input">
             <input
               onChange={handleChange}
               type="text"
               name="firstName"
               id="firstname"
               placeholder="First Name"
             />
             <label className="realLabels" id="firstNameLable"></label>
           </div>
           <div className="input">
             <input
               onChange={handleChange}
               type="text"
               name="lastName"
               id="lastname"
               placeholder="Last Name"
             />
             <label className="realLabels" id="lastNameLable"></label>
           </div>
         </div>
         <div className="input">
           <input
             onChange={handleChange}
             type="text"
             name="email"
             id="email"
             placeholder="Email"
           />
           <label className="realLabels" id="emailLabel"></label>
         </div>
         <div className="names">
         <div className="input">
           <input
             onChange={handleChange}
             type="text"
             name="phone"
             id="phone"
             placeholder="Phone"
           />
           <label className="realLabels" id="phoneLable"></label>
         </div>
         <div className="input">
           <input
             type="number"
             name="age"
             id="age"
             value={formData.age || ""}
             onChange={handleChange}
             placeholder="Age"
             maxLength={4}
           />
           <label className="realLabels" id="ageLabel"></label>
         </div>
         </div>
         <div className="input">
           <input
             onChange={handleChange}
             type="text"
             name="school"
             id="school"
             value={formData.school}
             placeholder="School"
           />
           <label className="realLabels" id="schoolLabel"></label>
         </div>
         <div className="names">
         <div className="input">
           <input
             onChange={handleChange}
             type="text"
             name="occupation"
             id="occupation"
             value={formData.occupation}
             placeholder="Occupation "
           />
           <label className="realLabels" id="occupationLabel"></label>
         </div>
         <div className="input">
           <input
             onChange={handleChange}
             type="text"
             name="hobbies"
             id="hobbies"
             value={formData.hobbies}
             placeholder="Hobbies / Interests"
           />
           <label className="realLabels" id="hobbiesLabel"></label>
         </div>
         </div>
         <div className="input">
           <select
             name="heardAboutUs"
             id="heardAboutUs"
             onChange={handleChange}
             value={formData.heardAboutUs}
           >
             <option value="">How did you hear about us? </option>
             <option value="Instagram">Instagram</option>
             <option value="Friend">A friend invited me</option>
             <option value="Church">Church service</option>
             <option value="Online">Randomly found you online</option>
             <option value="Other">Other</option>
           </select>
           <label className="realLabels" id="heardAboutUsLabel"></label>
         </div>
         <div className="input">
           <select
             name="interest"
             id="interest"
             value={formData.interest}
             onChange={handleChange}
           >
             <option value="">What would you love to be part of?</option>
             <option value="Music team / Choir">Music team / Choir</option>
             <option value="Media / Tech / Content">Media / Tech / Content</option>
             <option value="Bible study">Bible study</option>
             <option value="Outreach / Volunteering">Outreach / Volunteering</option>
             <option value="Games & social hangouts">Games & social hangouts</option>
             <option value="Not sure yet">Not sure yet</option>
           </select>
           <label className="realLabels" id="interestLabel"></label>
         </div>
         <button className="btn-slide" type="submit">
           <p>Register</p>
         </button>
       </div>
     </form>
      ) : null}
      <div className="hero_form"></div>
    </div>
  );
};

export default Hero;
