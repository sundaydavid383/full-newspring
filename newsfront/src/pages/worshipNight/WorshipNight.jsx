import React from "react";
import Hero from "../../components/hero/Hero";
import "./worshipnight.css";
import Features from "../../components/features/Features";
import Videodata from "../../components/videodata/Videodata";
import videoRccg from "../../assets/rccg17.jpg";
import video1 from "../../assets/video1.mp4";
import tu1 from "../../assets/oyekan.jpg";
import tu2 from "../../assets/taya.jpg";
import tu3 from "../../assets/nathbassey.jpg";
import tu4 from "../../assets/theophilus.jpg";
import Leaders from "../../components/leaders/Leaders";
import { Link } from "react-router";

const WorshipNight = () => {
  const sectionType = "";
  const sections = [
    {
      id: 17,
      title: "Worship with Christ",
      paragraphs: [
        "Experience uplifting worship, inspiring messages, and a warm, welcoming community at RCCG NewSpring Youth. Our services are designed to help you grow spiritually and connect with others in faith.",
        "Whether you're new to church or looking for a vibrant community to call home, our doors are open to everyone.",
        "Join us this week to experience God’s presence and discover the joy of fellowship.",
      ],
    },
    {
      id: 18,
      title: "A Night of Encounters",
      paragraphs: [
        "We offer multiple service times to fit your schedule:",
        "- Sunday Morning Service: 8:00 AM - 10:30 AM",
        "- Youth Fellowship Service: 11:00 AM - 1:00 PM",
        "- Midweek Bible Study: Wednesday, 6:00 PM - 7:30 PM",
        "No matter your availability, there’s always a chance to connect with God and the community. Come and worship with us!",
      ],
    },
    {
      id: 19,
      title: "Come in Expectance",
      paragraphs: [
        "At RCCG NewSpring Youth, you can expect an engaging worship experience with contemporary music and a practical, Bible-based message.",
        "We have a welcoming environment where people of all backgrounds can feel comfortable exploring their faith.",
        "Our youth programs are interactive and focus on spiritual growth, mentorship, and leadership development. We aim to inspire and equip you for life’s journey.",
      ],
    },

    {
      id: 20,
      title: "Worship Night",
      paragraphs: [
        "Join us for our special Worship Night, a time dedicated to deepening our connection with God through powerful worship and prayer.",
        "This event is open to all, and we encourage you to invite friends and family to experience this transformative evening.",
        "Date: last Friday of july ",
        "Time: 10:00pm",
        "Location: 332, Capital Building, Idiroko Bus Stop, Maryland, Lagos, Nigeria",
        "Come with an expectant heart and be ready to encounter God's presence in a profound way.",
      ],
    },
  ];
  const leaders = [
    {
      name: "Min Dunsin Oyekan",
      position: "Event Pastor",
      posIcon: "fa-solid fa-book-bible",
      image: tu1,
      socials: {
        twitter: "https://twitter.com/DunsinOyekan",
        facebook: "https://www.facebook.com/DunsinOyekan",
        instagram: "https://www.instagram.com/dunsinoyekan",
        youtube: "https://www.youtube.com/c/DunsinOyekan",
      },
    },
    {
      name: "Taya Smith ",
      position: "Choir Coordinator",
      image: tu2,
      posIcon: "fa-solid fa-guitar",
      socials: {
        twitter: "https://twitter.com/TayaGaukrodger",
        facebook: "https://www.facebook.com/Taya-Smith-1600550320200202",
        instagram: "https://www.instagram.com/tayasmith",
      },
    },
    {
      name: "Pas. Nath Bassey",
      position: "Host",
      image: tu3,
      posIcon: "fa-solid fa-hands-praying",
      socials: {
        twitter: "https://x.com/nathanielblow?lang=en",
        facebook: "https://www.facebook.com/nathanielbassey.net",
        instagram: "https://www.instagram.com/nathanielblow",
      },
    },
    {
      name: "Min. Theo Sunday",
      position: "Guest Minister",
      image: tu4,
      posIcon: "fa-solid fa-user-tag",
      socials: {
        twitter: "https://x.com/min_theophilus",
        facebook: "https://www.facebook.com/mintheophilussunday",
        instagram: "https://www.instagram.com/theophilussunday",
      },
    },
  ];
  const featuresTitle = "Worship Night";
  const featuresTitleSmall = "We would like to invite you for Our anual worship night that holds every last friday of october. ";
  const leadersTitle = "Guest Ministers";
  const leadersTitleSmall = " we are inviting the top and most impactful gospel artist the dedicated individuals leading our youth ministry.";
  const features = {
    type: "worshipNight",
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
        icon: "fa-solid fa-location-dot",
        title: "physical location",
        description: "located at 332 Ikorodu Road, Lagos, Nigeria 100211",
      },
      {
        id: 3,
        icon: "fa-solid fa-clock",
        title: "Time and date",
        description: "5th of may 2025 <br> 10:00pm prompt.",
      },
    ],
  };
  const videoData = {

    video: "https://www.youtube.com/embed/3hahNeKAcPM",
    src: videoRccg,
    videoClass: "videodata_image1",
    header: "Come Encounter Jesus Through Worship",
    para: [
      "At RCCG Newspring Youth Church, our worship nights are transformative experiences where young believers gather to seek and encounter Jesus through heartfelt worship. These evenings are designed to create an atmosphere that fosters a deep connection with God, allowing participants to express their devotion and experience His presence in profound ways.",
      "Our worship nights feature dynamic music led by passionate worship leaders, inspiring messages that resonate with the youth, and moments of prayer and reflection. These gatherings not only strengthen individual faith but also build a sense of community among the youth, encouraging them to live out their faith boldly and authentically in their daily lives.",
    ],
  };
  return (
    <div className="WorshipNight">
     <Link to="/"><i  title="Go Back" className="fa-solid fa-backward"></i></Link>
      <Hero sections={sections} sectionType={sectionType} />
      <Features
        features={features}
        featuresTitle={featuresTitle}
        featuresTitleSmall={featuresTitleSmall}
      />
      <Videodata videoData={videoData} />
      <Leaders leadersTitle={leadersTitle} leadersTitleSmall={leadersTitleSmall} leaders={leaders}/>
    </div>
  );
};

export default WorshipNight;
