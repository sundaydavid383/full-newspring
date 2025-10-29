import React, { useState, useEffect, useRef } from "react";
import backgroundImage from "../../assets/hero.jpg";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import FormMessage from "../../components/FormMessage/FormMessage";
import Loading from "../../components/loading/Loading";

const SignupForm = ({ onSuccess, setDataBase, onLoad }) => {
  const base_Url = "http://localhost:5001/";
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
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  // --- New UX states ---
  const [redirectCountdown, setRedirectCountdown] = useState(null); // null or seconds
  const redirectTimerRef = useRef(null);

  const [resendCooldown, setResendCooldown] = useState(0); // seconds left for resend
  const resendTimerRef = useRef(null);

  // cleanup timers on unmount
  useEffect(() => {
    const storedUser = localStorage.getItem('TIM412user');
    if (storedUser){
      try {
        const user = JSON.parse(storedUser);
        if (user.isVerified) navigate('/');
        if (user && user.email && !user.isVerified){
          console.log("🟡 Unverified user detected:", user.email);
          setFormData((prev) => ({ ...prev, email: user.email}));

          setStep(4);
          setType('info');
          setMessage(`⚠️ Your account is not verified. Please verify your email (${user.email}).`)
  
        }
      } catch (err) {
         console.warn("Invalid user data in localStorage:", err);
      }
    }
    return () => {
      if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    };
  }, []);

  // Generic handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const startRedirectCountdown = (seconds = 10, path = "/login") => {
    // clear any previous
    if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
    setRedirectCountdown(seconds);
    setType("info");
    setMessage((prev) =>
      `ℹ️ Redirecting to login in ${seconds} seconds... (you can cancel)`
    );
    

    redirectTimerRef.current = setInterval(() => {
      setRedirectCountdown((s) => {
        if (!s || s <= 1) {
          clearInterval(redirectTimerRef.current);
          redirectTimerRef.current = null;
          navigate(path);
          return null;
        }
        const next = s - 1
        setMessage(`ℹ️ Redirecting to login in ${next} seconds... (you can cancel)`);
        return next;
      });
    }, 1000);
  };

  const cancelRedirect = () => {
    if (redirectTimerRef.current) {
      clearInterval(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
    setRedirectCountdown(null);
    setMessage("");
    setType("");
  };

  const startResendCooldown = (seconds = 30) => {
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
    }
    setResendCooldown(seconds);

    resendTimerRef.current = setInterval(() => {
      setResendCooldown((s) => {
        if (!s || s <= 1) {
          clearInterval(resendTimerRef.current);
          resendTimerRef.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  // ================= Validation =================
  const validateStep = (currentStep) => {
    setType("");
    setMessage("");

    if (currentStep === 1) {
      const { firstname, lastname, email, phone, age } = formData;
      const phoneRegx = /^\+?[1-9]\d{6,14}$/;
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

  // ================= Submit (register) =================
  const handleSubmit = async ()=> {
    if (!validateStep(3)) return;

    try {
      setLoading(true);
      setType('')
      setMessage('')

      console.log("🟢 Submitting signup form...", formData);
      
      const response = await fetch(`${base_Url}api/people`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await response.json()
      console.log("📥 Server Response:", response.status, data);

      if(response.status === 409){
        setType('info')
        setMessage(
        "⚠️ This email is already registered. Redirecting to login page..."
      );
      setStep(4);
      startRedirectCountdown(10, '/login');
      return;
      }

      if(!response.ok){
        setType('error');
        setMessage(data?.message || "⚠️ Registration failed. Try again.");
        return;
      }

      setType('success');
      setMessage(
          data.message ||
        "✅ Account created successfully. Please check your email for OTP."
      )

      setStep(4);

      const mailSent = 
      typeof data.mailSent === 'boolean'
      ? data.mailSent
      : /otp|email/i.test(data.message || '');

      if (!mailSent){
        setType('warning');
        setMessage(
          "⚠️ Account created, but OTP email couldn’t be sent. Try resending in 30s."
        );
        startResendCooldown(30);
      } else {
        startResendCooldown(10);
      }

      onSuccess?.();
      setLoading(false)
    } catch (err) {
    console.error("❌ Submit error:", err);
    setType("error");
    setMessage("⚠️ Could not connect to the server. Please try again later.");
    setLoading(false);
    }
    finally{
      setLoading(false)
    }
  }

  // ================= OTP Verification =================
  const handleVerifyOtp = async () => {
    if (!otp) {
      setType("error");
      setMessage("⚠️ Enter OTP to verify.");
      return;
    }

    try {
      setLoading(true);
      setType('')
      setMessage("Verifying OTP...");

      const response = await fetch(`${base_Url}api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();
      console.log("📥 verify-otp response:", response.status, data);


      if (!response.ok) {
        setType("error");
        setMessage(data?.message || "⚠️ OTP verification failed.");
        setLoading(false);
        return;
      }

      const userObj = data?.data ?? null;
      const token = data?.token ?? null;
      if (!userObj) {
        setType("error");
        setMessage("⚠️ Verification returned no user data. Try logging in.");
        setLoading(false);
        return;
      }

      localStorage.setItem("TIM412user", JSON.stringify(userObj));
      if (token) localStorage.setItem("TIM412token", token);
      setDataBase?.(userObj);


      // Clear any active timers 
      if (redirectTimerRef.current){
        clearInterval(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
        resendTimerRef.current = null;
      }
      setRedirectCountdown(null);
      setResendCooldown(0);

      setType("success");
      setMessage("✅ OTP verified! Registration complete. Redirecting to home...");
      setLoading(false);
      // small delay so user sees success
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error("❌ OTP verify error:", err);
      setType("error");
      setMessage("⚠️ Could not verify OTP. Try again.");
      setLoading(false);
    }
  };

  // ================= Resend OTP =================
  const handleResendOtp = async () => {
    if (resendCooldown > 0) {
      setType("info");
      setMessage(`Please wait ${resendCooldown}s before resending OTP.`);
      return;
    }

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
      setMessage("✅ OTP resent successfully. Check your email.");
      // give a cooldown to prevent spam
      startResendCooldown(30);
      setLoading(false);
    } catch (err) {
      console.error("❌ Resend OTP error:", err);
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
      <FormMessage type={type} message={message} onClose={() => { setMessage(""); setType(""); }} />

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
              <button type="button" onClick={handleResendOtp} disabled={resendCooldown > 0}>
                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
              </button>
            </div>

            {/* If there is a redirect countdown (example: already registered), show controls */}
            {redirectCountdown !== null && (
              <div style={{ marginTop: 12 }}>
                <p>Redirecting to login in {redirectCountdown}s...</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="button" onClick={() => navigate("/login")}>Go to Login Now</button>
                  <button type="button" onClick={cancelRedirect}>Stay</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="btn-group">
          {step > 1 && step < 4 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 3 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 3 && <button type="button" onClick={handleSubmit}>Submit</button>}
        </div>

        <Link to="/login" className="login-link">Already registered? Log in</Link>
      </form>
    </div>
  );
};

export default SignupForm;
