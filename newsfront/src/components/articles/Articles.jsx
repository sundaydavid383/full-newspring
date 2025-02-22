import {useRef, useEffect} from "react";
import "./articles.css"
import { Link } from "react-router";


const Articles = ({articles}) => {
 
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
    })}, {threshold: 0.3})
    const elements = document.querySelectorAll('.article_card')
    elements.forEach((lit)=>observer.current.observe(lit))
    return () => {
      if(observer.current){
        elements.forEach((lit)=>observer.current.unobserve(lit))
      }
    }
  }, [])
  
  return (
    <div className="articles">
      <h2 className="title">Stories & Articles </h2>
      <p className="title_small">
  Explore a collection of insightful articles and inspiring stories designed to deepen your faith and understanding. From rethinking traditional youth ministry approaches to addressing modern challenges.
</p>
      <div className="articles_container container_flex_around">
        {articles.map((article, index)=>(
          <div key={index} className={`article_card art${index}`}>
          <div className="articles_image">
            <img src={article.image} alt="" />
          </div>
          <div className="articles_data">
            <p>{article.author}</p> ●
            <span>{article.date}</span>
          </div>
          <h2>{article.title}</h2>
          { <p>{article.gist1.slice(0,199)} ...</p> }
          <Link to={`/readblog/${article.id}`}className="btn">
            <p>Read More</p>
          </Link>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
