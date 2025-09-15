import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./hero.css";

const Hero = ({
  sections = [], // default to empty array to avoid undefined
  sectionType,
  buttonType,
  children, // accepts registration form as children
}) => {
  // compute button label
  let buttonParagrah = "Register";
  if (buttonType === "raedArticle") {
    buttonParagrah = "View articles";
  } else if (buttonType === "article") {
    buttonParagrah = "Read article";
  }

  const [title, setTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // helper: start/refresh autoplay interval
  const resetAutoPlay = () => {
    // clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // don't start if there are no sections
    if (!sections || sections.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        // prev may be >= sections.length if sections changed; clamp defensively
        const safePrev = (typeof prev === "number" ? prev : 0) % sections.length;
        return (safePrev + 1) % sections.length;
      });
    }, 15000); // 86 seconds
  };

  // start autoplay whenever the sections array changes
  useEffect(() => {
    if (!sections || sections.length === 0) {
      // nothing to show — ensure state is reset and stop interval
      setCurrentIndex(0);
      setTitle("");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // clamp currentIndex if new sections array is shorter
    setCurrentIndex((prev) => (prev >= sections.length ? 0 : prev));

    // start/reset autoplay
    resetAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // intentionally depend on sections reference/length
  }, [sections]);

  // update title safely when currentIndex or sections change
  useEffect(() => {
    if (!sections || sections.length === 0) {
      setTitle("");
      return;
    }
    const sec = sections[currentIndex];
    if (sec && typeof sec.title !== "undefined") {
      setTitle(sec.title);
    } else {
      setTitle("");
    }
  }, [currentIndex, sections]);

  // user clicked an indicator -> set index and reset autoplay
  const handleIndicatorClick = (i) => {
    if (!sections || sections.length === 0) return;
    const safeIndex = Math.max(0, Math.min(i, sections.length - 1));
    setCurrentIndex(safeIndex);
    resetAutoPlay();
  };

  const handleLearnMore = () => {
    window.scrollBy({ top: 630, behavior: "smooth" });

 };

  // if there are no sections, render a fallback (avoid runtime errors)
  const hasSections = Array.isArray(sections) && sections.length > 0;
  const activeSection = hasSections ? sections[currentIndex] : null;

  return (
    <div className="hero">
      {hasSections && activeSection ? (
        <div
          key={activeSection.id ?? currentIndex}
          className={`hero_text_content noContact hero_text_content${activeSection.id ?? currentIndex}`}
        >
          <div className="hero_text">
            <h1
              className="hero_header"
              dangerouslySetInnerHTML={{ __html: activeSection.title ?? "" }}
            />
            <div className="hero_para">
              {Array.isArray(activeSection.paragraphs) &&
                activeSection.paragraphs.map((paragraph, paraindex) => (
                  <p className="para" key={paraindex}>
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          <div className="hero_button">
            {sectionType === "contact" ? (
              <Link to="/register" className="btn">
                <p>{buttonParagrah}</p>
              </Link>
            ) : (
              <button onClick={handleLearnMore} className="btn">
                <p>Learn More</p>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="hero_text_content">
          <div className="hero_text">
            <h1 className="hero_header">Welcome</h1>
            <div className="hero_para">
              <p className="para">No hero sections available yet.</p>
            </div>
          </div>
        </div>
      )}

      {/* indicators — dynamic based on sections.length */}
      <div className="bar_active">
        {(hasSections ? sections : [0, 1, 2, 3]).map((_, i) => (
          <span
            key={i}
            onClick={() => handleIndicatorClick(i)}
            className={currentIndex === i ? "opacity1" : ""}
          />
        ))}
      </div>

      {/* Inject the registration form or any custom content */}
      {sectionType !== "contact" && children}
    </div>
  );
};

export default Hero;