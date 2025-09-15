import { useEffect } from 'react';
import Hero from '../../components/hero/Hero'
import Features from "../../components/features/Features";
import GoogleMap from '../../components/goggleMap/GoogleMap';
import ContactForm from '../../components/contactForm/ContactForm';
import img1 from "../../assets/rccg66.jpg";


const Contact = ({setActive}) => {
      useEffect(() => {
        window.scrollTo({top:0})
        setActive("contact")
      
        return () => {
          window.scrollTo({top:0})
        }
      }, [])
    
    const sections = [
  {
    id: 9,
    title: "Get in Touch",
    paragraphs: [
      "We’d love to hear from you! Whether you have questions or just want to connect, RCCG NewSpring Youth is here for you.",
      "Reach out today—we’ll respond promptly. Your feedback matters!"
    ],
  },
  {
    id: 10,
    title: "Our Location",
    paragraphs: [
      "You can find us at Capital Building, 332 Ikorodu Road, Lagos, Nigeria 100211.",
      "Join us for our services and events—we’d be delighted to meet you!"
    ],
  },
  {
    id: 11,
    title: "Contact Information",
    paragraphs: [
      "Phone: +234 905 674 5655",
      "Email: rccgnewspring@gmail.com",
      "Socials: YouTube, Instagram, Facebook"
    ],
  },
  {
    id: 12,
    title: "Office Hours",
    paragraphs: [
      "We’re available at these times:",
      "- Tue & Thu: 6:00pm – 7:00pm",
      "- Sunday 1st: 8:00am – 10:30am",
      "- Sunday 2nd: 10:30am – 1:00pm",
      "Can’t visit? Send us an email or DM—we’ll get back quickly."
    ],
  },
];
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
      const contactFormData = {
        formSrc:img1,
        formTitle : "Have Any Questions",
        formText:" Please feel free to get in touch with us using the contact form below. We’d love to hear for you."
      }
    
    const featuresTitle = "Contact Us Now";
    const featuresTitleSmall = "Have questions or need assistance? We're here to help. Reach out to us through any of the methods below, and let’s stay connected.";
    const  sectionType = ''
  return (
    <>
       
        <Hero sections={sections} sectionType={sectionType}/>
        <Features features={contactFeatures} featuresTitle={featuresTitle} featuresTitleSmall={featuresTitleSmall}/>
        <GoogleMap/>
        <ContactForm contactFormData={contactFormData} formType="contact" />
        
        
    </>
     
    
  )
}

export default Contact