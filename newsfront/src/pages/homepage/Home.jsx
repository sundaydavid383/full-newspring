import { useEffect } from "react";
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
import imgi3 from "../../assets/rccg24.jpg";
import videoRccg from "../../assets/rccg46.jpg";
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

const Home = ({ setActive ,dataBase, setDataBase, onLoad}) => {
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
  const sections = [
    {
      id: 0,
      title: "Nurturing Spirit, Building <br/> Community",
      paragraphs: [
        "Empowering the next generation through faith, love, and community is essential for fostering spiritual growth.",
        "By creating a supportive environment rooted in Christian fellowship, we can nurture their faith and encourage them to become active participants in their spiritual journeys. Join us in our mission to make a positive impact in the lives of young believers.",
        "Explore a vibrant community where faith meets action, and find support in your spiritual journey. Engaging youth in evangelism strengthens their own faith.",
      ],
    },
    {
      id: 1,
      title: "Empowering Youth <br/>Through Faith",
      paragraphs: [
        "Guiding young minds towards spiritual enlightenment through mentorship and community engagement.",
        "Our programs focus on building strong foundations in faith, encouraging personal growth, and fostering a sense of belonging within the community.",
        "Join us in nurturing the leaders of tomorrow by providing them with the tools and support they need to thrive spiritually and socially.",
      ],
    },
    {
      id: 2,
      title: "Building Strong <br/> Foundations",
      paragraphs: [
        "Establishing a solid base for spiritual growth through education and community involvement.",
        "Our initiatives aim to provide resources and support to help individuals deepen their faith and understanding.",
        "By fostering a culture of learning and engagement, we empower individuals to live out their faith with confidence and purpose.",
      ],
    },
    {
      id: 3,
      title: "Fostering Community <br/>Engagement",
      paragraphs: [
        "Encouraging active participation in community activities to strengthen bonds and promote shared values.",
        "Through various programs and events, we create opportunities for individuals to connect, collaborate, and grow together.",
        "By building a vibrant and supportive community, we enhance the spiritual and social well-being of all members.",
      ],
    },
  ];
  const journeyData = [
    {
      title: "Our Journey of Faith and Fellowship",
      paragraphs: [
        "Welcome to our Church, a loving, faith-centered community dedicated to sharing the message of God’s love and grace. Our church has a rich history of serving our congregation and the wider community.",
        "Our Mission: It is to bring people closer to God through worship, friendship, and service. We believe in creating a nurturing environment where individuals and families can deepen their faith, grow spiritually, and find support on their spiritual journey.",
      ],
      images: [
        { src: rccg1, alt: "Journey Image 1", className: "image1" },
        { src: rccg2, alt: "Journey Image 2", className: "image2" },
      ],
      link: { href: "/about", text: "More About" },
    },
  ];
  const ministryAreas = [
    {
      img: word,
      icon: "fa-solid fa-book-bible",
      title: "Proclaiming the Word",
      description:
        "Teaching the truth of God’s Word to empower youth with the knowledge and confidence to live out their faith in all areas of life.",
      linkText: "Learn More",
    },
    {
      img: love,
      icon: "fa-solid fa-shield-heart",
      title: "Extending God’s Love",
      description:
        "Inspiring youth to reflect Christ’s love through service, kindness, and compassion, impacting the world with God’s mercy and grace.",
      linkText: "Get Involved",
    },
    {
      img: spiritual,
      icon: "fa-solid fa-hand-holding-droplet",
      title: "Nurturing Spiritual Growth",
      description:
        "Encouraging spiritual maturity by guiding youth through prayer, worship, and discipleship to strengthen their intimacy with Christ.",
      linkText: "Explore More",
    },
    {
      img: social,
      icon: "fa-solid fa-user-group",
      title: "Godly Relationships",
      description:
        "Creating an environment for youth to build strong, Christ-centered relationships, fostering community, unity, and support in faith.",
      linkText: "Join Us",
    },
  ];
  const articles = [
       {
              id: 38,
              title: "Engaging Skeptics with Truth and Respect",
              image: imgi1,
              date: "2024-09-10",
              author: "Dr. James Turner",
              quote: "Sanctify Christ as Lord in your hearts, always being ready to make a defense. - 1 Peter 3:15",
              gist1: "Apologetics equips Christians to engage with skeptics in a way that demonstrates the rationality and truth of the Christian faith. In a world filled with skepticism and challenges to traditional beliefs, it’s crucial that we are prepared to respond with clarity, respect, and knowledge. Apologetics helps us show that faith and reason are not mutually exclusive and provides answers to life's big questions. Engaging skeptics requires patience, listening, and the ability to present the Gospel in a compelling way that draws people closer to the truth.",
              gist2: "When engaging with skeptics, it’s important to approach conversations with humility and a desire to listen and understand. Apologetics is not about arguing to win but about engaging in meaningful dialogue that points to the truth of the Gospel. By understanding the worldview of those we engage with, we can offer answers that are both intellectually satisfying and compassionate. Always remember that apologetics is a tool to bring others to Christ, not just to prove them wrong.",
              advice: [
                "Understand the philosophical foundations of Christianity.",
                "Engage with contemporary issues through a Biblical worldview.",
                "Be patient and listen to the concerns of others before offering an answer.",
                "Use apologetics as a tool to point others to Jesus, not just to win arguments."
              ]
            },
            {
              id: 39,
              title: "Presenting Christianity as Rational and Transformative",
              image: imgi3,
              date: "2024-09-15",
              author: "Dr. Emily Roberts",
              quote: "You will know the truth, and the truth will set you free. - John 8:32",
              gist1: "Christian apologetics is about more than just defending doctrine—it’s about showing the world that the Christian faith is both rational and transformative. Many objections to Christianity are rooted in misunderstandings or misconceptions about the faith. Apologists work to break down these barriers by presenting evidence and addressing doubts in a way that highlights the coherence and beauty of the Christian worldview. In a secular society, apologetics provides a means of sharing the timeless truth of the Gospel with those who may not be open to traditional methods of evangelism.",
              gist2: "The goal of Christian apologetics is to present Christianity as a rational, life-changing faith. By addressing common objections and presenting logical and intellectual arguments for the truth of Christianity, apologists help people see that the Christian faith is not only true but also transformative. As Christians, we should approach apologetics with humility and compassion, always seeking to point others to Christ through our words and actions.",
              advice: [
                "Familiarize yourself with the major worldviews and philosophies that challenge Christianity.",
                "Always approach apologetics with love and compassion.",
                "Be confident in your faith, but also open to learning from others.",
                "Remember that the goal is to point people to Christ, not to prove them wrong."
              ]
            },
            {
              id: 40,
              title: "Responding Thoughtfully to Life's Hard Questions",
              image: imgi2,
              date: "2024-09-20",
              author: "Dr. David Harris",
              quote: "For the word of the Lord is right and true; He is faithful in all He does. - Psalm 33:4",
              gist1: "Apologetics is not just for defending abstract theological concepts—it’s also about answering life’s tough questions with integrity and reason. Christianity provides satisfying answers to questions about suffering, morality, and existence, and apologetics helps us articulate these answers in a way that respects both the believer and the skeptic. By understanding the heart of our faith and the logic behind it, we can respond to difficult questions thoughtfully and with confidence, pointing to the truth of God's Word.",
              gist2: "Responding to life’s hard questions requires both knowledge and humility. As Christians, we are equipped with the truth of God’s Word to respond to the doubts and challenges that arise in our own lives and in the lives of others. Apologetics allows us to engage with tough topics in a way that is intellectually satisfying and spiritually nurturing. It’s not about having all the answers, but about being willing to engage honestly and thoughtfully with the hard questions of life and faith.",
              advice: [
                "Take time to develop a biblical worldview to answer tough questions.",
                "Stay humble in your approach, knowing you don’t have all the answers.",
                "Embrace the journey of learning and growing in knowledge of Scripture.",
                "Use apologetics as an opportunity to glorify God and share His truth."
              ]
            }  
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
        title: "Life-Changing Teachings",
        description:
          "Practical, Bible-based teachings tailored to address real-life challenges faced by today’s youth, inspiring them to live purposefully.",
      },
      {
        id: 3,
        icon: "fa-solid fa-heart",
        title: "Authentic Community",
        description:
          "A welcoming space for young people to build meaningful, Christ-centered relationships that promote growth, support, and accountability.",
      },
    ],
  };
  const leaders = [
    {
      name: "Mr. Samuel Adeyemi",
      position: "Youth Pastor",
      posIcon: "fa-solid fa-book-bible",
      image: tu1,
      socials: {
        twitter: "https://twitter.com/samuel_adeyemi",
        facebook: "https://facebook.com/samuel.adeyemi",
        instagram: "https://instagram.com/samuel_adeyemi",
      },
    },
    {
      name: "Ms. Grace Oladipo",
      position: "Choir Coordinator",
      image: tu2,
      posIcon: "fa-solid fa-guitar",
      socials: {
        twitter: "https://twitter.com/grace_oladipo",
        facebook: "https://facebook.com/grace.oladipo",
        instagram: "https://instagram.com/grace_oladipo",
      },
    },
    {
      name: "Mr. David Okoro",
      position: "Prayer Band Leader",
      image: tu3,
      posIcon: "fa-solid fa-hands-praying",
      socials: {
        twitter: "https://twitter.com/david_okoro",
        facebook: "https://facebook.com/david.okoro",
        instagram: "https://instagram.com/david_okoro",
      },
    },
    {
      name: "Mrs. Esther Adebayo",
      position: "Ushering Department Head",
      image: tu4,
      posIcon: "fa-solid fa-user-tag",
      socials: {
        twitter: "https://twitter.com/esther_adebayo",
        facebook: "https://facebook.com/esther.adebayo",
        instagram: "https://instagram.com/esther_adebayo",
      },
    },
  ];
  const featuresTitle = "Why Choose Us";
  const featuresTitleSmall ="NewSpring Tim412 empowers teens to grow in faith, build godly relationships, and live out their purpose in Christ with confidence and love.";
  const leadersTitle = "Our Ministry Leaders";
  const leadersTitleSmall = " Meet the dedicated individuals leading our youth ministry, committed to nurturing spiritual growth.";

  const title = "Diverse Ministry Areas";
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
      <Hero sections={sections} dataBase={dataBase} setDataBase={setDataBase} onLoad={onLoad} />
      <Journey journeyData={journeyData} />
      <Videodata videoData={videoData} />
      <Churchdetails />
      <Event />
      <Minareas ministryAreas={ministryAreas} title={title} />
      <Schedules />
      <Features
      
        features={features}
        featuresTitle={featuresTitle}
        featuresTitleSmall={featuresTitleSmall}
      />
      <Upcommingevent />
      <Leaders leadersTitle={leadersTitle} leadersTitleSmall={leadersTitleSmall} leaders={leaders}/>
      <Articles articles={articles} />
      <Gallery galleryItems={galleryItems} />
    </div>
  );
};

export default Home;
