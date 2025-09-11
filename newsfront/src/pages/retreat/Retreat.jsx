import React from 'react'
import { Link } from 'react-router';
import Hero from '../../components/hero/Hero';
import ScrollImage from '../../components/scrollImage/ScrollImage';
import image1 from "../../assets/rccg83.jpg"
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
import DateWithImage from "../../components/dateWithImage/DateWithImage";

const Retreat = ({}) => {
  const sections = [
    {
        id: 12,
        title: "Strengthening Faith and Fellowship",
        paragraphs: [
            "Our retreat provides a sacred space for youth to disconnect from daily distractions and reconnect with their faith and purpose.",
            "Through heartfelt worship, reflective discussions, and shared experiences, participants deepen their relationship with God and with one another.",
            "This time away allows for personal and spiritual growth, fostering a renewed sense of purpose and a stronger commitment to faith."
        ],
    },
    {
        id: 14,
        title: "Building Lasting Connections",
        paragraphs: [
            "A retreat is more than just a getaway—it’s a time to strengthen bonds and build meaningful relationships rooted in faith.",
            "By engaging in group activities, prayer sessions, and fellowship, youth create lifelong friendships and a sense of belonging within the community.",
            "True unity is experienced when we come together in worship, reflection, and shared faith, forming a support system that extends beyond the retreat."
        ],
    },
    {
        id: 26,
        title: "Spiritual Renewal and Self-Discovery",
        paragraphs: [
            "Retreats offer an opportunity to step back, reflect, and refocus on one’s spiritual journey.",
            "By immersing in prayer, worship, and teachings, participants gain a deeper understanding of their faith and a renewed sense of direction.",
            "This sacred time encourages personal growth, helping youth develop the confidence and clarity needed to navigate life with faith and purpose."
        ],
    },
    {
        id: 27,
        title: "Experiencing God in Nature",
        paragraphs: [
            "Surrounded by the beauty of nature, participants are reminded of God's presence in all creation, fostering a deeper appreciation for His work.",
            "Through quiet reflection, outdoor activities, and spiritual exercises, youth experience peace, renewal, and a closer connection with God.",
            "Nature serves as a powerful backdrop for spiritual awakening, allowing individuals to witness God’s wonders in ways that inspire awe and gratitude."
        ],
    },
];
const scrollingImages = [
  {
    instagramLink: "https://www.instagram.com/p/CI6Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584909/",
    image: image1
  },
  {
    instagramLink: "https://www.instagram.com/p/CK7Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584910/",
    image: image2
  },
  {
    instagramLink: "https://www.instagram.com/p/CL8Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584911/",
    image: image3
  },
  {
    instagramLink: "https://www.instagram.com/p/CM9Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584912/",
    image: image4
  },
  {
    instagramLink: "https://www.instagram.com/p/CN0Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584913/",
    image: image5
  },
  {
    instagramLink: "https://www.instagram.com/p/CO1Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584914/",
    image: image6
  },
  {
    instagramLink: "https://www.instagram.com/p/CP2Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584915/",
    image: image7
  },
  {
    instagramLink: "https://www.instagram.com/p/CQ3Q6l1h5yS/",
    facebookLink: "https://www.facebook.com/christianretreat/photos/a.10150117702579909/10150117702584916/",
    image: image8
  },
];
const journeyData = [
  {
      title: "A Transformative Retreat for Spiritual Renewal",
      paragraphs: [
          "At RCCG NewSpring Teens, our retreat is a sacred time to disconnect from the world and reconnect with God. It is a powerful experience where youth gather to seek the face of God, reflect on their faith, and deepen their relationship with Christ.",
          "Our Mission: Through prayer, worship, and teachings, we create an atmosphere for spiritual growth and renewal. This retreat serves as a refreshing moment for young believers to rekindle their passion for God, strengthen their faith, and embrace a deeper understanding of their divine purpose.",
          "Testimonies abound from past retreats, where many have experienced life-changing encounters with the Holy Spirit. Through group discussions, outdoor activities, and quiet moments of reflection, participants leave with renewed faith, restored joy, and a burning desire to live for Christ."
      ],
      images: [
          { src: rccg1, alt: "Youth Retreat Worship Session", className: "image3" },
      ],
  },
];
      const features = {
            type: "home",
            data: [
              {
                id: 1,
                icon: "fa-solid fa-praying-hands",
                title: "Spiritual Renewal",
                description:
                  "A dedicated time to seek God's presence through deep prayer, worship, and fasting, allowing for personal and spiritual revival.",
              },
              {
                id: 2,
                icon: "fa-solid fa-mountain",
                title: "Isolation for Reflection",
                description:
                  "Retreats provide an opportunity to step away from daily distractions and immerse in God's Word, gaining clarity and direction for life.",
              },
              {
                id: 3,
                icon: "fa-solid fa-hands-helping",
                title: "Faith-Building Fellowship",
                description:
                  "Engaging in meaningful discussions, testimonies, and activities that strengthen faith and foster deeper relationships within the body of Christ.",
              },
            ],
      };
      const featuresTitle = "Why Come For Retreat";
      const featuresTitleSmall ="NewSpring Tim412 empowers teens to grow in faith, one of the ways which is by build a create a time for intimacy and quiteness with the lord for the upliftment of the youth of this generation. ";
       const sectionType = ""
       const testimonials = [
        {
          id: 1,
          facebookLink: "https://www.facebook.com/adegoke.folarin.37/",
          instagramLink: "https://www.instagram.com/adegokefolarin/",
          name: "Folarin Adegoke",
          image: testimonial1,
          testimony: "I am glad to be here for the retreat. Ever since I started attending, I've experienced significant changes in my life. At 14, I aspired to achieve the top position in my class with a perfect score. During the retreat, I poured out my heart to God about this desire, and He answered my prayer. I am grateful to God."
        },
        {
          id: 2,
          facebookLink: "https://www.facebook.com/bruno.emeka.79/",
          instagramLink: "https://www.instagram.com/brunoemeka/",
          name: "Emeka Bruno",
          image: testimonial2,
          testimony: "Participating in the retreat has been a transformative experience. Starting at 14, I sought academic excellence, aiming for the top position with a perfect score. Through heartfelt prayers during the retreat, God granted my request. I am deeply thankful."
        },
        {
          id: 3,
          facebookLink: "https://www.facebook.com/gracious.clara/",
          instagramLink: "https://www.instagram.com/graciousclara/",
          name: "Gracious Clara",
          image: testimonial3,
          testimony: "Attending the retreat has brought profound changes to my life. At 14, I desired to be the top student with a 100% mark. During the retreat, I earnestly prayed to God, and He answered my prayers. I am immensely grateful."
        },
        {
          id: 4,
          facebookLink: "https://www.facebook.com/alex.rashford/",
          instagramLink: "https://www.instagram.com/alexrashford/",
          name: "Alex Rashford",
          image: testimonial4,
          testimony: "The retreat has been a blessing. Since I began attending at 14, I've seen remarkable improvements in my life. I prayed fervently for academic success, and God responded graciously. I am thankful beyond words."
        },
        {
          id: 5,
          facebookLink: "https://www.facebook.com/alakantara.john/",
          instagramLink: "https://www.instagram.com/alakantarajohn/",
          name: "Alakantara John",
          image: testimonial5,
          testimony: "Being part of the retreat has been life-changing. At 14, I aimed for academic excellence. Through sincere prayers during the retreat, God granted my desires. I am profoundly grateful."
        },
        {
          id: 6,
          facebookLink: "https://www.facebook.com/hernadez.jose/",
          instagramLink: "https://www.instagram.com/hernadezjose/",
          name: "Hernandez Jose",
          image: testimonial6,
          testimony: "The retreat has positively impacted my life. Starting at 14, I aspired for top academic honors. Through earnest prayers during the retreat, God fulfilled my wishes. I am deeply appreciative."
        },
      ];
      const videoData = {
        video: "https://www.youtube.com/embed/nYtATabBPSA",
        src: videoRccg,
        videoClass: "videodata_image",
        header: "The Power of Retreat in Our Spiritual Journey",
        para: [
          "At RCCG NewSprings, our retreats provide a sacred time for youth to disconnect from the distractions of daily life and reconnect with God in a deeper way. Through prayer, worship, and fellowship, these retreats create an atmosphere where hearts are renewed, faith is strengthened, and personal revival takes place.",
          "During our retreats, we focus on spiritual growth, self-reflection, and the power of the Holy Spirit in transforming lives. Through impactful teachings, group discussions, and moments of solitude in God's presence, many have experienced breakthroughs and a fresh outpouring of grace. This is not just a gathering; it is an opportunity to reignite the fire of God within and walk in His divine purpose."
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

      <DateWithImage
      imageSrc={image1}
      altText="Youth Retreat Banner"
      eventName="TIM412 Youth Retreat 2025"
      tagline="Rooted in Christ, Growing in Grace"
      startDate="Friday, July 11, 2025"
      endDate="Sunday, July 13, 2025"
      location="RCCG Campground, Redemption City"
    />
 <ScrollImage scrollingImages={scrollingImages}/>
     <Videodata videoData={videoData} />
     <Features features={features} featuresTitle={featuresTitle} featuresTitleSmall={featuresTitleSmall}/>
     {/* <Testimonial testimonials={testimonials} /> */}
     <ContactForm contactFormData={contactFormData} formType="retreat" />
     
    </div>
  )
}

export default Retreat