const path = require("path");
const fs = require("fs");
// Helper function to read image as Base64
function getBase64Image(imagePath) {
  try {
    const image = fs.readFileSync(imagePath);
    return `data:image/jpeg;base64,${image.toString("base64")}`;
  } catch (err) {
    console.error(`Error reading file: ${imagePath}`, err);
    return null; // Return null in case of an error
  }
}


// Updated homeContent with Base64 images
const homeContent = {
  journeyData: [
    {
      title: "Hey there! Welcome to RCCG Newspring Youth Church",
      paragraphs: [
        "We're so excited to have you with us! Whether it's your first time or you’ve been here before, know that you’re loved, seen, and valued. This is a place where young people like you grow in faith, build strong friendships, and discover God’s purpose for their lives. ",
      "You’re not just walking into a church—you’re stepping into a family that’s cheering you on every step of the way. We believe in you, we’re praying for you, and we’re ready to walk this journey of faith together. No matter where you’ve been or what you’re facing, there’s a place for you here—a place to belong, to grow, and to thrive."],
      images: [
        {
          src: getBase64Image(path.join(__dirname, "..", "assets", "rccg5.jpg")),
          alt: "Journey Image 1",
          className: "image1",
        },
        {
          src: getBase64Image(path.join(__dirname, "..", "assets", "rccg2.jpg")),
          alt: "Journey Image 2",
          className: "image2",
        },
      ],
      link: { href: "/about", text: "More About" },
    },
  ],
  sections: [
    {
      id: 0,
      title: "Youth and Young Adults of RCCG Newsprings",
      paragraphs: [
        "RCCG Newspring Youth Church is a vibrant, Christ-centered ministry. We are the youth arm of RCCG Newsprings, located in Lagos, Nigeria.",
        "Our passion is to help young people grow closer to God and boldly live out their faith.",
        "We invite you to join us as we nurture the next generation of leaders in faith and purpose.",
      ],
    },
    {
      id: 1,
      title: "What We Do",
      paragraphs: [
        "Through Inspiring Praise and Worship sessions, Engaging Sermons, and Community Engagement, we empower our youth to live out their faith in real, impactful ways.",
        "Our services are designed to build strong spiritual foundations for young adults and navigate various struggles of life as a Christian youth.",
        "By fostering a spirit of unity and purpose, we encourage the youth to actively participate in community building and spiritual growth.",
      ],
    },
    {
      id: 2,
      title: "Community and Growth",
      paragraphs: [
        "At RCCG Newspring Youth Church, you’ll find mentorship, friendship, and a place to belong. We focus on helping you grow—not just spiritually, but socially, mentally, emotionally, and all-round too.",
        "Together, we’re raising strong, God-filled leaders for tomorrow.",
        "We provide a platform for young people to lead and serve in various capacities, equipping them to make a positive impact in their communities.",
      ],
    },
    {
      id: 3,
      title: "Making a Difference",
      paragraphs: [
        "At RCCG Newspring Youth Church, we believe that faith isn’t just something we keep to ourselves—it’s something we live out.",
        "Through outreach, acts of kindness, and serving our community, we show God’s love in real and practical ways.",
        "And we hope you can be a part of this vision to make a tangible impact in the lives of others through acts of service and compassion.",
      ],
    },
  ],
};

  module.exports = homeContent
  
