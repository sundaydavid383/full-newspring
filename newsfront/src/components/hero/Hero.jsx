import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./hero.css";

const Hero = ({
  sections,
  sectionType,
  buttonType,
  children, // accepts registration form as children
}) => {
  let buttonParagrah = "Register";
  if (buttonType === "raedArticle") {
    buttonParagrah = "View articles";
  } else if (buttonType === "article") {
    buttonParagrah = "Read article";
  }

  const [title, setTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
    const currentidx = useRef(currentIndex);
    const intervalRef = useRef(null);


      const startAutoPlay = () => {
    // clear any existing timer
    if (intervalRef.current) clearInterval(intervalRef.current);

    // start a fresh one
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sections.length);
    }, 86000); // 86 seconds
  };

  useEffect(() => {
    currentidx.current = currentIndex;
  }, [currentIndex]);

useEffect(() => {
    startAutoPlay(); // start when component mounts
    return () => clearInterval(intervalRef.current); // cleanup on unmount
  }, [sections.length]);

  useEffect(() => {
    setTitle(sections[currentIndex].title);
  }, [currentIndex, sections]);

  const handleIndicatorClick = (i) => {
    setCurrentIndex(i);
    startAutoPlay(); // reset timer to 86s
  };

  // Scroll handler for non-contact sections
  const handleLearnMore = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };

  return (
    <div className="hero">
      {/* {currentIndex < 3 && (
        <i
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="fa-solid fa-arrow-right"
        ></i>
      )}
      {currentIndex > 0 && (
        <i
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="fa-solid fa-arrow-left"
        ></i>
      )} */}

      {sections.map((section, index) =>
        currentidx.current === index ? (
          <div
            key={index}
            className={`hero_text_content noContact hero_text_content${section.id}`}
          >
            <div className="hero_text">
              <h1
                dangerouslySetInnerHTML={{ __html: section.title }}
                className="hero_header"
              />
              <div className="hero_para">
                {section.paragraphs.map((paragraph, paraindex) => (
                  <p className="para" key={paraindex}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="hero_button">
              {sectionType === "contact" ? (
                // 👉 Go to registration if contact section
                <Link to="/register" className="btn">
                  <p>{buttonParagrah}</p>
                </Link>
              ) : (
                // 👉 Otherwise scroll down
                <button onClick={handleLearnMore} className="btn">
                  <p>Learn More</p>
                </button>
              )}
            </div>
          </div>
        ) : null
      )}

      <div className="bar_active">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            onClick={handleIndicatorClick}
            className={currentidx.current === i ? "opacity1" : ""}
          ></span>
        ))}
      </div>

      {/* Inject the registration form or any custom content */}
      {sectionType !== "contact" && children}
    </div>
  );
};

export default Hero;