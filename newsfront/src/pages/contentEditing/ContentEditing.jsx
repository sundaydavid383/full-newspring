import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ContentEditing.css";

const ContentEditing = () => {
  const [journey, setJourney] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/home-content").then((res) => {
      setJourney(res.data.journeyData[0]);
      setSections(res.data.sections);
    });
  }, []);

  const handleInputChange = (e, type, index = null, field = null) => {
    const updated = { ...journey };

    if (type === "title") updated.title = e.target.value;
    if (type === "paragraphs") updated.paragraphs[index] = e.target.value;
    if (type === "link") updated.link[field] = e.target.value;
    if (type === "images") updated.images[index][field] = e.target.value;

    setJourney(updated);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...journey };
      updated.images[index].src = reader.result;
      setJourney(updated);
    };
    if (file) reader.readAsDataURL(file);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5001/api/update-home-content", {
        journeyData: [journey],
        sections,
      });
      alert("Content updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating content");
    }
  };

  if (!journey) return <p>Loading...</p>;

  return (
    <div className="content_form_holder">
      <form className="contentediting-form" onSubmit={handleSubmit}>
        <h2>Journey Title</h2>
        <input
          value={journey.title}
          onChange={(e) => handleInputChange(e, "title")}
        />

        <h2>Paragraphs</h2>
        {journey.paragraphs.map((p, i) => (
          <textarea
            key={i}
            value={p}
            onChange={(e) => handleInputChange(e, "paragraphs", i)}
          />
        ))}

        <h2>Images</h2>
        {journey.images.map((img, i) => (
          <div key={i}>
            <img src={img.src} alt={img.alt} width="200" />
            <input
              type="text"
              value={img.alt}
              placeholder="Alt text"
              onChange={(e) => handleInputChange(e, "images", i, "alt")}
            />
            <input
              type="text"
              value={img.className}
              placeholder="Class"
              onChange={(e) => handleInputChange(e, "images", i, "className")}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, i)}
            />
          </div>
        ))}

        <h2>Link</h2>
        <input
          value={journey.link.href}
          onChange={(e) => handleInputChange(e, "link", null, "href")}
          placeholder="Link href"
        />
        <input
          value={journey.link.text}
          onChange={(e) => handleInputChange(e, "link", null, "text")}
          placeholder="Link text"
        />

        <h2>Sections</h2>
        {sections.map((sec, idx) => (
          <div key={idx}>
            <input
              value={sec.title}
              onChange={(e) => {
                const newSections = [...sections];
                newSections[idx].title = e.target.value;
                setSections(newSections);
              }}
            />
            {sec.paragraphs.map((p, pi) => (
              <textarea
                key={pi}
                value={p}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[idx].paragraphs[pi] = e.target.value;
                  setSections(newSections);
                }}
              />
            ))}
          </div>
        ))}

        <button className="btn" type="submit">
          <p>Save Changes</p>
        </button>
      </form>
    </div>
  );
};

export default ContentEditing;