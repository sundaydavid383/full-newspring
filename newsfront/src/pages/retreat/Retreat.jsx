import React from 'react'
import { Link } from 'react-router';
import Hero from '../../components/hero/Hero';
import ScrollImage from '../../components/scrollImage/scrollImage';
import image1 from "../../assets/article1.jpg"
import image2 from "../../assets/rccg12.jpg"
import image3 from "../../assets/rccg14.jpg"
import image4 from "../../assets/rccg11.jpg"
import image5 from "../../assets/rccg3.jpg"
import image6 from "../../assets/rccg80.jpg"
import image7 from "../../assets/rccg77.jpg"
import image8 from "../../assets/rccg73.jpg"
import videoRccg from "../../assets/rccg80.jpg"
import retreatImage from "../../assets/rccg79.jpg"
import rccg1 from "../../assets/rccg44.jpg"
import testimonial1 from "../../assets/rccg34.jpg"
import testimonial2 from "../../assets/rccg33.jpg"
import testimonial3 from "../../assets/taya.jpg"
import testimonial4 from "../../assets/rccg28.jpg"
import testimonial5 from "../../assets/rccg25.jpg"
import testimonial6 from "../../assets/rccg41.jpg"
import "./retreat.css"
import Journey from '../../components/journey/Journey';
import Features from '../../components/features/Features';
import Testimonial from '../../components/testimonial/Testimonial';
import Videodata from '../../components/videodata/Videodata';
import ContactForm from '../../components/contactForm/ContactForm';


