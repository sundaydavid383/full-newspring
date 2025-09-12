import React, { useEffect, useState } from "react";
import axios from "axios";
import im1 from "../../assets/rccg16.jpg";
import im4 from "../../assets/rccg22.jpg";
import im3 from "../../assets/rccg23.jpg";
import im2 from "../../assets/rccg28.jpg";
import im9 from "../../assets/rccg55.jpg";
import im10 from "../../assets/rccg38.jpg";
import im11 from "../../assets/rccg31.jpg";
import im12 from "../../assets/rccg32.jpg";
import im13 from "../../assets/rccg33.jpg";
import im14 from "../../assets/rccg34.jpg";
import im15 from "../../assets/rccg41.jpg";
import im19 from "../../assets/rccg43.jpg";
import im18 from "../../assets/rccg39.jpg";
import im20 from "../../assets/rccg42.jpg";
import im17 from "../../assets/rccg40.jpg";
import rccg1 from "../../assets/rccg5.jpg";
import rccg2 from "../../assets/rccg2.jpg";
import word from "../../assets/rccg13.jpg";
import spiritual from "../../assets/rccg14.jpg";
import love from "../../assets/rccg15.jpg";
import social from "../../assets/rccg16.jpg";
import imgi1 from "../../assets/rccg22.jpg";
import imgi2 from "../../assets/rccg23.jpg";
import event from "../../assets/rccg18.jpg";
import imgi3 from "../../assets/rccg24.jpg";
import tu1 from "../../assets/tutor1.jpg";
import tu2 from "../../assets/tutor2.jpg";
import tu3 from "../../assets/tutor3.jpg";
import tu4 from "../../assets/tutor4.jpg";
import Hero from "../../components/hero/Hero";
import Journey from "../../components/journey/Journey";
import Gallery from "../../components/gallery/Gallery";
import Churchdetails from "../../components/churchdetails/Churchdetails";
import Event from "../../components/event/Event";
import Minareas from "../../components/minareas/Minareas";
import Schedules from "../../components/schedules/Schedules";
import Features from "../../components/features/Features";
import Upcommingevent from "../../components/upcommingevent/Upcommingevent";
import Leaders from "../../components/leaders/Leaders";
import Articles from "../../components/articles/Articles";
import Videodata from "../../components/videodata/Videodata";


