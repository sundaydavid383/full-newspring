import React, { useState } from "react";
import "./newsletter.css";

const NewsletterPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const base_Url = "https://full-newspring.onrender.com/"; // update if deployed

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("message", message);
      files.forEach((file) => formData.append("attachments", file));

      const res = await fetch(`${base_Url}api/sendRichNewsletter`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Newsletter sent successfully!");
        setSubject("");
        setMessage("");
        setFiles([]);
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (err) {
      console.error("💥 Error sending newsletter:", err);
      alert("💥 Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-container">
      <h2>Send Newsletter</h2>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <label>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
          required
        />

        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          rows="6"
          required
        />

        <label>Attach Files (images / videos)</label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <div className="file-preview">
            <h4>Attachments:</h4>
            <ul>
              {files.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Newsletter"}
        </button>
      </form>
    </div>
  );
};

export default NewsletterPage;