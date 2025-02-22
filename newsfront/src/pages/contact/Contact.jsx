import { useEffect } from 'react';
import Hero from '../../components/hero/Hero'
import Features from "../../components/features/Features";
import GoogleMap from '../../components/goggleMap/GoogleMap';
import ContactForm from '../../components/contactForm/ContactForm';


const Contact = ({setActive}) => {
      useEffect(() => {
        window.scrollTo({top:0})
      
        return () => {
          window.scrollTo({top:0})
        }
      }, [])
    const sectionType = "contact"
    const sections = [{
        id: 9,
        title: "Get in Touch",
        paragraphs: [
          "We’d love to hear from you! Whether you have questions, need more information, or simply want to connect with us, RCCG NewSpring Youth is here to assist you.",
          "Feel free to reach out to us, and we’ll ensure your concerns or inquiries are addressed promptly. Your feedback and engagement mean a lot to us.",
          "Let’s grow together in faith and community. Contact us today!"
        ],
      },
      {
        id: 10,
        title: "Our Location",
        paragraphs: [
          "RCCG NewSpring Youth is located at Capital Building, 332 Ikorodu Road, Lagos, Nigeria 100211. We are conveniently situated to welcome young people and their families from near and far.",
          "Join us for any of our programs, services, or events—we’d be delighted to meet you in person!",
          "Need directions? Feel free to call or send us a message, and we’ll guide you to our church."
        ],
      },
      {
        id: 11,
        title: "Contact Information",
        paragraphs: [
          "Phone: +234 905 674 5655",
          "Email: [rccgnewspring@gmail.com]",
          "Social Media: Connect with us on  Youtube, Instagram, Facebook to stay updated on our events and programs."
        ],
      },
      {
        id: 12,
        title: "Office Hours",
        paragraphs: [
          "Our office is open during the following hours to assist you:",
          "- Tuesday and Thursday: 06:00pm - 07:00pm",
          "- Sunday first-service: [08:00am- 10:30am]",
          "- Sunday second-service: [10:80am- 01:00am]",
          "We are committed to making it easy for you to reach us and get the help or information you need. Whether you're a parent seeking guidance, a youth with questions, or someone looking to get involved in our programs, our team is always ready to support you.",
          "If you can’t visit during our office hours, don’t worry! You can still send us an email or reach out through our social media platforms, and we’ll get back to you as soon as possible. Your convenience and satisfaction are important to us, and we strive to create an open and welcoming space for everyone."
        ],
      }]
      const contactFeatures = {
        type: "contact",
        data: [
          {
            id: 4,
            icon: "fa-solid fa-phone",
            title: "Phone & Email",
            description: [
              { descrpSpan: "Call:", descrpText: "+123 456 7890, +987 654 3210." },
              { descrpSpan: "Email:", descrpText: "contact@newspringyouth.org." },
            ],
          },
          {
            id: 5,
            icon: "fa-solid fa-clock",
            title: "Opening Hours",
            description: [
              { descrpSpan: "Weekly Service:", descrpText: "Mon & Thur: 6 PM -7 PM." },
              { descrpSpan: "Sunday:", descrpText: "8 AM - 1 PM." },
            ],
          },
          {
            id: 6,
            icon: "fa-solid fa-map-marker-alt",
            title: "Our Location",
            description: [
              {
                descrpSpan: "Location:",
                descrpText: " 332 Ikorodu Road, Lagos, Nigeria 100211",
              },
            ],
          },
        ],
      };
    
    const featuresTitle = "Contact Us Now";
    const featuresTitleSmall = "Have questions or need assistance? We're here to help. Reach out to us through any of the methods below, and let’s stay connected.";
      setActive("contact")
  return (
    <>
       
        <Hero sections={sections} sectionType={sectionType}/>
        <Features features={contactFeatures} featuresTitle={featuresTitle} featuresTitleSmall={featuresTitleSmall}/>
        <GoogleMap/>
        <ContactForm/>
        
        
    </>
     
    
  )
}

export default Contact