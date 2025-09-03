import {useEffect, useRef} from 'react'
import "./discussionQuestion.css"

const DiscussionQuestion = ({title, smalltitle, topics}) => {
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
      },{threshold:0.2})

      const elements = document.querySelectorAll(".discussionQuestionCard")
      elements.forEach((el)=>observer.current.observe(el))
      return () => {
        elements.forEach((el)=>observer.current.unobserve(el))
      }
    }, [])
    
    return (

    <div className='DiscussionQuestion'>
        <h2 className='title'>{title}</h2>
        <p className='title_small'>{smalltitle}</p>
    <div className="DiscussionQuestion_container container_flex_around">
          {topics.map((discussionQuestion)=>(
              <div className="discussionQuestionCard">
                <i className={` ${discussionQuestion.icon} iconinactive`}></i>
                <h2>{discussionQuestion.topic}</h2>
                <ul>
                    {discussionQuestion.questions.map((question)=>(
                        <li>{question}</li>
                    ))}
                </ul>
              </div>
          ))}
    </div>
    </div>
  )
}

export default DiscussionQuestion