const Retreat = ({}) => {
    const sections = [
        {
          id: 12,
          title: "creating a bond and togetherness among youth",
          paragraphs: [
            "this has been since the inception of the church and it has a great influence in the life of youths this is one of the ways we bond youth together.",
            "When we lean into our beliefs, we find the strength to persevere, knowing that we are never truly alone in our struggles.",
            "This journey of faith teaches us the power of patience, perseverance, and trust, helping us navigate life with a clearer purpose.",
          ],
        },
        {
          id: 14,
          title: "integrating widelife in to the ministry",
          paragraphs: [
            "The bonds we form within a faith community are built on shared values and experiences, creating lasting and meaningful relationships.",
            "When we come together to support one another, we not only deepen our faith but also create a network of love and understanding.",
            "True community is built on mutual respect, trust, and a shared commitment to uplift one another as we walk our faith journeys together.",
          ],
        },
        {
          id: 26,
          title: "youth exploration in terms of knowleged",
          paragraphs: [
            "Faith becomes most powerful when it is put into action. It compels us to reach out and make a tangible impact on the world around us.",
            "Every act of kindness, every outreach, and every effort to support others is a reflection of the values we hold dear in our hearts.",
            "By living our faith daily, we contribute to creating a world filled with compassion, understanding, and positive change.",
          ],
        },
        {
          id: 27,
          title: "explore the real life and nature",
          paragraphs: [
            "Service is not just about helping others—it is a transformative experience that shapes our character and deepens our spiritual lives.",
            "Through service, we learn humility, gratitude, and the joy of giving. It opens our eyes to the struggles of others and our role in alleviating them.",
            "Each act of service is an opportunity to grow spiritually, to connect with others on a deeper level, and to fulfill our calling to love and serve.",
          ],
        },
      ];
      const scrollingImages = [
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image1
        },
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image2
        },
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image3
        },
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image4
        },
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image5
        },
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image6
        },
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image7
        },
        {
          instagramLink: "https://www.instagram.com/direct/t/17844398358424258/",
          facebookLink:"https://www.facebook.com/",
          image:image8
        },
      ];
      const journeyData = [
             {
               
               title: "Our Retreat to enlightend youth about nature",
               paragraphs: [
                 "Welcome to RCCG NewSpring Teens, we are dedicated to going on a retreat it is a approach to seeking the face of God with this the souls of our youth will be renewed by the holy ghost this  has enlightend and souls have testified to the importance of retreat this is a good approach for youth to ignite the fire of the holyghost in their lives",
                 "Our Mission: We are committed to guiding young people on their spiritual journey through worship, teaching, and service. At RCCG NewSpring Teens, we focus on building a Christ-centered foundation that enables individuals to grow spiritually, embrace God’s purpose for their lives, and make a positive impact in their communities.",
                 "Through engaging programs, uplifting worship, and a welcoming atmosphere, we aim to create an environment where every teenager can experience the fullness of God’s love. Our story is one of faith, fellowship, and a shared commitment to raising the next generation of spiritual leaders who will transform the world for Christ.",
               ],
               images: [
                 { src: rccg1, alt: "Teens Ministry Gathering", className: "image3" },
               ],
             
             },
      ];
      const features = {
            type: "home",
            data: [
              {
                id: 1,
                icon: "fa-solid fa-fire",
                title: "Passionate Worship",
                description:
                  "A high-energy worship experience where young people connect with God through contemporary music, prayer, and heartfelt praise.",
              },
              {
                id: 2,
                icon: "fa-solid fa-lightbulb",
                title: "Illuminating Experience",
                description:
                  "Practical, Bible-based teachings tailored to address real-life challenges faced by today’s youth, inspiring them to live purposefully.",
              },
              {
                id: 3,
                icon: "fa-solid fa-heart",
                title: "Quite Time With God",
                description:
                  "A welcoming space for young people to build meaningful, Christ-centered relationships that promote growth, support, and accountability.",
              },
            ],
      };
      const featuresTitle = "Why Come For Retreat";
      const featuresTitleSmall ="NewSpring Tim412 empowers teens to grow in faith, one of the ways which is by build a create a time for intimacy and quiteness with the lord for the upliftment of the youth of this generation. ";
       const sectionType = "contact"
       const testimonials = [
        {
          id: 1,
          facebookLink: "https://www.facebook.com/",
          instagramLink: "https://www.instagram.com/",
          name: "adegoke folarin",
          image: testimonial1,
          testimony:
            "i am glad to be here for the retreat. ever since i started this retreat i have been experiencing a change in my life starting from i was 14. at that year i wanted to be the first position in my class with a mark of 100%. at the retreat i cry to go pouring out my heart desire to God for the position i desperately need and i the retreat God answered my prayer i am greatful to GOd  ."
        },
        {
          id: 2,
          facebookLink: "https://www.facebook.com/",
          instagramLink: "https://www.instagram.com/",
          name: "Bruno emeka",
          image: testimonial2,
          testimony:
            "i am glad to be here for the retreat. ever since i started this retreat i have been experiencing a change in my life starting from i was 14. at that year i wanted to be the first position in my class with a mark of 100%. at the retreat i cry to go pouring out my heart desire to God for the position i desperately need and i the retreat God answered my prayer i am greatful to GOd  ."
        },
        {
          id: 3,
          facebookLink: "https://www.facebook.com/",
          instagramLink: "https://www.instagram.com/",
          name: "Gracious clara",
          image: testimonial3,
          testimony:
            "i am glad to be here for the retreat. ever since i started this retreat i have been experiencing a change in my life starting from i was 14. at that year i wanted to be the first position in my class with a mark of 100%. at the retreat i cry to go pouring out my heart desire to God for the position i desperately need and i the retreat God answered my prayer i am greatful to GOd  ."
        },
          {
            id: 4,
            facebookLink: "https://www.facebook.com/",
            instagramLink: "https://www.instagram.com/",
            name: "Alex Rashford",
            image: testimonial4,
            testimony:
              "i am glad to be here for the retreat. ever since i started this retreat i have been experiencing a change in my life starting from i was 14. at that year i wanted to be the first position in my class with a mark of 100%. at the retreat i cry to go pouring out my heart desire to God for the position i desperately need and i the retreat God answered my prayer i am greatful to GOd  ."
          },
          {
            id: 5,
            facebookLink: "https://www.facebook.com/",
            instagramLink: "https://www.instagram.com/",
            name: "Alakantara John",
            image: testimonial5,
            testimony:
              "i am glad to be here for the retreat. ever since i started this retreat i have been experiencing a change in my life starting from i was 14. at that year i wanted to be the first position in my class with a mark of 100%. at the retreat i cry to go pouring out my heart desire to God for the position i desperately need and i the retreat God answered my prayer i am greatful to GOd  ."
          },
          {
            id: 6,
            facebookLink: "https://www.facebook.com/",
            instagramLink: "https://www.instagram.com/",
            name: "Hernadez Jose",
            image: testimonial6,
            testimony:
              "i am glad to be here for the retreat. ever since i started this retreat i have been experiencing a change in my life starting from i was 14. at that year i wanted to be the first position in my class with a mark of 100%. at the retreat i cry to go pouring out my heart desire to God for the position i desperately need and i the retreat God answered my prayer i am greatful to GOd  ."
          },
        ];
        const videoData = {
          video: "https://www.youtube.com/embed/7FHJleNWqck" ,
          src: videoRccg,
          videoClass: "videodata_image",
          header: "Why We Call Newspring Home",
          para: [
            "Welcome to Newspring Church, a vibrant community within the Redeemed Christian Church of God (RCCG) dedicated to nurturing and empowering our youth. Our mission is to create a safe and welcoming space where young individuals can connect, grow, and be equipped to make a positive impact in their communities. Through dynamic worship, engaging teachings, and compassionate outreach, we inspire our youth to wholeheartedly pursue God, deepen their faith, and live purposefully.",
            "At Newspring, we believe in fostering an environment that encourages spiritual growth and personal development. Our programs are designed to help young people discover their unique gifts and callings, preparing them to confidently navigate life's challenges. By participating in our various initiatives, including youth conferences, small group sessions, and community service projects, our youth are empowered to live out their faith and make a meaningful difference in the world around them."
          ],
        };
        const contactFormData = {
          type:"forRereat",
          formSrc:retreatImage,
          formTitle : "Register For The Retreat",
          formText:" our retreat will be taking place on the 4th may of every year, please register before the designated date thank you."
        }
      
  return (
    <div className='retreat'>
        <Link to="/">
        <i title="Go Back" className="fa-solid fa-backward"></i>
      </Link>
     <Hero sections={sections} sectionType={sectionType} />
     <Journey journeyData={journeyData} />
     <ScrollImage scrollingImages={scrollingImages}/>
     <Videodata videoData={videoData} />
     <Features features={features} featuresTitle={featuresTitle} featuresTitleSmall={featuresTitleSmall}/>
     <Testimonial testimonials={testimonials} />
     <ContactForm contactFormData={contactFormData}/>
     
    </div>
  )
}

export default Retreat