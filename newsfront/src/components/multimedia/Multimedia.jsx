import { useState, useEffect, useRef } from "react";
import "./multimedia.css";
import { Link } from "react-router";
import Video from "../video/Video";
import backgroundVidoe from "../../assets/video1.mp4";

const Multimedia = ({ title, smalltitle, multimediaResources }) => {
  const [seeVideo, setSeeVideo] = useState(false);
  const [curVideo, setCurVideo] = useState(null);
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver((entries)=>{
       entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add("active")
          observer.current.unobserve(entry.target)
        }
        else{
           entry.target.classList.remove("active")
        }
       })
    }, {threshold:0.2})

    const elements = document.querySelectorAll(".media-card")
    elements.forEach((el)=>observer.current.observe(el))
  
    return () => {
      elements.forEach((el)=>observer.current.unobserve(el))
    }
  }, [])
  
  return (
    <div className="Multimedia">
      <h2 className="title">{title}</h2>
      <p className="title_small">{smalltitle}</p>
      <video
        autoPlay
        className="backgroundVideo"
        src={backgroundVidoe}
        loop
        muted
      ></video>

      <div className="multimedia_container container_flex_around">
        {multimediaResources.map((media) => (
          
          <div key={media.id} className="media-card">
            {console.log(media)}
            <div className="image_holder">
              <i
                onClick={() => {
                  setSeeVideo(true);
                  setCurVideo(media.vidResource);
                 
                }}
                className="fa-solid fa-play iconactive"
              ></i>
              <img src={media.image} alt="" />
              <small className="videoLayer"></small>
            </div>

            <h2>{media.title}</h2>
            <p>{media.description}</p>

            {/* <Link target="_blank" to={media.video.url} className="btn-slide">
              <p>learn from an external link</p>
            </Link> */}

          </div>
        ))}
        {seeVideo ? <Video video={curVideo} setSeeVideo={setSeeVideo} /> : null}
      </div>
    </div>
  );
};

export default Multimedia;
