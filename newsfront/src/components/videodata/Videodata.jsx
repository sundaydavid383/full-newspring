import { useState, useRef, useEffect } from "react";
import "./videodata.css";
import Video from "../video/Video";


const Videodata = ({ videoData }) => {
  const observer = useRef(false);

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

    const elements = document.querySelectorAll(".videoAnima");
    elements.forEach((el) => observer.current.observe(el));

    return () => {
      elements.forEach((el) => observer.current.unobserve(el));
    };
  }, []);

  const [seeVideo, setSeeVideo] = useState(false);
  return (
    <div className="videodata container_flex_around">
      <div className={`${videoData.videoClass} videodata_image videoAnima`}>
        <img className="VDimage" src={videoData.src} alt="" />
        <small></small>
        <span onClick={() => setSeeVideo(true)}>
        <i className="fa-solid fa-play"></i>
        </span>
      </div>
      {seeVideo ? (
      <Video video={videoData.video}  setSeeVideo={setSeeVideo}/>
      
      
      ) : null}

      <div className="videodata_text ">
        <h2 className="videoAnima">{videoData.header}</h2>
        {videoData.para.map((p,idx) => (
          <p key={idx} className="videoAnima">{p}</p>
        ))}
      </div>
    </div>
  );
};

export default Videodata;
