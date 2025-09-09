import React, { useState } from 'react'
import "./testimonial.css"
import { Link } from 'react-router'

const Testimonial = ({testimonials}) => {

  const [move, setMove] = useState(0)
  return (
 
    <div className="testimonailImage">

         <div className='Testimonial'>
         <h2 className='title'>Youth Review</h2>
         {move>-2616?<i onClick={()=>{if(move>-2616)setMove((prev)=>prev+-650); console.log(move)}} className="moveright fa-solid fa-arrow-right"></i>:null}
         {move<=0?<i onClick={()=>{if(move<=0)setMove((prev)=>prev+651); console.log(move)}} className="moveleft fa-solid fa-arrow-left"></i>:null}
        <div className="testiment">


            <div className="testimentcarrier" style={{transform: `translateX(${move}px)` }}>
            {
            testimonials.map((testifier, index)=>(
                <div key={index} className="testimonialCard">
                    <div className="image"><img src={testifier.image} alt="" /></div>
                    <h2>{testifier.name}</h2>
                    <p>{testifier.testimony}</p>
                    <div className="link">
                     <Link  target="_blank" to={testifier.instagramLink}><i className="fa-brands fa-instagram"></i></Link>
                     <Link target="_blank" to={testifier.facebookLink}><i className="fa-brands fa-facebook-f"></i></Link>
                    </div>
                    
                </div>
            ))
          }
            </div>
        </div>
      </div>
    </div>
   
  )
}

export default Testimonial