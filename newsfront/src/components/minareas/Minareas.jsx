import {useEffect, useRef} from 'react'
import "./minareas.css"
import { Link } from 'react-router'

  
  const Minareas = ({ministryAreas, title}) => {
    const observer = useRef(null)
    useEffect(() => {
      observer.current = new IntersectionObserver((entries)=>{
         entries.forEach((entry)=>{
          if(entry.isIntersecting){
           entry.target.classList.add("active");
           observer.current.unobserve(entry.target);
          }
          else{
            entry.target.classList.remove("active")
          }
         })
      },{threshold: 0.3})
    
      const elements = document.querySelectorAll(".minareas_card");
      elements.forEach((en)=>observer.current.observe(en));
      return () => {
         if(observer.current){
          elements.forEach((en)=>observer.current.unobserve(en))
         }
      }
    }, [])
    
    return (
      <div className="Minareas">

     <h2 className='title'>{title}</h2>
       <p className='title_small'>Discover the unique ways we serve God and build His kingdom. Each ministry area is designed to nurture faith, foster love, and empower lives.</p>
       <div className="minareas_container container_flex_around">

        {ministryAreas.map((area, index) => (
          <div key={index} className={`minareas_card min${index}`}>
            <div className="minareas_image">
            <img src={area.img} alt={area.title} />
            <span>
              <i className={area.icon}></i>
            </span>
            </div>
           
            <h3>{area.title}</h3>
            <p>{area.description}</p>
            <Link className="btn">
              <p>{area.linkText}</p>
            </Link>
          </div>
        ))}
      </div>
      </div>
    );
  };
  
  export default Minareas;
