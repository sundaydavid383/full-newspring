import { useEffect } from 'react'
import img50 from "../../assets/rccg50.jpg";
import img51 from "../../assets/rccg62.jpg";
import img52 from "../../assets/rccg52.jpg";
import img53 from "../../assets/rccg53.jpg";
import img54 from "../../assets/rccg54.jpg";
import img55 from "../../assets/rccg55.jpg";
import img56 from "../../assets/rccg56.jpg";
import img57 from "../../assets/rccg57.jpg";
import img58 from "../../assets/rccg58.jpg";
import img59 from "../../assets/rccg59.jpg";
import img60 from "../../assets/rccg60.jpg";
import img61 from "../../assets/rccg61.jpg";
import img62 from "../../assets/rccg68.jpg";
import img63 from "../../assets/rccg70.jpg";
import img64 from "../../assets/rccg69.jpg";
//import img65 from "../../assets/rccg51.jpg";
// import img66 from "../../assets/rccg66.jpg";
// import img67 from "../../assets/rccg67.jpg";
// import img68 from "../../assets/rccg65.jpg";
// import img69 from "../../assets/rccg64.jpg";
 import rccg5 from "../../assets/rccg45.jpg";
import rccg1 from "../../assets/rccg55.jpg"
import rccg2 from "../../assets/rccg62.jpg"
import rccg3 from "../../assets/rccg14.jpg"
import rccg4 from "../../assets/rccg12.jpg"
import discipleship from "../../assets/rccg9.jpg"
import outreach from "../../assets/rccg47.jpg"
import worship from "../../assets/rccg49.jpg"
import fellowship from "../../assets/rccg48.jpg"
import img1 from "../../assets/rccg44.jpg"
import img2 from "../../assets/rccg10.jpg"
import img3 from "../../assets/rccg40.jpg"
import Hero from '../../components/hero/Hero'
import Journey from '../../components/journey/Journey';
import Minareas from '../../components/minareas/Minareas'
import Articles from "../../components/articles/Articles"
import Gallery from '../../components/gallery/Gallery'


