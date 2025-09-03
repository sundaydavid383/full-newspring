import {useRef, useEffect} from "react";
import "./gallery.css";

import { Link } from "react-router";

const Gallery = ({galleryItems}) => {

  const observer = useRef(null)
  useEffect(() => {
    observer.current = new IntersectionObserver((entires)=>{entires.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add("active")
        observer.current.unobserve(entry.target);
      }
      else{
        entry.target.classList.remove("active")
      }
    })}, {threshold: 0.4})
     const elements = document.querySelectorAll('.image')
     elements.forEach((img)=>observer.current.observe(img))
    return () => {
      if(observer.current){
        elements.forEach((img)=>observer.current.unobserve(img))
      }
    }
  }, [])

return (
  <div className="gallery">
      <h2 className="title">Church Gallery</h2>
<p className="title_small">
  Welcome to our gallery, where we showcase a curated collection of images capturing the essence of our community events, spiritual gatherings, and moments of inspiration. Each photograph tells a story of faith, unity, and growth, reflecting the vibrant life of our congregation.
</p>

  <div className="gallery_container container_flex_around">
       {galleryItems.map((item) => (
      <div className={`image ${item.id}`} key={item.id}>
        <span></span>
        <img src={item.src} alt="" />
        <Link to={item.link}>
          <i className="fa-brands fa-facebook-f"></i>
        </Link>
      </div>
    ))}
  </div>
  </div>
    

 


  );
};

export default Gallery;