const Home = ({ setActive ,dataBase, setDataBase, onLoad, homedata, ministryAreas}) => {


  const videoData = homedata.videoData
  const journeyData = homedata.journeyData
  const churchCards = homedata.churchCards;
  // [
  //   {
  //     image: prayer,
  //     alt: "Deep Prayer Life",
  //     title: "Deep Prayer Life",
  //     description: "Cultivate a habit of daily, intentional prayer to deepen your relationship with God. Prayer is not just a ritual but a meaningful conversation with the Creator, where you can seek His guidance, pour out your heart, and find the peace that surpasses all understanding. Let prayer anchor you in life’s storms and keep you aligned with God’s will."
  //   },
  //   {
  //     image: faith,
  //     alt: "Bold Faith",
  //     title: "Bold Faith",
  //     description: "Faith is the courage to trust in God even when circumstances seem uncertain or challenging. Bold faith means standing firm in the truth of the Gospel, even in the face of opposition or doubt. It is living as a beacon of hope and love, being unashamed of your beliefs, and inspiring others to experience the transformative power of Christ’s message."
  //   },
  //   {
  //     image: purpose,
  //     alt: "Pure and Purposeful Living",
  //     title: "Pure and Purposeful Living",
  //     description: "Purity is more than avoiding sin; it is a commitment to live a life that reflects God’s holiness in thoughts, words, and actions. Purposeful living involves aligning your goals and decisions with God’s plan for your life. By prioritizing spiritual growth, resisting worldly temptations, and pursuing Christ-centered ambitions, you can inspire others to see God’s love through your example."
  //   }
  // ];
  const events = homedata.events
  // [
  //   {
  //     image: prayer,
  //     alt: "Prayer Meetings",
  //     title: "Prayer and Worship Nights",
  //     description:
  //       "A powerful gathering where youth come together to seek God through heartfelt prayers and uplifting worship. These nights are designed to refresh spirits, build a deeper connection with God, and strengthen communal bonds through shared faith.",
  //     link: "/worshipnight",
  //     animationClass: "event_ani1"
  //   },
  //   {
  //     image: faith,
  //     alt: "Bible Study",
  //     title: "Bible Study Sessions",
  //     description:
  //       "Dive into the Word of God with engaging and interactive Bible study sessions. These sessions help youth gain practical insights from Scripture, strengthen their understanding of God’s promises, and encourage them to apply biblical principles to each individuals everyday life.",
  //     link: "/biblestudy",
  //     animationClass: "event_ani2"
  //   },
  //   {
  //     image: retreat,
  //     alt: "Youth Retreats",
  //     title: "Youth Retreats",
  //     description:
  //       "A dedicated time away to recharge spiritually, emotionally, and mentally. These retreats provide an opportunity for deep worship, insightful teachings, group activities, and bonding moments that strengthen faith and friendships in a serene and inspiring environment.",
  //     link: "/retreat",
  //     animationClass: "event_ani3"
  //   }
  // ]

   
  // [
  //   {
  //     img: word,
  //     icon: "fa-solid fa-book-bible",
  //     title: "Proclaiming the Word",
  //     description:
  //       "Teaching the truth of God’s Word to empower youth with the knowledge and confidence to live out their faith in all areas of life.",
  //     linkText: "Learn More",
  //   },
  //   {
  //     img: love,
  //     icon: "fa-solid fa-shield-heart",
  //     title: "Extending God’s Love",
  //     description:
  //       "Inspiring youth to reflect Christ’s love through service, kindness, and compassion, impacting the world with God’s mercy and grace.",
  //     linkText: "Get Involved",
  //   },
  //   {
  //     img: spiritual,
  //     icon: "fa-solid fa-hand-holding-droplet",
  //     title: "Nurturing Spiritual Growth",
  //     description:
  //       "Encouraging spiritual maturity by guiding youth through prayer, worship, and discipleship to strengthen their intimacy with Christ.",
  //     linkText: "Explore More",
  //   },
  //   {
  //     img: social,
  //     icon: "fa-solid fa-user-group",
  //     title: "Godly Relationships",
  //     description:
  //       "Creating an environment for youth to build strong, Christ-centered relationships, fostering community, unity, and support in faith.",
  //     linkText: "Join Us",
  //   },
  // ];
  const features =  homedata.features
  // {
  //   type: "home",
  //   data: [
  //     {
  //       id: 1,
  //       icon: "fa-solid fa-fire",
  //       title: "Passionate Worship",
  //       description:
  //         "A high-energy worship experience where young people connect with God through contemporary music, prayer, and heartfelt praise.",
  //     },
  //     {
  //       id: 2,
  //       icon: "fa-solid fa-lightbulb",
  //       title: "Life-Changing Teachings",
  //       description:
  //         "Practical, Bible-based teachings tailored to address real-life challenges faced by today’s youth, inspiring them to live purposefully.",
  //     },
  //     {
  //       id: 3,
  //       icon: "fa-solid fa-heart",
  //       title: "Authentic Community",
  //       description:
  //         "A welcoming space for young people to build meaningful, Christ-centered relationships that promote growth, support, and accountability.",
  //     },
  //   ],
  // };
 
  const scheduleData = homedata.schedule
  // [
  //   {
  //     event: "Sunday Services",
  //     time: "8:00 AM",
  //     location: "RCCG NewSpring, Idiroko Bus Stop",
  //   },
  //   {
  //     event: "Midweek Service",
  //     time: "Wednesdays at 6:00 PM",
  //     location: "RCCG NewSpring, Idiroko Bus Stop",
  //   },
  //   {
  //     event: "New Month Prayers",
  //     time: "Every 1st Saturday of the month at 8:00 AM",
  //     location: "RCCG NewSpring, Idiroko Bus Stop",
  //   },
  //   {
  //     event: "Daily Online Prayer Community",
  //     time: "Monday to Friday at various times (6:00 AM–7:00 AM, 6:00 PM–7:00 PM, 9:00 PM–10:00 PM, 12:00 AM–1:00 AM)",
  //     location: "Saturday at multiple sessions (6:00 AM–7:00 AM, 9:00 AM–10:00 AM, 12:00 PM–1:00 PM, 3:00 PM–4:00 PM, 6:00 PM–7:00 PM, 9:00 PM–10:00 PM, 12:00 AM–1:00 AM)",
  //   }
  // ];
   const eventData = homedata.eventData
  //  {
  //     title: "Celebrating Our Church Anniversary",
  //     dateTime: "Oct 9, 2025 @ 07:00 - 15:00",
  //     datelogic: "October 9, 2025 00:00:00 GMT+0000",
  //     location: "332, Capital Building, Idiroko Bus Stop, Lagos",
  //     image: event,
  //     targetDate: new Date("October 9, 2025 00:00:00 GMT+0000"),
  //     description:
  //       "Join us in celebrating our church anniversary as we reflect on God’s faithfulness and build lasting memories together.",
  //   };
  const articles = homedata.articles
  //  [
  //      {
  //             id: 38,
  //             title: "Engaging Skeptics with Truth and Respect",
  //             image: imgi1,
  //             date: "2024-09-10",
  //             author: "Dr. James Turner",
  //             quote: "Sanctify Christ as Lord in your hearts, always being ready to make a defense. - 1 Peter 3:15",
  //             gist1: "Apologetics equips Christians to engage with skeptics in a way that demonstrates the rationality and truth of the Christian faith. In a world filled with skepticism and challenges to traditional beliefs, it’s crucial that we are prepared to respond with clarity, respect, and knowledge. Apologetics helps us show that faith and reason are not mutually exclusive and provides answers to life's big questions. Engaging skeptics requires patience, listening, and the ability to present the Gospel in a compelling way that draws people closer to the truth.",
  //             gist2: "When engaging with skeptics, it’s important to approach conversations with humility and a desire to listen and understand. Apologetics is not about arguing to win but about engaging in meaningful dialogue that points to the truth of the Gospel. By understanding the worldview of those we engage with, we can offer answers that are both intellectually satisfying and compassionate. Always remember that apologetics is a tool to bring others to Christ, not just to prove them wrong.",
  //             advice: [
  //               "Understand the philosophical foundations of Christianity.",
  //               "Engage with contemporary issues through a Biblical worldview.",
  //               "Be patient and listen to the concerns of others before offering an answer.",
  //               "Use apologetics as a tool to point others to Jesus, not just to win arguments."
  //             ]
  //           },
  //           {
  //             id: 39,
  //             title: "Presenting Christianity as Rational and Transformative",
  //             image: imgi3,
  //             date: "2024-09-15",
  //             author: "Dr. Emily Roberts",
  //             quote: "You will know the truth, and the truth will set you free. - John 8:32",
  //             gist1: "Christian apologetics is about more than just defending doctrine—it’s about showing the world that the Christian faith is both rational and transformative. Many objections to Christianity are rooted in misunderstandings or misconceptions about the faith. Apologists work to break down these barriers by presenting evidence and addressing doubts in a way that highlights the coherence and beauty of the Christian worldview. In a secular society, apologetics provides a means of sharing the timeless truth of the Gospel with those who may not be open to traditional methods of evangelism.",
  //             gist2: "The goal of Christian apologetics is to present Christianity as a rational, life-changing faith. By addressing common objections and presenting logical and intellectual arguments for the truth of Christianity, apologists help people see that the Christian faith is not only true but also transformative. As Christians, we should approach apologetics with humility and compassion, always seeking to point others to Christ through our words and actions.",
  //             advice: [
  //               "Familiarize yourself with the major worldviews and philosophies that challenge Christianity.",
  //               "Always approach apologetics with love and compassion.",
  //               "Be confident in your faith, but also open to learning from others.",
  //               "Remember that the goal is to point people to Christ, not to prove them wrong."
  //             ]
  //           },
  //           {
  //             id: 40,
  //             title: "Responding Thoughtfully to Life's Hard Questions",
  //             image: imgi2,
  //             date: "2024-09-20",
  //             author: "Dr. David Harris",
  //             quote: "For the word of the Lord is right and true; He is faithful in all He does. - Psalm 33:4",
  //             gist1: "Apologetics is not just for defending abstract theological concepts—it’s also about answering life’s tough questions with integrity and reason. Christianity provides satisfying answers to questions about suffering, morality, and existence, and apologetics helps us articulate these answers in a way that respects both the believer and the skeptic. By understanding the heart of our faith and the logic behind it, we can respond to difficult questions thoughtfully and with confidence, pointing to the truth of God's Word.",
  //             gist2: "Responding to life’s hard questions requires both knowledge and humility. As Christians, we are equipped with the truth of God’s Word to respond to the doubts and challenges that arise in our own lives and in the lives of others. Apologetics allows us to engage with tough topics in a way that is intellectually satisfying and spiritually nurturing. It’s not about having all the answers, but about being willing to engage honestly and thoughtfully with the hard questions of life and faith.",
  //             advice: [
  //               "Take time to develop a biblical worldview to answer tough questions.",
  //               "Stay humble in your approach, knowing you don’t have all the answers.",
  //               "Embrace the journey of learning and growing in knowledge of Scripture.",
  //               "Use apologetics as an opportunity to glorify God and share His truth."
  //             ]
  //           }  
  // ];
 const leaders = [
  {
    name: "Folarin Adeyemi",
    position: "Youth President",
    posIcon: "fa-solid fa-users", // represents leadership & youth group
    image: tu1,
    socials: {
      twitter: "https://twitter.com/folarin_adeyemi",
      facebook: "https://facebook.com/folarin.adeyemi",
      instagram: "https://instagram.com/folarin_adeyemi",
    },
  },
  {
    name: "Grace Guafar",
    position: "Head of Welcome",
    posIcon: "fa-solid fa-handshake", // welcoming role
    image: tu2,
    socials: {
      twitter: "https://twitter.com/grace_guafar",
      facebook: "https://facebook.com/grace.guafar",
      instagram: "https://instagram.com/grace_guafar",
    },
  },
  {
    name: "Titilola Guafar",
    position: "Head of Prayer and Spiritual Team",
    posIcon: "fa-solid fa-hands-praying", // prayer/spiritual
    image: tu3,
    socials: {
      twitter: "https://twitter.com/titilola_guafar",
      facebook: "https://facebook.com/titilola.guafar",
      instagram: "https://instagram.com/titilola_guafar",
    },
  },
  {
    name: "Chuba Mbeme",
    position: "Deputy Head of Creative Department",
    posIcon: "fa-solid fa-paintbrush", // creativity/design
    image: tu4,
    socials: {
      twitter: "https://twitter.com/chuba_mbeme",
      facebook: "https://facebook.com/chuba.mbeme",
      instagram: "https://instagram.com/chuba_mbeme",
    },
  },
];
  const galleryItems = [
    { id: "img1", src: im1, link: "#" },
    { id: "img2", src: im2, link: "#" },
    {
      id: "img3",
      src: im11,
      link: "https://www.facebook.com/photo/?fbid=1008907171263231&set=pcb.1008911311262817",
    },
    {
      id: "img4",
      src: im9,
      link: "https://www.facebook.com/photo?fbid=1008906924596589&set=pcb.1008911311262817",
    },
    { id: "img5", src: im3, link: "#" },
    { id: "img6", src: im4, link: "#" },
    {
      id: "img7",
      src: im15,
      link: "https://www.facebook.com/photo/?fbid=1018347490319199&set=pcb.1018354480318500",
    },
    {
      id: "img8",
      src: im12,
      link: "https://www.facebook.com/photo/?fbid=1008907471263201&set=pcb.1008911311262817",
    },
    {
      id: "img9",
      src: im10,
      link: "https://www.facebook.com/photo/?fbid=2157635560932762&set=t.100064318734366",
    },
    {
      id: "img10",
      src: im13,
      link: "https://www.facebook.com/photo/?fbid=1008908437929771&set=pcb.1008911311262817",
    },
    {
      id: "img11",
      src: im14,
      link: "https://www.facebook.com/photo/?fbid=1008909134596368&set=pcb.1008911311262817",
    },
    {
      id: "img12",
      src: im17,
      link: "https://www.facebook.com/RCCGNewSprings/photos",
    },
    {
      id: "img13",
      src: im18,
      link: "https://www.facebook.com/RCCGNewSprings/photos",
    },
    {
      id: "img14",
      src: im20,
      link: "https://www.facebook.com/photo/?fbid=1008908437929771&set=pcb.1008911311262817",
    },
    {
      id: "img15",
      src: im19,
      link: "https://www.facebook.com/photo/?fbid=1008909134596368&set=pcb.1008911311262817",
    },
  ];


  const featuresTitle = "Why Choose Us";
  const featuresTitleSmall ="NewSpring Tim412 empowers teens to grow in faith, build godly relationships, and live out their purpose in Christ with confidence and love.";
  const leadersTitle = "Our Ministry Leaders";
  const leadersTitleSmall = " Meet the dedicated individuals leading our youth ministry, committed to nurturing spiritual growth.";

  const title = "Our Various Departments";
  useEffect(() => {
    setActive("home");
    window.scrollTo({ top: 0 });

    return () => {
      window.scrollTo({ top: 0 });
    };
  }, []);

  console.log("database in Home.jsx",dataBase )


  return (
    <div>
      <Hero sections={homedata.sections} sectionType={"contact"} dataBase={dataBase} setDataBase={setDataBase} onLoad={onLoad} />
      <Journey journeyData={journeyData} />
      <Videodata videoData={videoData} />
      <Churchdetails churchCards={churchCards} />
      <Event  events={events}/>
      <Minareas ministryAreas={ministryAreas} title={title} />
      <Schedules scheduleData={scheduleData}/>
      <Features
      
        features={features}
        featuresTitle={featuresTitle}
        featuresTitleSmall={featuresTitleSmall}
      />
      <Upcommingevent eventData={eventData}/>
      <Leaders leadersTitle={leadersTitle} leadersTitleSmall={leadersTitleSmall} leaders={leaders}/>
      <Articles articles={articles} />
      {/* <Gallery galleryItems={galleryItems} /> */}
    </div>
  );
};

export default Home;
