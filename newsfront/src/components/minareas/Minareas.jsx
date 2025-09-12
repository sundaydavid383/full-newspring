import { useState, useEffect } from "react";
import "./minareas.css";
import FormMessage from "../FormMessage/FormMessage";

const Minareas = ({ ministryAreas, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    answers: {} // ✅ store dynamic answers
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("TIM412user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || ""
      }));
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); 
  const base_Url = "http://localhost:5001/";

  const handleCardClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle dynamic ministry question answers
  const handleAnswerChange = (question, value) => {
    setFormData((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [question]: value
      }
    }));
  };

  const handleSubmit = async (e, ministry) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      ministry: ministry.title,
      answers: formData.answers // ✅ send dynamic answers
    };

    console.log("🚀 Submitting form:", payload);

    try {
      const res = await fetch(`${base_Url}api/ministry-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📩 Backend response:", data);

      if (data.code === "USER_NOT_FOUND") {
        setType("error");
        setMessage(`❌ No account found for ${formData.email}. Redirecting...`);
        setTimeout(() => (window.location.href = "/register"), 4000);
      } else if (data.code === "EMAIL_NAME_MISMATCH") {
        setType("error");
        setMessage("❌ Your name doesn’t match the email on record.");
      } else if (data.code === "REGISTERED") {
        setType("success");
        setMessage(`✅ You’re now registered for ${ministry.title}!`);
      } else if (data.code === "SERVER_ERROR") {
        setType("error");
        setMessage("⚠️ A server error occurred. Try again later.");
      } else if (data.code === "ALREADY_REGISTERED") {
        setType("error");
        setMessage(`ℹ️ You’re already registered in ${ministry.title}.`);
      } else {
        setType("error");
        setMessage(`⚠️ Unexpected response: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("💥 Frontend fetch error:", error);
      setMessage("⚠️ Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Minareas">
      <h2 className="title">{title}</h2>
      <p className="title_small">
        Discover the unique ways we serve God and build His kingdom.
      </p>

      <div className="minareas_container container_flex_around">
        {ministryAreas.map((area, index) => {
          const isSelected = selectedIndex === index;

          return (
            <div
              key={index}
              className={`minareas_card ${
                isSelected ? "enlarged" : selectedIndex !== null ? "shrunk" : ""
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

                  <FormMessage
                    type={type}
                    message={message}
                    onClose={() => setMessage("")}
                  />

                  {/* ✅ Dynamic Registration Form */}
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
                    <input type="text" name="ministry" value={area.title} readOnly />

                    {/* ✅ Loop through ministry-specific questions */}
                    {area.formQuestions?.map((q, qIndex) => (
                      <div key={qIndex} className="form-group">
                        <label>{q.question}</label>
                        {q.options ? (
                          <select
                            onChange={(e) =>
                              handleAnswerChange(q.question, e.target.value)
                            }
                            required
                          >
                            <option value="">-- Select --</option>
                            {q.options.map((opt, i) => (
                              <option key={i} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : q.type === "textarea" ? (
                          <textarea
                            onChange={(e) =>
                              handleAnswerChange(q.question, e.target.value)
                            }
                            placeholder="Your response"
                            required
                          />
                        ) : (
                          <input
                            type={q.type || "text"}
                            onChange={(e) =>
                              handleAnswerChange(q.question, e.target.value)
                            }
                            placeholder="Your answer"
                            required
                          />
                        )}
                      </div>
                    ))}

                    <button type="submit" className="btn" disabled={loading}>
                      <p>{loading ? "Submitting..." : "Register"}</p>
                    </button>
                  </form>
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