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
   //https://full-newspring.onrender.com/
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
    answers: formData.answers, // ✅ send dynamic answers
  };

  console.log("🚀 Starting submission with data:", payload);

  try {
    const res = await fetch(`${base_Url}api/ministry-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("📡 Request sent to server. Waiting for reply...");
    const data = await res.json();
    console.log("📩 Server replied:", data);

    if (data.code === "USER_NOT_FOUND") {
      setType("error");

      let countdownValue = 5;
      setMessage(
        `❌ We could not find any account with the email: ${formData.email}.
        👉 Please create an account first. Redirecting in ${countdownValue} seconds...`
      );
      const countdownInterval = setInterval(() => {
        countdownValue -= 1;
        setMessage(
        `❌ We could not find any account with the email: ${formData.email}.
        👉 Please create an account first. Redirecting in ${countdownValue} seconds...`
      );
       if (countdownValue <= 0){
        clearInterval(countdownInterval);
        window.location.href = "/register"
       }

      },1000)

    } else if (data.code === "EMAIL_NAME_MISMATCH") {
      setType("error");
      setMessage(
        "❌ The name you entered does not match the one we have saved with this email. " +
        "👉 Please check your spelling, or try the email you used during sign-up."
      );

    } else if (data.code === "REGISTERED") {
      setType("success");
      setMessage(
        `✅ Success! You are now registered for ${ministry.title}.
        👉 Please check your email for more details or next steps.`
      );

    } else if (data.code === "SERVER_ERROR") {
      setType("error");
      setMessage(
        "⚠️ Something went wrong on our side. " +
        "👉 Please wait a few minutes and try again. If it continues, kindly contact support."
      );

    } else if (data.code === "ALREADY_REGISTERED") {
  setType("info");
  setMessage(
    `ℹ️ You are already registered in ${ministry.title}.<br>
    👉 If you think this is a mistake, please <a href="tel:+2349032197266" style="color:#1a73e8; text-decoration:underline;">call support</a>.`
  );

    } else {
      setType("error");
      setMessage(
        `⚠️ We got an unexpected reply: ${data.message || "Unknown error"}. 
        👉 Please try again or ask for help.`
      );
    }
  } catch (error) {
    console.error("💥 Frontend fetch/network error:", error);
    setType("error");
    setMessage(
      "⚠️ We could not connect to the server. " +
      "👉 Please check your internet connection and try again."
    );
  } finally {
    setLoading(false);
    console.log("✅ Submission process finished.");
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
                  <div className="details_text_image">
                  <div className="detail_header">
                    <img src={area.img} alt={area.title} />
                    <h2>{area.title}</h2>
                    <i className={area.icon}></i>
                  </div>
                  <p className="detail_description">{area.description}</p>
                  </div>
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
                          onChange={(e) => handleAnswerChange(q.question, e.target.value)}
                          required
                        >
                          <option value="">
                           
                          </option>
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

                    <button type="submit" className="btn-slide" disabled={loading}>
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
                  <p className='minareas_text'>{area.description}</p>
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