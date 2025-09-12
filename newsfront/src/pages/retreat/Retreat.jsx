import React from 'react'
import { Link } from 'react-router';
import Hero from '../../components/hero/Hero';
import ScrollImage from '../../components/scrollImage/ScrollImage';
import image1 from "../../assets/rccg83.jpg"
import image2 from "../../assets/park7.jpg"
import image3 from "../../assets/park6.jpg"
import image4 from "../../assets/park5.jpg"
import image5 from "../../assets/park4.jpg"
import image6 from "../../assets/park.jpg"
import image7 from "../../assets/park2.jpg"
import image8 from "../../assets/park3.jpg"
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
        title: "Faith and Fellowship",
        paragraphs: [
            "Church in the Park is a special Easter program where TIM412 comes together to worship and celebrate Christ.",
            "It’s a joyful time of renewal and connection in God’s presence."
        ],
    },
    {
        id: 14,
        title: "Building Connections",
        paragraphs: [
            "Beyond an outing, it’s a chance to bond and create lasting friendships in Christ.",
            "Unity shines as we share faith, laughter, and fun together."
        ],
    },
    {
        id: 26,
        title: "Spiritual Renewal",
        paragraphs: [
            "A moment to pause, reflect, and refocus on God.",
            "Through worship and encouragement, hearts are refreshed for the journey ahead."
        ],
    },
    {
        id: 27,
        title: "Experiencing God in Nature",
        paragraphs: [
            "The beauty of the park reminds us of God’s wonders.",
            "Through outdoor worship, games, and reflection, we enjoy His peace and goodness."
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
      title: "Church in the Park – Worship and Fellowship",
      paragraphs: [
          "At TIM412, Church in the Park is our Easter program where we step outside to worship, celebrate, and share joyful fellowship as one family.",
          "Through worship, prayer, and fun activities in nature, we grow in faith, build lasting connections, and leave refreshed in God’s presence."
      ],
      images: [
          { src: rccg1, alt: "Church in the Park Worship Session", className: "image3" },
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
        "A refreshing time of worship, prayer, and celebration in God’s presence under the open sky.",
    },
    {
      id: 2,
      icon: "fa-solid fa-mountain",
      title: "Faith in Nature",
      description:
        "Experiencing God’s beauty in the park, reminding us of His wonders and goodness.",
    },
    {
      id: 3,
      icon: "fa-solid fa-hands-helping",
      title: "Fellowship and Fun",
      description:
        "Sharing laughter, games, and faith-building moments that create lasting memories together.",
    },
  ],
};
      const featuresTitle = "Why Join Church in the Park";
const featuresTitleSmall =
  "TIM412 creates a joyful space for teens to grow in faith, worship together, and enjoy fellowship in a refreshing outdoor setting.";

const sectionType = "";

const testimonials = [
  {
    id: 1,
    facebookLink: "https://www.facebook.com/adegoke.folarin.37/",
    instagramLink: "https://www.instagram.com/adegokefolarin/",
    name: "Folarin Adegoke",
    image: testimonial1,
    testimony:
      "Church in the Park has been such a blessing. Worshipping in nature with TIM412 gave me fresh joy and a stronger connection with God.",
  },
  {
    id: 2,
    facebookLink: "https://www.facebook.com/bruno.emeka.79/",
    instagramLink: "https://www.instagram.com/brunoemeka/",
    name: "Emeka Bruno",
    image: testimonial2,
    testimony:
      "I enjoyed the fellowship and fun. It was uplifting to pray, worship, and share laughter together in God’s presence.",
  },
  {
    id: 3,
    facebookLink: "https://www.facebook.com/gracious.clara/",
    instagramLink: "https://www.instagram.com/graciousclara/",
    name: "Gracious Clara",
    image: testimonial3,
    testimony:
      "Being part of Church in the Park renewed my faith. The worship, the word, and the outdoor joy made it unforgettable.",
  },
  {
    id: 4,
    facebookLink: "https://www.facebook.com/alex.rashford/",
    instagramLink: "https://www.instagram.com/alexrashford/",
    name: "Alex Rashford",
    image: testimonial4,
    testimony:
      "I left feeling refreshed and encouraged. It was a beautiful time of worship and fellowship with TIM412.",
  },
  {
    id: 5,
    facebookLink: "https://www.facebook.com/alakantara.john/",
    instagramLink: "https://www.instagram.com/alakantarajohn/",
    name: "Alakantara John",
    image: testimonial5,
    testimony:
      "Church in the Park was inspiring. Worshipping in the open reminded me of God’s greatness and filled me with peace.",
  },
  {
    id: 6,
    facebookLink: "https://www.facebook.com/hernadez.jose/",
    instagramLink: "https://www.instagram.com/hernadezjose/",
    name: "Hernandez Jose",
    image: testimonial6,
    testimony:
      "It was a joyful experience. I loved the worship, games, and the chance to connect with others in Christ.",
  },
];

const videoData = {
  video: "https://www.youtube.com/embed/nYtATabBPSA",
  src: videoRccg,
  videoClass: "videodata_image",
  header: "The Joy of Church in the Park",
  para: [
    "Church in the Park is TIM412’s Easter program — a time to step outdoors and celebrate God with worship, fellowship, and fun.",
    "Through songs, teachings, and uplifting activities, hearts are renewed and faith is strengthened. It’s not just an outing; it’s an encounter with God in nature.",
  ],
};

const contactFormData = {
  type: "forChurchInThePark",
  formSrc: retreatImage,
  formTitle: "Register for Church in the Park",
  formText:
    "Church in the Park holds every Easter. Please register ahead and join TIM412 as we worship, celebrate, and enjoy fellowship together.",
};
      
  return (
    <div className='retreat'>
        <Link to="/">
        <i title="Go Back" className="fa-solid fa-backward"></i>
      </Link>
     <Hero sections={sections} sectionType={sectionType} />
     <Journey journeyData={journeyData} />

     <DateWithImage
  imageSrc={image1}
  altText="Church in the Park Banner"
  eventName="TIM412 Church in the Park 2025"
  tagline="Worship • Fellowship • Fun"
  startDate="Sunday, April 20, 2025"
  endDate="Sunday, April 20, 2025"
  location="Local Park, RCCG Newsprings"
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