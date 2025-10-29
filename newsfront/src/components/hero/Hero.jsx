// Hero.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./hero.css";
import { UserContext } from "../../context/UserContext";

const Hero = ({ sections = [], sectionType, buttonType, children }) => {
  let buttonParagrah = "Register";
  if (buttonType === "raedArticle") buttonParagrah = "View articles";
  else if (buttonType === "article") buttonParagrah = "Read article";

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const heroRef = useRef(null);
  const { user, setUser } = useContext(UserContext);

  // start/refresh autoplay
  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!Array.isArray(sections) || sections.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const safePrev = (typeof prev === "number" ? prev : 0) % sections.length;
        return (safePrev + 1) % sections.length;
      });
    }, 15000);
  };

  // ensure hero container scroll listener pauses/resumes autoplay
  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    // If CSS forgot overflow-x, enforce it inline (fallback)
    // This doesn't override your CSS if you already set it.
    if (!container.style.overflowX) container.style.overflowX = "auto";

    let scrollTimeout = null;

    const handleScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const slideWidth = container.clientWidth || container.getBoundingClientRect().width || 1;
        const index = Math.round((container.scrollLeft || 0) / slideWidth);
        setCurrentIndex(Math.max(0, Math.min(index, (sections?.length || 1) - 1)));
        resetAutoPlay();
      }, 120);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  // start autoplay when sections change
  useEffect(() => {
    if (!Array.isArray(sections) || sections.length === 0) {
      setCurrentIndex(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    setCurrentIndex((prev) => (prev >= sections.length ? 0 : prev));
    resetAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  // when currentIndex changes programmatically, scroll to that slide
  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;
    const slideWidth = container.clientWidth || container.getBoundingClientRect().width || 1;
    const target = currentIndex * slideWidth;
    const delta = Math.abs((container.scrollLeft || 0) - target);
    if (delta > 4) {
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [currentIndex]);

  const handleIndicatorClick = (i) => {
    if (!Array.isArray(sections) || sections.length === 0) return;
    const safeIndex = Math.max(0, Math.min(i, sections.length - 1));
    const container = heroRef.current;
    if (!container) {
      setCurrentIndex(safeIndex);
      resetAutoPlay();
      return;
    }
    const slideWidth = container.clientWidth || container.getBoundingClientRect().width || 1;
    container.scrollTo({ left: safeIndex * slideWidth, behavior: "smooth" });
    setCurrentIndex(safeIndex);
    resetAutoPlay();
  };

  const goPrev = () => {
    if (!sections || sections.length === 0) return;
    const prev = (currentIndex - 1 + sections.length) % sections.length;
    handleIndicatorClick(prev);
  };
  const goNext = () => {
    if (!sections || sections.length === 0) return;
    const next = (currentIndex + 1) % sections.length;
    handleIndicatorClick(next);
  };

  const handleLearnMore = () => {
    window.scrollBy({ top: 630, behavior: "smooth" });
  };

  const hasSections = Array.isArray(sections) && sections.length > 0;



  return (
    <div
      className="hero"
      ref={heroRef}
      // inline fallback to ensure horizontal scroll — safe: respects existing CSS
      style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
    >
      {/* left arrow */}
      {hasSections && (
        <button
          type="button"
          aria-label="Previous slide"
          onClick={goPrev}
          className="fa-arrow-left"
          style={{ border: "none", background: "transparent" }}
        >
          ‹
        </button>
      )}

      {hasSections ? (
        sections.map((sec, i) => (
          <div
            key={sec.id ?? i}
            className={`hero_text_content noContact hero_text_content${sec.id ?? i}`}
            aria-hidden={currentIndex !== i}
          >
            <div className="hero_text">
              <h1 className="hero_header" dangerouslySetInnerHTML={{ __html: sec.title ?? "" }} />
              <div className="hero_para">
                {Array.isArray(sec.paragraphs) &&
                  sec.paragraphs.map((p, pi) => (
                    <p className="para" key={pi}>
                      {p}
                    </p>
                  ))}
              </div>
            </div>

            <div className="hero_button">
              {sectionType === "contact" && !user ? (
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
        ))
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

      {/* right arrow */}
      {hasSections && (
        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className="fa-arrow-right"
          style={{ border: "none", background: "transparent" }}
        >
          ›
        </button>
      )}

      {/* indicators */}
      <div className="bar_active" role="tablist" aria-label="Hero slides">
        {(hasSections ? sections : [0, 1, 2, 3]).map((_, i) => (
          <span
            key={i}
            onClick={() => handleIndicatorClick(i)}
            className={currentIndex === i ? "opacity1" : ""}
            aria-label={`go to slide ${i + 1}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleIndicatorClick(i);
            }}
          />
        ))}
      </div>

      {sectionType !== "contact" && children}
    </div>
  );
};

export default Hero;
