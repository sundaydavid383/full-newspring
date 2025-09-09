import React, { useState, useRef } from "react";
import "./scrollImage.css";

/**
 * Props:
 *  - scrollingImages: [{ image, alt, instagramLink, facebookLink }, ...]
 *  - speed: number (seconds for one loop) default 66
 */
const ScrollImage = ({ scrollingImages = [], speed = 66 }) => {
  // Duplicate items for seamless continuous scroll
  const items = [...scrollingImages, ...scrollingImages];

  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const innerRef = useRef(null);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerLeave = () => setIsDragging(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`ScrollImage ${isDragging || isFocused ? "is-dragging" : ""}`}>
      <div
        className="ScrollInner"
        ref={innerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0} /* makes it focusable for keyboard users */
        aria-label="TIM412 gallery — swipe or hover to pause"
      >
        <div
          className="ScrollTrack"
          style={{ animationDuration: `${speed}s` }}
        >
          {items.map((img, idx) => (
            <div className="image" key={idx}>
              <img src={img.image} alt={img.alt || `slide-${idx}`} />
              <div className="imageBlocker" />
              <div className="imageOverlay">
                {img.instagramLink && (
                  <a
                    className="social instagram"
                    href={img.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fa-brands fa-instagram" />
                  </a>
                )}
                {img.facebookLink && (
                  <a
                    className="social facebook"
                    href={img.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
</div>
  );
};

export default ScrollImage;

