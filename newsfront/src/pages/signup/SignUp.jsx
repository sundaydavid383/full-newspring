import React, { useState } from "react";
import backgroundImage from "../../assets/hero.jpg";
import "./signup.css";
import { useNavigate } from "react-router";

// ⚡ Make sure FormMessage is imported
import FormMessage from "../FormMessage/FormMessage";

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
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  // ================= Handlers =================
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

    // Regex checks
    const phoneRegx = /^\+?[1-9]\d{6,14}$/;
    const emailRegx =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

    // Validation
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
      setType("error");
      setMessage("⚠️ Please fill in all the spaces. None should be left empty.");
      return;
    }

    if (!emailRegx.test(email)) {
      setType("error");
      setMessage("⚠️ The email you typed is not valid. Example: name@gmail.com");
      return;
    }

    if (!phoneRegx.test(phone)) {
      setType("error");
      setMessage("⚠️ Your phone number looks wrong. Example: +2348012345678");
      return;
    }

    if (isNaN(age) || age < 16 || age > 24) {
      setType("error");
      setMessage("⚠️ Age must be between 16 and 24 to join.");
      return;
    }

    if (password.length < 6) {
      setType("error");
      setMessage("⚠️ Password must have at least 6 letters or numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setType("error");
      setMessage("⚠️ The two passwords you typed do not match.");
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
        setType("error");
        setMessage(data?.message || "⚠️ We could not save your form. Try again.");
        setLoading(false);
        return;
      }

      // Save user locally
      localStorage.setItem("TIM412user", JSON.stringify(data.data));

      // ✅ Move to OTP step
      setStep("otp");
      setType("success");
      setMessage("✅ Your form is saved. We sent a code to your email. Please check it and type the code here.");
      setLoading(false);

      onLoad?.();
      setDataBase?.(data.data);
      onSuccess?.();
    } catch (err) {
      console.error("💥 Error submitting form:", err.message);
      setType("error");
      setMessage("⚠️ Could not connect. Please check your internet and try again.");
      setLoading(false);
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

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("💥 Error verifying OTP:", err.message);
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
      setEmailStatus("✅ OTP resent! Check your email/spam folder.");
      setSeeEmailStatus(true);
    } catch (err) {
      console.error("💥 Error resending OTP:", err.message);
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

      <FormMessage
        type={type}
        message={message}
        onClose={() => setMessage("")}
      />

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
              <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} />
              <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
              <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} />
              <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} />
              <input type="text" name="school" placeholder="School" onChange={handleChange} value={formData.school} />
              <input type="text" name="occupation" placeholder="Occupation" onChange={handleChange} value={formData.occupation} />
              <input type="text" name="hobbies" placeholder="Hobbies" onChange={handleChange} value={formData.hobbies} />

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