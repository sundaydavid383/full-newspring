import React from "react";
import { Link } from "react-router";
import "./scrollImage.css"

const ScrollImage = ({ scrollingImages }) => {
  return (
    <div className="ScrollImage ">
      {scrollingImages.map((image, index) => (
        <div className="image">
            <div className="imageBlocker"></div>
          <img src={image.image} alt="" />
          <Link  className=" instagram" target="_blank" to={image.instagramLink}><i className="fa-brands fa-instagram"></i></Link>
          <Link className=" facebook" target="_blank" to={image.facebookLink}><i className="fa-brands fa-facebook-f"></i></Link>
        </div>
      ))}
    </div>
  );
};

export default ScrollImage;
