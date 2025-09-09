import React, { useState } from "react";
import backgroundImage from "../../assets/hero.jpg";
import "./signup.css";
import { useNavigate } from "react-router";

const SignupForm = ({ onSuccess, setDataBase, onLoad }) => {
  const base_Url = "https://full-newspring.onrender.com/";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    age: "",
    school: "",
    occupation: "",
    hobbies: "",
    heardAboutUs: "",
    interest: "",
  });
  const [loading, setLoading] = useState(false);
  const [seeEmailStatus, setSeeEmailStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const {
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
  } = formData;

  // Validation (unchanged)
  const phoneRegx = /^\+?[0-9]\d{10,13}$/;
  const emailRegx = /^[A-Za-z0-9%._+-]+@[A-Za-z0-9._\-]+\.[A-Za-z-0-9-.]{2,6}$/;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !age ||
    !school ||
    !occupation ||
    !hobbies ||
    !heardAboutUs ||
    !interest
  ) {
    alert("Please fill out all fields correctly.");
    return;
  }
  if (!emailRegx.test(email)) {
    alert("Invalid email format");
    return;
  }
  if (!phoneRegx.test(phone)) {
    alert("Invalid phone number");
    return;
  }
  if (isNaN(age) || age < 16 || age > 24) {
    alert("Age must be between 16 and 24");
    return;
  }

  try {
    setLoading(true);
    console.log("Form data before submit:", formData);

    const response = await fetch(`${base_Url}api/people`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Always parse JSON
    const data = await response.json();

    if (!response.ok) {
      // Show backend error if provided, else fallback
      const errorMessage = data?.message || "Failed to submit form.";
      setEmailStatus(errorMessage);
      setSeeEmailStatus(true);
      setLoading(false);
      return;
    }

    // ✅ Success flow
    setLoading(false);
    setEmailStatus(
      sentEmail
        ? "You’ve been added! Check your spam if no email."
        : "You’ve been successfully added!"
    );
    setSeeEmailStatus(true);

    onLoad();
    setDataBase(data.data);
    onSuccess?.();

    speakAfterRegistration(formData);
    sendMail(firstname, lastname, email, phone);

    // Reset form
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      age: "",
      school: "",
      occupation: "",
      hobbies: "",
      heardAboutUs: "",
      interest: "",
    });
    setTimeout(()=>{
       navigate("/");
    },3000)
  } catch (err) {
    setLoading(false);
    setEmailStatus(err.message || "Something went wrong.");
    setSeeEmailStatus(true);
  }
};

  const sendMail = async (firstname, lastname, email, phone) => {
    try {
      const response = await fetch(`${base_Url}sendmessage/oncreated`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, phone }),
      });
      if (!response.ok) throw new Error("Failed to send mail");
      const data = await response.json();
      setSentEmail(true);
      console.log(data.message);
    } catch (error) {
      alert("Email sending failed");
    }
  };

  const speakAfterRegistration = async (data) => {
    try {
      const res = await fetch(`http://localhost:5001/speak/after/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json?.speech) {
        const utter = new SpeechSynthesisUtterance(json.speech);
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      console.log("Failed to speak:", err);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading">
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </div>
      )}
      {seeEmailStatus && (
        <div className="email_status">
          <p>{emailStatus}</p>
          <div className="btn" onClick={() => setSeeEmailStatus(false)}>
            Got it
          </div>
        </div>
      )}
      <div
        className="hero"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2>Register as a member</h2>
          <div className="inputs">
            <input
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstname}
            />
            <input
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastname}
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              value={formData.phone}
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              value={formData.age}
            />
            <input
              name="school"
              placeholder="School"
              onChange={handleChange}
              value={formData.school}
            />
            <input
              name="occupation"
              placeholder="Occupation"
              onChange={handleChange}
              value={formData.occupation}
            />
            <input
              name="hobbies"
              placeholder="Hobbies"
              onChange={handleChange}
              value={formData.hobbies}
            />

            <select
              name="heardAboutUs"
              onChange={handleChange}
              value={formData.heardAboutUs}
            >
              <option value="">How did you hear about us?</option>
              <option value="Instagram">Instagram</option>
              <option value="Friend">A friend invited me</option>
              <option value="Church">Church service</option>
              <option value="Online">Randomly found you online</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="interest"
              onChange={handleChange}
              value={formData.interest}
            >
              <option value="">What would you love to be part of?</option>
              <option value="Music team / Choir">Music team / Choir</option>
              <option value="Media / Tech / Content">
                Media / Tech / Content
              </option>
              <option value="Bible study">Bible study</option>
              <option value="Outreach / Volunteering">
                Outreach / Volunteering
              </option>
              <option value="Games & social hangouts">
                Games & social hangouts
              </option>
              <option value="Not sure yet">Not sure yet</option>
            </select>

            <button className="btn-slide" type="submit">
              <p>Register</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;