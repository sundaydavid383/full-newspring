import { useEffect, useRef, useState } from "react";
import "./minareas.css";


  

const Minareas = ({ ministryAreas, title }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  // // Intersection observer for animations
  // useEffect(() => {
  //   observer.current = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("active");
  //           observer.current.unobserve(entry.target);
  //         } else {
  //           entry.target.classList.remove("active");
  //         }
  //       });
  //     },
  //     { threshold: 0.3 }
  //   );

  //   const elements = document.querySelectorAll(".minareas_card");
  //   elements.forEach((el) => observer.current.observe(el));

  //   return () => {
  //     if (observer.current) {
  //       elements.forEach((el) => observer.current.unobserve(el));
  //     }
  //   };
  // }, []);

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
          const isSelected = selectedArea?.title === area.title;

          return (
            <div key={index} className={`minareas_card min${index}`}>
              {isSelected ? (
                <div className="minarea_detail">
                  <button
                    className="back_btn"
                    onClick={() => setSelectedArea(null)}
                  >
                    ← Back
                  </button>
                  <div className="detail_header">
                    <img src={area.img} alt={area.title} />
                    <h2>{area.title}</h2>
                    <i className={area.icon}></i>
                  </div>
                  <p className="detail_description">{area.description}</p>
                  <div className="detail_content">
                    {area.title === "Proclaiming the Word" && (
                      <p>
                        This ministry is about teaching and preaching God’s Word
                        with clarity and boldness. We equip young people with
                        Biblical truth to influence their schools, workplaces,
                        and communities with the gospel of Christ.
                      </p>
                    )}
                    {area.title === "Extending God’s Love" && (
                      <p>
                        Here, youth learn to serve others through outreach, acts
                        of kindness, and compassion. It’s about reflecting the
                        love of Christ in practical ways that touch hearts and
                        change lives.
                      </p>
                    )}
                    {area.title === "Nurturing Spiritual Growth" && (
                      <p>
                        Through prayer, worship, and discipleship, this ministry
                        helps youth build intimacy with God. We create an
                        environment where spiritual maturity and strong faith
                        foundations can flourish.
                      </p>
                    )}
                    {area.title === "Godly Relationships" && (
                      <p>
                        Building strong, Christ-centered friendships and family
                        bonds is at the heart of this ministry. We encourage
                        accountability, unity, and love as young believers grow
                        together in faith.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div onClick={() => setSelectedArea(area)}>
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