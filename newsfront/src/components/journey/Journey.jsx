import { useRef, useEffect, useState, React } from "react";
import "./journey.css";
import { Link } from "react-router";

const Journey = ({ journeyData }) => {
  const [curtAbout, setCurtAbout] = useState(0)
  const observer = useRef(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.current.unobserve(entry.target);
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".observe");
    elements.forEach((el) => observer.current.observe(el));

    return () => {
      if (observer.current) {
        elements.forEach((el) => observer.current.unobserve(el));
      }
    };
  }, []);

  return (
    <div className={`${journeyData.length == 3 ? "about_background" : ""}`}>
    {journeyData.length == 3 && (
      <div className="about_tacker">
           <span
          onClick={() => setCurtAbout(0)}
          className={`${curtAbout == 0 ? "active" : ""}`}
        >
          Our Mission
        </span>
        <span
          onClick={() => setCurtAbout(1)}
          className={`${curtAbout == 1 ? "active" : ""}`}
        >
          Our Vision
        </span>
        <span
          onClick={() => setCurtAbout(2)}
          className={`${curtAbout == 2 ? "active" : ""}`}
        >
          Our Approach
        </span>
      </div>
    )}
  
    {journeyData.map((item, index) =>
      journeyData.length == 3 && curtAbout == index ? (
        <div className="journey container_flex_around" key={index}>
          <div className="journey_text">
            <h2>{item.title}</h2>
            {item.paragraphs.map((paragraph, paraIndex) => (
              <p className="journey_para observe" key={paraIndex}>
                {paragraph}
              </p>
            ))}
            {item.link && (
              <Link className="btn" to={item.link.href}>
                <p>{item.link.text}</p>
              </Link>
            )}
          </div>
          {/* <div className="journey_image observe">*/}
            <div className={item.images.className}> 
              <img src={item.images.src} alt={item.images.alt} />
            
             </div>
          {/*</div> */}
        </div>
      ) : (journeyData.length == 1?(
         journeyData[0].id == "minister teaching"?(
         <div className="journey container_flex_around" key={index}>
            <div className="journey_image observe">
            {item.images.map((image, imgIndex) => (
              <div className={image.className} key={imgIndex}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
          <div className="journey_text">
            <h2>{item.title}</h2>
            <div className="journey_p">
            {item.paragraphs.map((paragraph, paraIndex) => (
              <p className="journey_para observe" key={paraIndex}>
                {paragraph}
              </p>
            ))}
            </div>
           
            <span className="seniorpastor">Senior Pastor ●<small>{item.seniorPastor}</small></span>
            {item.link && (
              <Link className="btn" to={item.link.href}>
                <p>{item.link.text}</p>
              </Link>
            )}
          </div>
        
        </div>)
         :(
          <div className="journey container_flex_around" key={index}>
          <div className="journey_text">
            <h2>{item.title}</h2>
            {item.paragraphs.map((paragraph, paraIndex) => (
              <p className="journey_para observe" key={paraIndex}>
                {paragraph}
              </p>
            ))}
            {item.link && (
              <Link className="btn" to={item.link.href}>
                <p>{item.link.text}</p>
              </Link>
            )}
          </div>
          <div className="journey_image observe">
            {item.images.map((image, imgIndex) => (
              <div className={image.className} key={imgIndex}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
         )
        
      ):null)
    )}
  </div>
  );
};

export default Journey;
