import React from 'react';
import "./googlemap.css";

const GoogleMap = () => {
  return (
    <div className='map container_flex_around'>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.6618169560543!2d3.364656674359608!3d6.564300622689191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d88f6105f45%3A0x9816a89e9be63dc4!2sCapital%20Building%2C%20332%20Ikorodu%20Rd%2C%20Anthony%2C%20Lagos%20105102%2C%20Lagos!5e0!3m2!1sen!2sng!4v1737748453297!5m2!1sen!2sng"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMap;