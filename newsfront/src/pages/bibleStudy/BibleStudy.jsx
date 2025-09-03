import React from "react";
import img1 from "../../assets/rccg14.jpg"
import img2 from "../../assets/rccg13.jpg"
import img3 from "../../assets/rccg15.jpg"
import img4 from "../../assets/rccg17.jpg"
import img5 from "../../assets/rccg18.jpg"
import Hero from "../../components/hero/Hero";
import { Link } from "react-router";
import BibleTopics from "../../components/bibleTopics/BibleTopics";
import Multimedia from "../../components/multimedia/Multimedia";
import Video from "../../components/video/Video";
import DiscussionQuestion from "../../components/discussionQuestion/DiscussionQuestion";
import Resourcerec from "../../components/resourcerec/Resourcerec";
const BibleStudy = () => {
  const sectionType = "contact";
  const sections = [
    {
      id: 21,
      title: "Worship with Christ",
      paragraphs: [
        "Experience uplifting worship, inspiring messages, and a warm, welcoming community at RCCG NewSpring Youth. Our services are designed to help you grow spiritually and connect with others in faith.",
        "Whether you're new to church or looking for a vibrant community to call home, our doors are open to everyone.",
        "Join us this week to experience God’s presence and discover the joy of fellowship. every tuesday 06:00pm- 07:00pm",
      ],
    },
    {
      id: 22,
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
      id: 23,
      title: "Come in Expectance",
      paragraphs: [
        "At RCCG NewSpring Youth, you can expect an engaging worship experience with contemporary music and a practical, Bible-based message.",
        "We have a welcoming environment where people of all backgrounds can feel comfortable exploring their faith.  every tuesday 06:00pm- 07:00pm",
        "Our youth programs are interactive and focus on spiritual growth, mentorship, and leadership development. We aim to inspire and equip you for life’s journey.",
      ],
    },
    {
      id: 9,
      title: "Bible Study",
      paragraphs: [
        "Deepen your understanding of God's Word by joining our interactive Bible Study sessions. These gatherings provide an opportunity to explore the scriptures in depth and apply their teachings to our daily lives.",
        "Our Bible Study is held every Wednesday evening from 6:00 PM to 7:30 PM at RCCG NewSpring Parish, located at 332, Capital Building, Idiroko Bus Stop, Maryland, Lagos, Nigeria.",
        "All are welcome, regardless of your level of familiarity with the Bible. Come with a heart open to learning and growing in faith.  every tuesday 06:00pm- 07:00pm",
      ],
    },
  ];
  const bibleStudyTopics = [
    {
      id: 1,
      title: "Identity in Christ",
      description: "Exploring self-worth and purpose through understanding one's identity as defined by biblical teachings.",
      keyVerse: "Psalm 139:13-14",
      reference: "https://churchleaders.com/youth/498575-15-bible-study-topics.html",
      icon: "fa-solid fa-user-circle" // Represents personal identity
    },
    {
      id: 2,
      title: "Dealing with Temptation",
      description: "Addressing common challenges and providing biblical strategies to overcome them.",
      keyVerse: "1 Corinthians 10:12-13",
      reference: "https://www.whatchristianswanttoknow.com/bible-study-for-youth-10-suggested-topics/",
      icon: "fa-solid fa-bolt" // Symbolizes temptation or sudden challenges
    },
    {
      id: 3,
      title: "Faith and Science",
      description: "Discussing the relationship between scientific discovery and belief in God, emphasizing that they are not mutually exclusive.",
      keyVerse: "Psalm 19:1",
      reference: "https://churchleaders.com/youth/498575-15-bible-study-topics.html",
      icon: "fa-solid fa-flask" // Represents science and discovery
    },
    {
      id: 4,
      title: "Peer Pressure and Decision Making",
      description: "Equipping youth with biblical principles to make wise choices amidst external influences.",
      keyVerse: "Proverbs 13:20",
      reference: "https://www.minibiblelessons.com/teen-topics/",
      icon: "fa-solid fa-users" // Symbolizes peer groups and social influence
    },
    {
      id: 5,
      title: "Purpose and Calling",
      description: "Helping youth discover their God-given purpose and how to pursue it in their daily lives.",
      keyVerse: "Jeremiah 29:11",
      reference: "https://www.minibiblelessons.com/teen-topics/",
      icon: "fa-solid fa-bullseye" // Represents purpose and direction
    }
  ];
  const multimediaResources = [
    {
      id: 1,
      image:img1,
      vidResource: "https://www.youtube.com/embed/VA7H6sti8Fo" ,
      seeVideo: false,
      title: "Identity in Christ",
      description: "Exploring self-worth and purpose through understanding one's identity as defined by biblical teachings.",
      video: {
        title: "Who Am I? Discovering Your Identity in Christ",
        url: "https://www.youtube.com/watch?v=klkEKMTe3OY",
      },
     // icon: "fa-solid fa-user-circle", // Represents personal identity
    },
    {
      id: 2,
      image:img2,
      vidResource: "https://www.youtube.com/embed/tcDLgG5HiDQ",
      seeVideo: false,
      title: "Dealing with Temptation",
      description: "Addressing common challenges and providing biblical strategies to overcome them.",
      video: {
        title: "Overcoming Temptation: Biblical Strategies",
        url: "https://www.youtube.com/watch?v=tcDLgG5HiDQ",
      },
      //icon: "fa-solid fa-bolt", // Symbolizes sudden challenges
    },
    {
      id: 3,
      image:img3,
      vidResource:"https://www.youtube.com/embed/W8XmXSMxXHQ",
      seeVideo: false,
      title: "Faith and Science",
      description: "Discussing the relationship between scientific discovery and belief in God, emphasizing that they are not mutually exclusive.",
      video: {
        title: "Faith and Science: Bridging the Gap",
        url: "https://www.youtube.com/watch?v=Bpwd-XyJFhU",
      },
     // icon: "fa-solid fa-flask", // Represents science and discovery
    },
    {
      id: 4,
      image:img4,
      vidResource: "https://www.youtube.com/embed/YToPP7g91FU",
      seeVideo: false,
      title: "Peer Pressure and Decision Making",
      description: "Equipping youth with biblical principles to make wise choices amidst external influences.",
      video: {
        title: "Making Wise Decisions Amidst Peer Pressure",
        url: "https://www.youtube.com/watch?v=1wa42rT4JhQ",
      },
      //icon: "fa-solid fa-users", // Symbolizes peer groups
    },
    {
      id: 5,
      image:img5,
      vidResource: "https://www.youtube.com/embed/07-UkIZSwws",
      seeVideo: false,
      title: "Purpose and Calling",
      description: "Helping youth discover their God-given purpose and how to pursue it in their daily lives.",
      video: {
        title: "Discovering Your Purpose and Calling",
        url: "https://www.youtube.com/watch?v=lZ-DJerNLTk",
      },
      //icon: "fa-solid fa-bullseye", // Represents purpose and direction
    },
  ];
  const discussionQuestions = [
    {
      topic: "Identity in Christ",
      icon: "fa-solid fa-user", // Represents personal identity
      questions: [
        "How does understanding your identity in Christ influence your daily decisions and interactions?",
        "In what ways can embracing your God-given identity impact your self-esteem and purpose?",
        "Reflect on a time when recognizing your identity in Christ helped you overcome a personal challenge."
      ]
    },
    {
      topic: "Dealing with Temptation",
      icon: "fa-solid fa-hand-holding-heart", // Symbolizes support and guidance
      questions: [
        "What are common temptations you face, and how can biblical teachings guide you in resisting them?",
        "How can accountability and community support strengthen your ability to overcome temptation?",
        "Share a personal experience where applying a biblical principle helped you deal with temptation."
      ]
    },
    {
      topic: "Faith and Science",
      icon: "fa-solid fa-atom", // Represents the intersection of faith and science
      questions: [
        "How do you perceive the relationship between faith and scientific understanding?",
        "Can you identify instances where scientific discoveries have enhanced your appreciation of God's creation?",
        "Discuss how you reconcile conflicts between scientific theories and your faith beliefs."
      ]
    },
    {
      topic: "Peer Pressure and Decision Making",
      icon: "fa-solid fa-users", // Symbolizes peer groups
      questions: [
        "How has peer pressure influenced your choices, and what strategies can help you make decisions aligned with your faith?",
        "In what ways can you assert your beliefs when they differ from those of your peers?",
        "Reflect on a situation where standing firm in your faith positively impacted your relationships."
      ]
    },
    {
      topic: "Purpose and Calling",
      icon: "fa-solid fa-bullseye", // Represents purpose and direction
      questions: [
        "What steps can you take to discover and pursue your God-given purpose?",
        "How does understanding your calling shape your goals and aspirations?",
        "Share an experience where you felt guided towards a particular path or decision by your faith."
      ]
    }
  ];
  const resourceRecommendations = [
    {
      title: "Bible Study Tools",
      link: "https://www.biblestudytools.com/",
      icon: "fa-solid fa-book" // Represents study and reading
    },
    {
      title: "Blue Letter Bible",
      link: "https://www.blueletterbible.org/",
      icon: "fa-solid fa-book-open" // Symbolizes an open Bible
    },
    {
      title: "Bible Hub",
      link: "https://www.biblehub.com/",
      icon: "fa-solid fa-globe" // Indicates a global resource hub
    },
    {
      title: "StudyLight.org",
      link: "https://www.studylight.org/",
      icon: "fa-solid fa-lightbulb" // Represents enlightenment and understanding
    },
    {
      title: "BibleProject",
      link: "https://bibleproject.com/",
      icon: "fa-solid fa-video" // Denotes video content
    }
  ]
  const multiMediaTitle = "Multimedia Resources"
    const multiMediaSmallTitle = "something that the youth of this generation need to know abouit in the current days of trial"
  const title = "Bible Study Topics"
  const smalltitle = "something that the youth of this generation need to know abouit in the current days of trial"
  const discussionQuestionTitle = "Food For Tought"
  const discussionQuestionSmallTitle = "Engaging Questions to Deepen Your Understanding and Foster Meaningful Discussions";

  return (
    <div className="bibleStudy">
      <Link to="/">
        <i title="Go Back" className="fa-solid fa-backward"></i>
      </Link>
      <Hero sections={sections} sectionType={sectionType} />
      <BibleTopics title={title} smalltitle={smalltitle} topics={bibleStudyTopics}/>
      <Multimedia title={multiMediaTitle} smalltitle={multiMediaSmallTitle} multimediaResources={multimediaResources}/>
      <DiscussionQuestion title={discussionQuestionTitle} smalltitle={discussionQuestionSmallTitle} topics={discussionQuestions} />
      <Resourcerec resourceRecommendations={resourceRecommendations}/>
    </div>
  );
};

export default BibleStudy;
