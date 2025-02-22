import {useEffect, useRef} from "react";
import "./features.css";

const Features = ({features, featuresTitle, featuresTitleSmall}) => {

  
  const observer = useRef(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.current.unobserve(entry.target);
          }
          else{
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".features_card");
    elements.forEach((en)=>observer.current.observe(en))

    return ()=>{
      if(observer.current){
        elements.forEach((en)=>observer.current.unobserve(en))
      }
    }
  }, []);

  return (
    <div className="Features">
      <h2 className="title">{featuresTitle}</h2>
      <p className="title_small">{featuresTitleSmall}</p>
      <div className="features_container container_flex_around">
      {features.data.map((feature) => features.type == "home" ? (
    <div key={feature.id} className={`features_card feat${feature.id}`}>
      <span>
        <i className={feature.icon}></i>
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  ):
  ( features.type == "contact" ?(<div key={feature.id} className={`features_card feat${feature.id}`}>
    <span>
      <i className={feature.icon}></i>
    </span>
    <div className="feature_text">
    <h3>{feature.title}</h3>
    <div className="description_text_container">
    {feature.description.map((description)=>(
      <div className="description_text">
      <small>{description.descrpSpan}</small> <p>{description.descrpText}</p>
      </div>
    ))}
    </div>
    </div>
  
  </div>):  ( features.type == "worshipNight" ?(<div key={feature.id} className={`features_card feat${feature.id}`}>
      <span>
        <i className={feature.icon}></i>
      </span>
      <div className="feature_text">
      <h3>{feature.title}</h3>
      <div className="description_text_container">
         <p dangerouslySetInnerHTML={{__html: feature.description}}/>
      
      </div>
      </div>
    
    </div>):null))
)}
      </div>
      </div>

  );
};

export default Features;
