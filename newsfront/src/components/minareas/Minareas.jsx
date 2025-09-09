import { useState } from "react";
import "./minareas.css";
import FormMessage from "../FormMessage/FormMessage";

const Minareas = ({ ministryAreas, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({ firstname: "", lastname:"", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success or error
    const base_Url = "http://localhost:5001/";

  const handleCardClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, ministry) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("🚀 Submitting form with data:", {
      name: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      ministry: ministry.title,
    });

    try {
      const res = await fetch(`${base_Url}api/ministry-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          ministry: ministry.title,
        }),
      });

      const data = await res.json();
      console.log("📩 Backend response:", data);

        if (data.code === "USER_NOT_FOUND") {
        setType("error");
        setMessage("❌ User not found. Redirecting to signup...");
        setTimeout(() => window.location.href = "/signup", 2000);
      } else if (data.code === "REGISTERED") {
        setType("success");
        setMessage(`✅ You have been registered for ${ministry.title}`);
      } else if (data.code === "SERVER_ERROR") {
        setType("error");
        setMessage("⚠️ Server error. Please try again later.");
      } else {
        setType("error");
        setMessage(`⚠️ Unexpected response: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("💥 Frontend fetch error:", error);
      setMessage("⚠️ Network or server error. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Minareas">
      <h2 className="title">{title}</h2>
      <p className="title_small">
        Discover the unique ways we serve God and build His kingdom. Each
        ministry area is designed to nurture faith, foster love, and empower
        lives.
      </p>

      <div className="minareas_container container_flex_around">
        {ministryAreas.map((area, index) => {
          const isSelected = selectedIndex === index;

          return (
            <div
              key={index}
              className={`minareas_card ${
                isSelected
                  ? "enlarged"
                  : selectedIndex !== null
                  ? "shrunk"
                  : ""
              }`}
            >
              {isSelected ? (
                <div className="minarea_detail">
                  <button
                    className="back_btn"
                    onClick={() => setSelectedIndex(null)}
                  >
                    ← Back
                  </button>
                  <div className="detail_header">
                    <img src={area.img} alt={area.title} />
                    <h2>{area.title}</h2>
                    <i className={area.icon}></i>
                  </div>
                  <p className="detail_description">{area.description}</p>

                  {/* Registration Form */}
                  <form
                    className="ministry_form"
                    onSubmit={(e) => handleSubmit(e, area)}
                  >
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="ministry"
                      value={area.title}
                      readOnly
                    />
                    <button type="submit" className="btn" disabled={loading}>
                      <p>{loading ? "Submitting..." : "Register"}</p>
                    </button>
                  </form>

                 
      <FormMessage
        type={type}
        message={message}
        onClose={() => setMessage("")}
      />
                </div>
              ) : (
                <div onClick={() => handleCardClick(index)}>
                  <div className="minareas_image">
                    <img src={area.img} alt={area.title} />
                    <span>
                      <i className={area.icon}></i>
                    </span>
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <button className="btn">
                    <p>{area.linkText}</p>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Minareas;