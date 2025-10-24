import React, { useEffect, useState } from "react";
import "./contactForm.css";
import FormMessage from "../FormMessage/FormMessage";

const ContactForm = ({ contactFormData, formType }) => {
  const [emailStatus, setEmailStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // success or error
  const [loading, setLoading] = useState(false);
  const [seeEmailStatus, setSeeEmailStatus] = useState(false);

  const baseUrl = "http://localhost:5001/"
  // "https://full-newspring.onrender.com/";

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    age: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    const ageNum = Number(formData.age);

    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.age || isNaN(ageNum)) newErrors.age = "Valid age is required";
    else if (ageNum < 16 || ageNum > 24)
      newErrors.age = "Sorry, this program is only for youth between 16–24 years";

    if (!/^[0-9]{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number (10–15 digits)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // ✅ This stays — but move it here, at the top level
  useEffect(() => {
    const storedUser = localStorage.getItem("TIM412user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        address: user.address || "",
        age: user.age || "",
        phone: user.phone || "",
        email: user.email || "",
        message: "", // start fresh
      });
    }
  }, []);

  // 🔽 onSubmit only handles the submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const payload = { ...formData, formType };

    try {
      const response = await fetch(`${baseUrl}sendmessage/oncontact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (data.code === "EMAIL_NAME_MISMATCH") {
        setStatusType("error");
        setEmailStatus("❌ Please make sure the name matches the one linked to this email.");
      } else if (data.success) {
        setFormData({
        firstname: "",
        lastname: "",
        address: "",
        age: "",
        phone: "",
        email: "",
        message: "",
      });
        setStatusType("success");
        setEmailStatus(data.message || "Message sent successfully!");
      } else {
        setStatusType("error");
        setEmailStatus(data.message || "Something went wrong.");
      }

      setSeeEmailStatus(true);
    } catch (error) {
      setEmailStatus(error.message || "Something went wrong.");
      setStatusType("error");
      setSeeEmailStatus(true);
      console.log("Error:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setSeeEmailStatus(false),45000);
      console.log("I actually ran; maybe something is wrong with your backend");
    }
  };

  return (
    <div className="contactForm container_flex_around" id="contactForm">
      <img src={contactFormData.formSrc} alt="Contact illustration" />

      <form onSubmit={onSubmit} className="contactForm-form">
        <h2>{contactFormData.formTitle}</h2>
        <p>{contactFormData.formText}</p>

        <div className="contactForm_name">
          <input
            onChange={handleChange}
            value={formData.firstname}
            name="firstname"
            type="text"
            placeholder="First Name"
          />
          {errors.firstname && <span className="error">{errors.firstname}</span>}

          <input
            onChange={handleChange}
            value={formData.lastname}
            name="lastname"
            type="text"
            placeholder="Last Name"
          />
          {errors.lastname && <span className="error">{errors.lastname}</span>}
        </div>

        <div className="contactForm_name">
          <input
            onChange={handleChange}
            value={formData.age}
            name="age"
            type="number"
            placeholder="Age"
          />
          {errors.age && <span className="error">{errors.age}</span>}

          <input
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            type="tel"
            placeholder="Phone Number"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <input
          onChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          onChange={handleChange}
          value={formData.address}
          name="address"
          type="text"
          placeholder="Address"
        />

        <textarea
          onChange={handleChange}
          value={formData.message}
          name="message"
          placeholder="Your Message (optional)"
        ></textarea>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? (
            <div className="btn">
              <p>
                <span className="spinner"></span> loading...
              </p>
            </div>
          ) : (
            <p>Register</p>
          )}
        </button>
      </form>

      {seeEmailStatus && (
        <FormMessage
          type={statusType}
          message={emailStatus}
          onClose={() => setSeeEmailStatus(false)}
        />
      )}
    </div>
  );
};

export default ContactForm;