import React from "react";
import "./ContactForm.css";
import img1 from "../../assets/rccg66.jpg"

const ContactForm = () => {
  return (
    <div className="contactForm container_flex_around">

        <img src={img1} alt="" />

      <form className="contactForm-form">
        <h2>Have Any Questions</h2>
        <p>
          Please feel free to get in touch with us using the contact form below.
          We’d love to hear for you.
        </p>
        <div className="contactForm_name">
          <input name="name" type="text" required placeholder="First Name"/>
          <input name="email" type="email" required placeholder="Email" />
          </div>
          <textarea name="complaint" required id="" placeholder="Your Message"></textarea>
          <button type="submit" className="btn"><p>Submit</p></button>

      </form>
    </div>
  );
};

export default ContactForm;
