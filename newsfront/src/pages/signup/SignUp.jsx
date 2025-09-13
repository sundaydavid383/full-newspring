import React, { useState } from "react";
import backgroundImage from "../../assets/hero.jpg";
import "./signup.css";
import { useNavigate } from "react-router";
import FormMessage from "../../components/FormMessage/FormMessage";
import Loading from "../../components/loading/Loading";

const SignupForm = ({ onSuccess, setDataBase, onLoad }) => {
  const base_Url = "https://full-newspring.onrender.com/";
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // step 1,2,3,4 (OTP)
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
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(""); // <-- Added OTP state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  // ================= Handlers =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // ================= Validation =================
 const validateStep = (currentStep) => {
  setType("");
  setMessage("");

  if (currentStep === 1) {
    const { firstname, lastname, email, phone, age } = formData;
    const phoneRegx = /^\+?[1-9]\d{6,14}$/; // accepts +2348012345678
    const emailRegx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

    if (!firstname || !lastname || !email || !phone || !age) {
      setType("error");
      setMessage("⚠️ Please fill all personal info fields.");
      return false;
    }

    if (!emailRegx.test(email)) {
      setType("error");
      setMessage("⚠️ Invalid email. Example: user@example.com");
      return false;
    }

    if (!phoneRegx.test(phone)) {
      setType("error");
      setMessage("⚠️ Invalid phone. Use format like: +23480########");
      return false;
    }

    if (isNaN(age) || age < 16 || age > 24) {
      setType("error");
      setMessage("⚠️ Age must be between 16-24 years.");
      return false;
    }
  } else if (currentStep === 2) {
    const { school, occupation, hobbies } = formData;
    if (!school || !occupation || !hobbies) {
      setType("error");
      setMessage("⚠️ Fill all education and occupation fields.");
      return false;
    }
  } else if (currentStep === 3) {
    const { heardAboutUs, interest, password, confirmPassword } = formData;
    if (!heardAboutUs || !interest || !password || !confirmPassword) {
      setType("error");
      setMessage("⚠️ Complete all interests and password fields.");
      return false;
    }

    if (password.length < 6) {
      setType("error");
      setMessage("⚠️ Password too short. Minimum 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      setType("error");
      setMessage("⚠️ Passwords do not match. Check carefully.");
      return false;
    }
  }

  return true;
};

  // ================= Submit =================
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${base_Url}api/people`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        // Handle email already registered
        if (data?.message?.includes("already registered")) {
          setType("info");
          setMessage("⚠️ Email already registered. Please verify OTP.");
          setStep(4); // show OTP form
          setLoading(false);
          return;
        }

        setType("error");
        setMessage(data?.message || "⚠️ Submission failed.");
        setLoading(false);
        return;
      }

      localStorage.setItem("TIM412user", JSON.stringify(data.data));
      setType("success");
      setMessage("✅ Registration successful! Please verify OTP.");
      setDataBase?.(data.data);
      onSuccess?.();
      setStep(4); // show OTP form
      setLoading(false);
    } catch (err) {
      setType("error");
      setMessage("⚠️ Could not connect. Try again.");
      setLoading(false);
    }
  };

  // ================= OTP Handlers =================
  const handleVerifyOtp = async () => {
    if (!otp) {
      setType("error");
      setMessage("⚠️ Enter OTP to verify.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${base_Url}api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await response.json();

      if (!response.ok) {
        setType("error");
        setMessage(data?.message || "⚠️ OTP verification failed.");
        setLoading(false);
        return;
      }

      setType("success");
      setMessage("✅ OTP verified! Registration complete.");
      setLoading(false);
      navigate("/dashboard"); // or wherever
    } catch (err) {
      setType("error");
      setMessage("⚠️ Could not verify OTP. Try again.");
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${base_Url}api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setType("error");
        setMessage(data?.message || "⚠️ Could not resend OTP.");
        setLoading(false);
        return;
      }

      setType("success");
      setMessage("✅ OTP resent successfully.");
      setLoading(false);
    } catch (err) {
      setType("error");
      setMessage("⚠️ Could not resend OTP.");
      setLoading(false);
    }
  };

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading && <Loading message="Processing..." />}
      <FormMessage type={type} message={message} onClose={() => setMessage("")} />

      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Register as a member</h2>

        {step === 1 && (
          <div className="inputs">
            <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
            <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
          </div>
        )}

        {step === 2 && (
          <div className="inputs">
            <input type="text" name="school" placeholder="School" value={formData.school} onChange={handleChange} />
            <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />
            <input type="text" name="hobbies" placeholder="Hobbies" value={formData.hobbies} onChange={handleChange} />
          </div>
        )}

        {step === 3 && (
          <div className="inputs">
            <select name="heardAboutUs" value={formData.heardAboutUs} onChange={handleChange}>
              <option value="">How did you hear about us?</option>
              <option value="Instagram">Instagram</option>
              <option value="Friend">Friend</option>
              <option value="Church">Church</option>
              <option value="Online">Online</option>
              <option value="Other">Other</option>
            </select>

            <select name="interest" value={formData.interest} onChange={handleChange}>
              <option value="">What would you love to be part of?</option>
              <option value="Music team / Choir">Music team / Choir</option>
              <option value="Media / Tech / Content">Media / Tech / Content</option>
              <option value="Bible study">Bible study</option>
              <option value="Outreach / Volunteering">Outreach / Volunteering</option>
              <option value="Games & social hangouts">Games & social hangouts</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          </div>
        )}

        {step === 4 && (
          <div className="inputs">
            <h2>Verify your Email</h2>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="btn-group">
              <button type="button" onClick={handleVerifyOtp}>Verify OTP</button>
              <button type="button" onClick={handleResendOtp}>Resend OTP</button>
            </div>
          </div>
        )}

        <div className="btn-group">
          {step > 1 && step < 4 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 3 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 3 && <button type="button" onClick={handleSubmit}>Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;