const About = ({setActive, setDataBase, ministryAreas}) => {
      useEffect(() => {
        window.scrollTo({top:0})
      
        return () => {
          window.scrollTo({top:0})
        }
      }, [])
       const sectionType = ""
const sections = [
  {
    id: 4,
    title: "Who We Are",
    paragraphs: [
      "TIM412 is a vibrant family helping teens grow in faith, love, and God’s Word.",
      "Through worship, fellowship, and programs, we guide them to know Christ and live boldly.",
      "Here, lives are transformed, friendships built, and faith strengthened."
    ],
  },
  {
    id: 6,
    title: "Our Mission and Vision",
    paragraphs: [
      "Our mission is to lead teens into a deeper walk with Christ through teaching, service, and friendships.",
      "We envision Christ-centered youths who influence their world with love and integrity.",
      "Together, we nurture spiritual, emotional, and social growth for God’s Kingdom."
    ],
  },
  {
    id: 7,
    title: "What We Do",
    paragraphs: [
      "We host worship, Bible studies, and programs that stir passion for God.",
      "Through outreach and mentorship, teens reflect Christ’s love and impact lives.",
      "We help them discover talents, serve others, and grow as leaders in faith."
    ],
  },
  {
    id: 8,
    title: "Join the Journey",
    paragraphs: [
      "Whether you’re a teen seeking God or a parent looking for support, TIM412 welcomes you.",
      "Every teen can grow in faith, discover purpose, and live the Gospel with confidence.",
      "Join us in raising Christ-centered leaders to impact the world for His glory."
    ],
  },
];

const journeyData = [
  {
    title: "Our Journey of Faith",
    paragraphs: [
      "Welcome to TIM412, a faith-driven family inspiring teens to live boldly for Christ.",
      "We guide youth through worship, teaching, and service, building strong foundations in Christ.",
      "Together we raise leaders who reflect God’s love and transform their world."
    ],
    images: [{ src: rccg1, alt: "Teens Ministry Gathering", className: "image3" }],
  },
];

const ministerTeaching = [
  {
    id: "minister teaching",
    title: "Equipping Youth for Christ",
    seniorPastor: "breakthrough nathaniel",
    paragraphs: [
      "Our teaching equips youth with truth and wisdom to live for Christ today.",
      "We raise a generation bold in speech, conduct, love, faith, and purity.",
      "Bible studies, mentorship, and workshops create space for growth and impact."
    ],
    images: [{ src: rccg5, alt: "Youth Engaged in Learning at TIM412", className: "image4" }],
  },
];

const aboutBreakData = [
  {
    title: "Our Mission: Transforming Lives",
    paragraphs: [
      "We empower teens to live with purpose in Christ’s love.",
      "We nurture growth and God-given potential through discipleship and fellowship.",
      "Together we ignite passion and raise agents of change."
    ],
    images: { src: rccg4, alt: "Teens Engaging in Fellowship", className: "image3" },
  },
  {
    title: "Our Vision: Shaping Leaders",
    paragraphs: [
      "We envision Christ-centered leaders making lasting impact worldwide.",
      "We equip teens with wisdom, faith, and integrity to shine for Christ.",
      "Our vision is a generation transforming lives with His love."
    ],
    images: { src: rccg2, alt: "Worship Session with Teens", className: "image3" },
  },
  {
    title: "Our Approach: Love, Faith, Service",
    paragraphs: [
      "We build on love, faith, and service in a supportive family.",
      "Through worship and ministry opportunities, teens grow and belong.",
      "We equip them to live and lead in Christ with confidence."
    ],
    images: { src: rccg3, alt: "Group of Teens Participating in Outreach", className: "image3" },
  },
];

      const articles = [
          {
            id: 1,
            title: "The Power of Daily Devotion",
            image: img1,
            date: "2024-02-01",
            author: "John Doe",
            gist1:
              "Spending time in daily devotion is an essential practice for every believer. Just as we nourish our bodies with food every day, our souls require spiritual nourishment through prayer, Bible reading, and meditation on God's Word. It is a time to commune with God, listen to His voice, and deepen our relationship with Him. This daily practice strengthens our faith, prepares us for life's challenges, and reminds us of God's presence in our lives. In doing so, we become more grounded in His truth and better equipped to handle whatever comes our way.",
            gist2:
              "Daily devotion is not just a ritual but a relationship-building practice. It is through consistent time spent in God's Word that we learn to recognize His voice and understand His will for our lives. As we prioritize this time with God, our perspective shifts, and our hearts are aligned with His purposes. This creates a peace that transcends circumstances and an unshakeable foundation of faith. Through daily devotion, we cultivate a heart that seeks God above all else, and this devotion becomes a source of strength and guidance in every area of life.",
            quote: "Draw near to God, and He will draw near to you. - James 4:8",
            quoteAuthor: "David Foster",
            advice: [
              "Set aside a dedicated time daily for prayer and study.",
              "Keep a journal of your reflections to track your growth.",
              "Find an accountability partner for encouragement.",
              "Apply one lesson from Scripture into your daily actions.",
            ],
          },
          {
            id: 2,
            title: "Trusting God Through Uncertainty",
            image: img2,
            date: "2024-02-05",
            author: "Jane Smith",
            gist1:
              "Life is filled with uncertainty, and in these moments, we are called to trust God even when the path ahead seems unclear. Trusting God doesn’t mean that we have all the answers or that we will always understand His ways. Instead, it means placing our confidence in the fact that God is in control and working for our good. He promises that He will never leave us nor forsake us, and He will guide us through every season of life. Even in the midst of uncertainty, we can trust that His plans for us are good, and that He is faithful to complete the work He has begun in us.",
            gist2:
              "Faith grows strongest when we choose to trust God in the unknown. When we surrender our fears and uncertainties to God, we open the door for His peace to fill our hearts. We are reminded that we are not alone, and that God’s presence is with us, even in the midst of challenges. Trusting God involves taking one step at a time, even when we can’t see the whole picture. It’s about moving forward in faith, believing that He will lead us, provide for us, and protect us along the way. As we grow in this trust, we find our hearts becoming more anchored in His love and faithfulness.",
            quote: "Trust in the Lord with all your heart... - Proverbs 3:5",
            quoteAuthor: "John Thompson",
            advice: [
              "Learn to surrender your plans to God.",
              "Take small steps of faith, even when the path is unclear.",
              "Memorize Scriptures that strengthen your trust in God.",
              "Seek counsel from godly mentors when making decisions.",
            ],
          },
          {
            id: 3,
            title: "Starting Your Day with God",
            image: img3,
            date: "2024-02-10",
            author: "Michael Carter",
            gist1:
              "The way we start our day sets the tone for everything that follows. Beginning our day with God allows us to center our thoughts and priorities around His will, rather than being swept away by the busyness and distractions of life. Morning devotions provide a time to seek God’s guidance, to express gratitude, and to align our hearts with His purpose. Whether through prayer, Scripture reading, or worship, starting your day with God establishes a foundation of peace, strength, and purpose. This practice helps us maintain a God-centered perspective throughout the day and ensures that we approach every situation with His wisdom and love.",
            gist2:
              "When we start our day with God, we invite His presence into every aspect of our lives. Rather than rushing into our tasks and responsibilities with stress or anxiety, we can approach the day with a calm and focused heart, knowing that God is with us every step of the way. Morning devotions give us the opportunity to reflect on God's faithfulness and to seek His guidance for the challenges ahead. This practice doesn’t just change our outlook on the day, it transforms our hearts, filling us with His peace and renewing our spirits for the work He has prepared for us. It’s a powerful way to begin each day grounded in His truth and love.",
            quote:
              "This is the day that the Lord has made; let us rejoice and be glad in it. - Psalm 118:24",
            quoteAuthor: "Sara Mitchell",
            advice: [
              "Start your day with prayer and gratitude to God.",
              "Meditate on a verse each morning and carry it throughout your day.",
              "Resist the urge to check your phone before spending time with God.",
              "Use worship music to enhance your quiet time.",
            ],
          },
      ];
        const galleryItems = [
            { id: "img50", src: img50, link: "#" },
            { id: "img51", src: img51, link: "#" },
            { id: "img52", src: img52, link: "https://www.facebook.com/photo/?fbid=1008907171263231&set=pcb.1008911311262817" },
            { id: "img53", src: img53, link: "https://www.facebook.com/photo?fbid=1008906924596589&set=pcb.1008911311262817" },
            { id: "img54", src: img54, link: "#" },
            { id: "img55", src: img55, link: "#" },
            { id: "img56", src: img56, link: "https://www.facebook.com/photo/?fbid=1018347490319199&set=pcb.1018354480318500" },
            { id: "img57", src: img57, link: "https://www.facebook.com/photo/?fbid=1008907471263201&set=pcb.1008911311262817" },
            { id: "img58", src: img58, link: "https://www.facebook.com/photo/?fbid=2157635560932762&set=t.100064318734366" },
            { id: "img59", src: img59, link: "https://www.facebook.com/photo/?fbid=1008908437929771&set=pcb.1008911311262817" },
            { id: "img60", src: img60, link: "https://www.facebook.com/photo/?fbid=1008909134596368&set=pcb.1008911311262817" },
            { id: "img61", src: img61, link: "https://www.facebook.com/RCCGNewSprings/photos" },
            { id: "img62", src: img62, link: "https://www.facebook.com/RCCGNewSprings/photos" },
            { id: "img63", src: img63, link: "https://www.facebook.com/photo/?fbid=1008908437929771&set=pcb.1008911311262817" },
            { id: "img64", src: img64, link: "https://www.facebook.com/photo/?fbid=1008909134596368&set=pcb.1008911311262817" },
 
          ];
      setActive("about")
      const title = "Our Various Departments"
     
  return (
    <>
   
        <Hero sections={sections} sectionType={sectionType} setDataBase={setDataBase}/>
        <Journey journeyData={journeyData}/>
        <Journey journeyData={aboutBreakData}/>
        <Minareas ministryAreas={ministryAreas} title={title}/>
        <Journey journeyData={ministerTeaching}/>
        <Articles articles={articles}/>
        {/* <Gallery galleryItems={galleryItems}/> */}
     
    </>
     
    
  )
}

export default About