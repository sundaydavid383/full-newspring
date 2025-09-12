import React, { useState } from "react";
import backgroundImage from "../../assets/hero.jpg";
import "./signup.css";
import { useNavigate } from "react-router";

const SignupForm = ({ onSuccess, setDataBase, onLoad }) => {
  const base_Url = "https://full-newspring.onrender.com/";
  const navigate = useNavigate();

  // Step control: "form" -> "otp"
  const [step, setStep] = useState("form");

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

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [seeEmailStatus, setSeeEmailStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= Register (Step 1) =================
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
      password,
      confirmPassword,
    } = formData;

    // Regex
    const phoneRegx = /^\+?[0-9]\d{10,13}$/;
    const emailRegx =
      /^[A-Za-z0-9%._+-]+@[A-Za-z0-9._\-]+\.[A-Za-z-0-9-.]{2,6}$/;

    // Validations
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
      !interest ||
      !password ||
      !confirmPassword
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
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${base_Url}api/people`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailStatus(data?.message || "Failed to submit form.");
        setSeeEmailStatus(true);
        setLoading(false);
        return;
      }

      localStorage.setItem("TIM412user", JSON.stringify(data.data));

      // ✅ Move to OTP step
      setStep("otp");
      setLoading(false);
      setEmailStatus("We’ve sent an OTP to your email. Enter it below.");
      setSeeEmailStatus(true);

      onLoad();
      setDataBase(data.data);
      onSuccess?.();
    } catch (err) {
      setLoading(false);
      setEmailStatus(err.message || "Something went wrong.");
      setSeeEmailStatus(true);
    }
  };

  // ================= Verify OTP (Step 2) =================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter the OTP.");
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
        setEmailStatus(data?.message || "Invalid or expired OTP.");
        setSeeEmailStatus(true);
        setLoading(false);
        return;
      }

      setLoading(false);
      setEmailStatus("🎉 Account verified successfully!");
      setSeeEmailStatus(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setEmailStatus("Invalid or expired OTP.");
      setSeeEmailStatus(true);
    }
  };

  // ================= Resend OTP =================
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
        setEmailStatus(data?.message || "Failed to resend OTP.");
        setSeeEmailStatus(true);
        setLoading(false);
        return;
      }

      setLoading(false);
      setEmailStatus("OTP resent! Check your email/spam folder.");
      setSeeEmailStatus(true);
    } catch (err) {
      setLoading(false);
      setEmailStatus("Failed to resend OTP.");
      setSeeEmailStatus(true);
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
        {step === "form" && (
          <form onSubmit={handleSubmit}>
            <h2>Register as a member</h2>
            <div className="inputs">
              {/* User Details */}
              <input name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} />
              <input name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} />
              <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
              <input name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} />
              <input name="age" type="number" placeholder="Age" onChange={handleChange} value={formData.age} />
              <input name="school" placeholder="School" onChange={handleChange} value={formData.school} />
              <input name="occupation" placeholder="Occupation" onChange={handleChange} value={formData.occupation} />
              <input name="hobbies" placeholder="Hobbies" onChange={handleChange} value={formData.hobbies} />

              {/* Dropdowns */}
              <select name="heardAboutUs" onChange={handleChange} value={formData.heardAboutUs}>
                <option value="">How did you hear about us?</option>
                <option value="Instagram">Instagram</option>
                <option value="Friend">A friend invited me</option>
                <option value="Church">Church service</option>
                <option value="Online">Randomly found you online</option>
                <option value="Other">Other</option>
              </select>

              <select name="interest" onChange={handleChange} value={formData.interest}>
                <option value="">What would you love to be part of?</option>
                <option value="Music team / Choir">Music team / Choir</option>
                <option value="Media / Tech / Content">Media / Tech / Content</option>
                <option value="Bible study">Bible study</option>
                <option value="Outreach / Volunteering">Outreach / Volunteering</option>
                <option value="Games & social hangouts">Games & social hangouts</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>

              {/* Password Fields */}
              <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} />

              <button className="btn-slide" type="submit">
                <p>Register</p>
              </button>
            </div>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <h2>Verify your Email</h2>
            <div className="inputs">
              <input type="text" name="otp" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} value={otp} />
              <button className="btn-slide" type="submit">
                <p>Verify OTP</p>
              </button>
              <button className="btn-slide" type="button" onClick={handleResendOtp}>
                <p>Resend Code</p>
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default SignupForm;