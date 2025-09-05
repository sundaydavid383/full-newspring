import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import "./bloggrid.css";
import img1 from "../../assets/rccg44.jpg";
import img2 from "../../assets/rccg10.jpg";
import img3 from "../../assets/rccg40.jpg";
import img4 from "../../assets/rccg24.jpg";
import img5 from "../../assets/rccg25.jpg";
import img6 from "../../assets/rccg71.jpg";
import img7 from "../../assets/rccg72.jpg";
import img8 from "../../assets/rccg28.jpg";
import img9 from "../../assets/rccg73.jpg";
import img10 from "../../assets/rccg74.jpg";
import img11 from "../../assets/rccg31.jpg";
import img12 from "../../assets/rccg32.jpg";
import img13 from "../../assets/rccg33.jpg";
import img14 from "../../assets/rccg34.jpg";
import img15 from "../../assets/rccg64.jpg";
import img16 from "../../assets/rccg36.jpg";
import img17 from "../../assets/rccg37.jpg";
import img18 from "../../assets/rccg38.jpg";
import img19 from "../../assets/rccg75.jpg";
import img20 from "../../assets/rccg81.jpg";
import img21 from "../../assets/rccg41.jpg";
import img22 from "../../assets/rccg76.jpg";
import img23 from "../../assets/rccg77.jpg";
import img24 from "../../assets/rccg58.jpg";
import img25 from "../../assets/rccg78.jpg";
import img26 from "../../assets/rccg79.jpg";
import img27 from "../../assets/rccg47.jpg";
import img28 from "../../assets/rccg48.jpg";
import img29 from "../../assets/rccg49.jpg";
import img30 from "../../assets/rccg50.jpg";
import img31 from "../../assets/rccg80.jpg";
import img32 from "../../assets/rccg52.jpg";
import img33 from "../../assets/rccg53.jpg";
import img34 from "../../assets/rccg54.jpg";
import img35 from "../../assets/rccg55.jpg";
import img36 from "../../assets/rccg56.jpg";
import img37 from "../../assets/rccg57.jpg";
import img38 from "../../assets/rccg22.jpg";
import img39 from "../../assets/rccg24.jpg";
import img40 from "../../assets/rccg23.jpg";
import Hero from "../../components/hero/Hero";
const articles = [
  {
    category: "Biblical Reflections & Devotionals",
    articles: [
      {
        id: 1,
        title: "The Power of Daily Devotion",
        image: img1,
        date: "2024-02-01",
        author: "John Doe",
        text: "Spending time in daily devotion is like watering a plant...",
        quote: "Draw near to God, and He will draw near to you. - James 4:8",
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
        text: "Walking with God means learning to trust Him even in uncertainty...",
        quote: "Trust in the Lord with all your heart... - Proverbs 3:5",
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
        text: "Morning devotions are a powerful way to set the tone for the day...",
        quote:
          "This is the day that the Lord has made; let us rejoice and be glad in it. - Psalm 118:24",
        advice: [
          "Start your day with prayer and gratitude to God.",
          "Meditate on a verse each morning and carry it throughout your day.",
          "Resist the urge to check your phone before spending time with God.",
          "Use worship music to enhance your quiet time.",
        ],
      },
      {
        id: 4,
        title: "The Power of Journaling in Devotion",
        image: img4,
        date: "2024-02-15",
        author: "Sarah Johnson",
        text: "Journaling during devotions can help you process God’s Word more deeply...",
        quote: "Write the vision; make it plain on tablets. - Habakkuk 2:2",
        advice: [
          "Keep a prayer journal to document your spiritual journey.",
          "Write down answered prayers as a reminder of God's faithfulness.",
          "Take notes on Scriptures that stand out to you.",
          "Revisit past journal entries to see how God has worked in your life.",
        ],
      },
      {
        id: 5,
        title: "Transforming Your Mind with Scripture",
        image: img5,
        date: "2024-02-20",
        author: "David Williams",
        text: "Developing a habit of meditating on God’s Word daily helps to transform the mind...",
        quote: "Let the word of Christ dwell in you richly. - Colossians 3:16",
        advice: [
          "Read and reflect on a passage of Scripture before making major decisions.",
          "Use Scripture to replace negative thoughts with God’s promises.",
          "Pray over the Word and ask God for deeper understanding.",
          "Share what you learn with others to strengthen your faith community.",
        ],
      },
    ],
  },
  {
    category: "Theology & Biblical Studies",
    articles: [
      {
        id: 6,
        title: "The Power of Grace in Romans",
        image: img6,
        date: "2024-03-01",
        author: "James Peterson",
        text: "The book of Romans systematically explains the grace of God and how it is the foundation of salvation...",
        quote:
          "For by grace you have been saved through faith. - Ephesians 2:8",
        advice: [
          "Study the book of Romans to grasp the depth of grace.",
          "Differentiate between law and grace in the New Testament.",
          "Reflect on how salvation is a gift, not a reward.",
          "Pray for deeper revelation while studying the Scriptures.",
        ],
      },
      {
        id: 7,
        title: "The Kingdom of God in the Gospels",
        image: img7,
        date: "2024-03-05",
        author: "Anna Richards",
        text: "In the Gospels, Jesus provides the clearest picture of the Kingdom of God...",
        quote: "Repent, for the Kingdom of Heaven is at hand. - Matthew 4:17",
        advice: [
          "Dive into the Gospels to understand Jesus’ teachings more fully.",
          "Look for applications in Jesus’ life that challenge your own.",
          "Meditate on His parables and their relevance today.",
          "Allow the Holy Spirit to reveal the deeper meanings of Jesus’ words.",
        ],
      },
      {
        id: 8,
        title: "Relating to God Through the Psalms",
        image: img8,
        date: "2024-03-10",
        author: "Brian Stevens",
        text: "The Psalms are a beautiful expression of human emotions, from despair to praise...",
        quote: "The Lord is my shepherd; I shall not want. - Psalm 23:1",
        advice: [
          "Read a Psalm every day for encouragement.",
          "Use the Psalms to guide your prayer life.",
          "Memorize your favorite verses to remind yourself of God’s faithfulness.",
          "Seek out Psalms that speak to your current season in life.",
        ],
      },
      {
        id: 9,
        title: "Living Out the Epistles",
        image: img9,
        date: "2024-03-15",
        author: "Laura Davis",
        text: "The Epistles in the New Testament are letters written by early Christian leaders...",
        quote:
          "I can do all things through Christ who strengthens me. - Philippians 4:13",
        advice: [
          "Read one Epistle at a time and focus on the key themes.",
          "Apply the teachings of the Epistles to your daily actions.",
          "Understand the historical and cultural context of the letters.",
          "Allow the Epistles to shape your understanding of Christian living.",
        ],
      },
      {
        id: 10,
        title: "Wisdom for Living from Proverbs",
        image: img10,
        date: "2024-03-20",
        author: "David Thompson",
        text: "The book of Proverbs offers timeless wisdom for practical living...",
        quote:
          "The fear of the Lord is the beginning of wisdom. - Proverbs 1:7",
        advice: [
          "Read a chapter of Proverbs daily for practical wisdom.",
          "Meditate on key verses that speak to areas where you need guidance.",
          "Teach others the wisdom you’ve gained from Proverbs.",
          "Pray for wisdom and understanding as you study Proverbs.",
        ],
      },
    ],
  },
  {
    category: "Christian Living & Faith",
    articles: [
      {
        id: 11,
        title: "Living Out Your Faith Every Day",
        image: img11,
        date: "2024-04-01",
        author: "Lisa Green",
        text: "Living a Christian life means making daily choices that align with God's will...",
        quote: "Be doers of the word, and not hearers only. - James 1:22",
        advice: [
          "Start your day with prayer and surrender to God.",
          "Live with integrity, even when no one is watching.",
          "Find joy in serving others as Jesus did.",
          "Surround yourself with like-minded believers.",
        ],
      },
      {
        id: 12,
        title: "The Active Choice of Faith",
        image: img12,
        date: "2024-04-01",
        author: "Lisa Green",
        text: "Living a Christian life means making daily choices that align with God's will. Faith is not just a one-time decision but a continual, active choice to live according to His Word...",
        quote: "Be doers of the word, and not hearers only. - James 1:22",
        advice: [
          "Start your day with prayer and surrender to God.",
          "Live with integrity, even when no one is watching.",
          "Find joy in serving others as Jesus did.",
          "Surround yourself with like-minded believers.",
        ],
      },
      {
        id: 13,
        title: "Trusting God Through Every Trial",
        image: img13,
        date: "2024-04-05",
        author: "John Martinez",
        text: "Faith is not simply believing in God; it is trusting Him with everything. It is easy to say we believe, but true faith is tested when challenges arise...",
        quote: "For we live by faith, not by sight. - 2 Corinthians 5:7",
        advice: [
          "Trust God's timing, even when it doesn’t match your plans.",
          "Release control and allow God to lead you.",
          "Reflect on the times God has been faithful to you.",
          "Keep your faith strong by meditating on Scripture daily.",
        ],
      },
      {
        id: 14,
        title: "Stepping Out in Faith",
        image: img14,
        date: "2024-04-10",
        author: "Samantha White",
        text: "Faith in God requires us to step out of our comfort zones and trust in the unknown. It's easy to stay in the familiar, but God often calls us to take steps of faith...",
        quote:
          "Now faith is confidence in what we hope for and assurance about what we do not see. - Hebrews 11:1",
        advice: [
          "Don’t be afraid to step out of your comfort zone when God calls you.",
          "Every act of faith is a step closer to knowing God more deeply.",
          "Write down your faith journey to reflect on how God has worked in your life.",
          "Trust that God is with you, even when the path seems uncertain.",
        ],
      },
      {
        id: 15,
        title: "Faith as an Anchor in Stormy Times",
        image: img15,
        date: "2024-04-15",
        author: "Michael Brown",
        text: "Faith is an anchor for the soul, especially during turbulent times. Life is full of challenges, and it's easy to feel overwhelmed when things aren't going as we expect...",
        quote: "For we walk by faith, not by sight. - 2 Corinthians 5:7",
        advice: [
          "In moments of uncertainty, anchor yourself in God's promises.",
          "Don’t let the storms of life shake your faith in God's goodness.",
          "Look back at past times when God has been faithful to you for encouragement.",
          "Surround yourself with others who will lift you up in faith during tough times.",
        ],
      },
    ],
  },
  {
    category: "Testimonies & Personal Stories",
    articles: [
      {
        id: 16,
        title: "Finding Peace in the Midst of Depression",
        image: img16,
        date: "2024-05-01",
        author: "Robert Kelly",
        text: "I was lost in depression until I experienced the peace of God...",
        quote: "The Lord is near to the brokenhearted. - Psalm 34:18",
        advice: [
          "Share your story to encourage others.",
          "Remember that your testimony is proof of God's power.",
          "Never underestimate the impact of a personal story.",
          "Give thanks for how God has worked in your life.",
        ],
      },
      {
        id: 17,
        title: "A Journey from Darkness to Light",
        image: img17,
        date: "2024-05-01",
        author: "Robert Kelly",
        text: "I was lost in depression until I experienced the peace of God. For years, I struggled with anxiety and deep sadness, feeling as though I would never find joy again. But everything changed when I opened my heart to the presence of God...",
        quote: "The Lord is near to the brokenhearted. - Psalm 34:18",
        advice: [
          "Share your story to encourage others.",
          "Remember that your testimony is proof of God's power.",
          "Never underestimate the impact of a personal story.",
          "Give thanks for how God has worked in your life.",
        ],
      },
      {
        id: 18,
        title: "Healing from Rejection Through God’s Love",
        image: img18,
        date: "2024-05-10",
        author: "Angela Thomas",
        text: "I grew up in a broken home, and for a long time, I struggled with feelings of rejection and worthlessness. But my life changed when I encountered the love of Christ...",
        quote:
          "God is our refuge and strength, an ever-present help in trouble. - Psalm 46:1",
        advice: [
          "Trust that God's love can heal your deepest wounds.",
          "No matter your past, God has a new beginning for you.",
          "Let go of the past and embrace the new identity in Christ.",
          "Share the love you have received with others.",
        ],
      },
      {
        id: 19,
        title: "A Life Transformed by God’s Purpose",
        image: img19,
        date: "2024-05-15",
        author: "David Martin",
        text: "For many years, I lived a life of selfishness and self-centeredness, focused solely on my own desires and pleasures. But it all changed when I hit rock bottom...",
        quote:
          "I can do all things through Christ who strengthens me. - Philippians 4:13",
        advice: [
          "Don’t wait until you hit rock bottom to seek God.",
          "God can redeem every lost part of your life.",
          "Start each day by asking God how you can serve others.",
          "Trust that God has a purpose for your life, no matter how broken it seems.",
        ],
      },
      {
        id: 20,
        title: "Freedom from Addiction in Christ",
        image: img20,
        date: "2024-05-20",
        author: "Sophia Clark",
        text: "After years of struggling with addiction, I found freedom in Christ. For as long as I can remember, I had been addicted to substances, seeking fulfillment in things that never satisfied...",
        quote: "If the Son sets you free, you will be free indeed. - John 8:36",
        advice: [
          "Surrender your struggles to God and trust in His ability to set you free.",
          "Seek accountability and support from others who have walked the same path.",
          "Don’t define yourself by your addiction—define yourself by God’s love for you.",
          "Live each day in the freedom that Christ offers.",
        ],
      },
    ],
  },
  {
    category: "Marriage & Relationships",
    articles: [
      {
        id: 21,
        title: "The Lifelong Journey of Marriage",
        image: img21,
        date: "2024-06-01",
        author: "Stephanie Rogers",
        text: "Marriage is a journey of love, sacrifice, and faith. From the moment two individuals come together in holy matrimony, they begin a lifelong journey of learning and growing together. It's a commitment to love, honor, and support each other, no matter the circumstances. Throughout the ups and downs, marriage requires sacrifice. It’s not always easy, but it’s a reflection of God’s love for us. As a couple, we must intentionally choose to put God first and build a strong foundation on His Word. When we make Christ the center, He binds us together with a love that lasts through all seasons of life.",
        quote:
          "A cord of three strands is not quickly broken. - Ecclesiastes 4:12",
        advice: [
          "Pray together as a couple daily.",
          "Put your spouse’s needs above your own.",
          "Resolve conflicts with grace and forgiveness.",
          "Keep God at the center of your relationship.",
        ],
      },
      {
        id: 22,
        title: "Becoming the Right Person for Your Marriage",
        image: img22,
        date: "2024-06-05",
        author: "Michael Adams",
        text: "Marriage is not just about finding the right person, but about becoming the right person. It's about transformation, both individually and as a couple. When two people enter into marriage, they bring their hopes, dreams, flaws, and strengths with them. It’s not always easy to navigate differences, but with patience, understanding, and love, God can refine and strengthen the marriage. True intimacy in marriage comes when we learn to communicate openly, listen deeply, and serve each other humbly. God designed marriage to be a beautiful picture of His love, and when we embrace His design, our relationships are deeply blessed.",
        quote:
          "Husbands, love your wives, just as Christ loved the church. - Ephesians 5:25",
        advice: [
          "Work together as a team and support each other's dreams.",
          "Make time for regular date nights to strengthen your bond.",
          "Practice active listening and seek to understand each other.",
          "Remember that marriage is a covenant, not a contract.",
        ],
      },
      {
        id: 23,
        title: "Reflecting God’s Love Through Marriage",
        image: img23,
        date: "2024-06-10",
        author: "Rachel Matthews",
        text: "Marriage is a lifelong commitment, a covenant between two people and God. It’s about honoring each other, loving unconditionally, and growing together in Christ. One of the most powerful aspects of marriage is how it reflects God’s love for His people. Just as God is patient and merciful toward us, we must extend the same grace to our spouses. Marriage challenges us to love selflessly, forgive quickly, and walk in humility. It’s through the challenges that we truly discover the depth of our love and the strength of our commitment. With God’s help, our marriages can flourish and become a testimony of His faithfulness.",
        quote:
          "Submit to one another out of reverence for Christ. - Ephesians 5:21",
        advice: [
          "Learn to forgive and let go of past hurts.",
          "Serve your spouse as an act of love, not obligation.",
          "Communicate with kindness and respect, even in disagreement.",
          "Pray together regularly to keep God at the center.",
        ],
      },
      {
        id: 24,
        title: "The Commitment and Work of Marriage",
        image: img24,
        date: "2024-06-15",
        author: "Johnathan Scott",
        text: "Marriage is a sacred partnership, a unique bond that reflects God’s love for His people. When two individuals come together in marriage, they commit to walking through life together, facing both joy and challenges hand-in-hand. But marriage requires more than just love—it requires hard work, sacrifice, and an unshakable commitment. When conflicts arise, as they inevitably will, it’s important to approach each situation with a spirit of reconciliation and a willingness to serve one another. In a healthy marriage, both partners work together to build a relationship founded on trust, mutual respect, and Christ-centered love.",
        quote:
          "Therefore what God has joined together, let no one separate. - Mark 10:9",
        advice: [
          "Always seek to understand your spouse's feelings and perspective.",
          "Don’t let small issues become big problems—address them early.",
          "Nurture your relationship with time, communication, and care.",
          "Ask God to help you reflect His love through your marriage.",
        ],
      },
      {
        id: 25,
        title: "Building a Life Together in Marriage",
        image: img25,
        date: "2024-06-20",
        author: "Elizabeth Walker",
        text: "Marriage isn’t just about sharing a home; it’s about sharing your hearts, your dreams, and your burdens. It’s about building a life together and becoming one. Throughout life’s seasons, there will be times of joy and times of sorrow, but a strong marriage can weather it all when Christ is the foundation. Mutual respect, love, and trust are essential ingredients for a flourishing marriage. And when we choose to prioritize our spouse, choosing their well-being above our own, we reflect the selfless love of Jesus. Let your marriage be a testimony of God's grace and love, a light to those around you.",
        quote: "Let all that you do be done in love. - 1 Corinthians 16:14",
        advice: [
          "Be intentional about spending quality time together.",
          "Keep a strong emotional connection by being open and honest.",
          "Practice patience with each other and extend grace in difficult moments.",
          "Encourage your spouse and speak life into their dreams.",
        ],
      },
    ],
  },
  {
    category: "Church Growth & Leadership",
    articles: [
      {
        id: 26,
        title: "The Foundation of Church Leadership",
        image: img26,
        date: "2024-07-01",
        author: "Pastor David Brown",
        text: "A thriving church is built on strong leadership and unity. Leaders must be committed to guiding their congregation with wisdom, patience, and a heart for service. True leadership is not about power or authority but about serving others selflessly. A leader must first lead themselves, embodying the values they wish to see in others. The foundation of effective leadership in the church is rooted in a deep relationship with God, clear vision, and a genuine love for people. The role of a church leader requires sacrifice, humility, and a commitment to continual personal and spiritual growth.",
        quote: "Shepherd the flock of God among you. - 1 Peter 5:2",
        advice: [
          "Lead by example, not just by words.",
          "Encourage servant leadership in your church.",
          "Stay accountable to a spiritual mentor.",
          "Never stop growing in faith and wisdom.",
        ],
      },
      {
        id: 27,
        title: "Visionary Leadership in the Church",
        image: img27,
        date: "2024-07-05",
        author: "Pastor Sarah Lewis",
        text: "Effective leadership in the church requires an unwavering commitment to God’s calling. Leaders are called to guide, encourage, and inspire their flock to grow in their faith and serve others. Strong church leadership requires a balance of vision and practical implementation. It's about knowing the needs of your congregation and addressing them in a way that is consistent with Scripture and God's heart. Leadership isn't just about managing; it’s about empowering others to live out their calling and fostering an environment where everyone feels valued and equipped to serve.",
        quote: "Where there is no vision, the people perish. - Proverbs 29:18",
        advice: [
          "Seek God’s direction before making major decisions.",
          "Delegate responsibilities and empower others to lead.",
          "Create a culture of trust and transparency within your team.",
          "Always prioritize prayer in your leadership decisions.",
        ],
      },
      {
        id: 28,
        title: "Humility and Servant Leadership",
        image: img28,
        date: "2024-07-10",
        author: "Bishop Michael Richards",
        text: "Leadership in the church is a sacred responsibility. It’s not about titles, but about influence and the ability to guide people to Christ. Effective leaders foster unity, inspire growth, and ensure that the church remains focused on its mission. A leader must be a servant first, constantly seeking ways to support and uplift others. Humility is key in leadership, as it is through humility that a leader earns the respect of their congregation. Strong leadership must also be flexible, adapting to new challenges while remaining grounded in biblical truth and love.",
        quote:
          "Whoever wants to be great among you must be your servant. - Matthew 20:26",
        advice: [
          "Humbly serve those you lead, putting their needs before your own.",
          "Build strong relationships with your team members.",
          "Regularly seek feedback to improve your leadership style.",
          "Don’t be afraid to admit when you don’t have all the answers.",
        ],
      },
      {
        id: 29,
        title: "Casting a Vision for the Church",
        image: img29,
        date: "2024-07-15",
        author: "Pastor Jonathan Edwards",
        text: "Great leadership requires a vision that aligns with God’s will. A true leader should be able to cast a clear vision, inspire others to follow it, and stay committed to it, no matter the obstacles. But vision alone isn’t enough—effective leadership requires wisdom, patience, and a willingness to sacrifice for the good of the church. Leaders must be committed to personal growth, studying God’s Word, and maintaining an active prayer life. When leaders are spiritually strong, they can lead others with confidence, direction, and love.",
        quote: "Where there is no vision, the people perish. - Proverbs 29:18",
        advice: [
          "Regularly seek God’s guidance to stay aligned with His will.",
          "Develop the character of a servant leader.",
          "Learn to navigate challenges with grace and humility.",
          "Empower others to take on leadership roles within the church.",
        ],
      },
      {
        id: 30,
        title: "Equipping the Church for Service",
        image: img30,
        date: "2024-07-20",
        author: "Pastor Linda Gray",
        text: "Leadership is not just about overseeing a group of people, but about guiding them toward a Christ-centered life. The role of a church leader is to inspire faith, provide direction, and equip the church community to live out their purpose. It’s a position that comes with great responsibility, but also great reward. Leaders must not only manage day-to-day activities but also invest in the spiritual growth of their congregation. Effective leaders are always learning, adapting, and seeking new ways to better serve the body of Christ.",
        quote:
          "As each has received a gift, use it to serve one another. - 1 Peter 4:10",
        advice: [
          "Equip others for leadership by providing training and mentorship.",
          "Make time for personal reflection and spiritual growth.",
          "Foster a spirit of cooperation and teamwork within your leadership team.",
          "Celebrate the successes of your team and give credit where it’s due.",
        ],
      },
    ],
  },
  {
    category: "Youth & Christian Lifestyle",
    articles: [
      {
        id: 31,
        title: "Staying Rooted in Faith as a Young Christian",
        image: img31,
        date: "2024-08-01",
        author: "Jessica Lee",
        text: "Young believers face unique challenges, but God’s Word remains their foundation. As a young Christian, it's important to be rooted in Scripture and to surround yourself with others who will encourage your faith. The world offers many distractions and temptations, but with God’s guidance, you can navigate these challenges and stay focused on His calling. Youth is a time to explore, grow, and deepen your relationship with Christ. Embrace this season with purpose, knowing that God has a plan for you. Remember, your voice matters, and you can make a difference for His kingdom, no matter your age.",
        quote: "Let no one despise your youth. - 1 Timothy 4:12",
        advice: [
          "Surround yourself with godly friends.",
          "Use social media wisely and responsibly.",
          "Find a mentor who can guide you spiritually.",
          "Stay bold in your faith, even when it’s unpopular.",
        ],
      },
      {
        id: 32,
        title: "Pursuing the Right Things as a Christian Youth",
        image: img32,
        date: "2024-08-05",
        author: "Daniel Wilson",
        text: "Being a Christian youth is about more than just avoiding the wrong things—it's about pursuing the right things. As young people, you are in a unique position to influence the world around you, whether in your school, community, or on social media. Embrace the call to be salt and light in a world that often doesn't understand or appreciate your faith. The challenges you face now are opportunities for growth and for witnessing to others. Trust in God’s plan for your life, knowing that He has equipped you to handle every obstacle with His strength.",
        quote:
          "Do not let anyone look down on you because you are young. - 1 Timothy 4:12",
        advice: [
          "Remember that God is always with you, even in difficult moments.",
          "Stand firm in your beliefs, even if your peers don’t understand.",
          "Invest time in personal Bible study and prayer.",
          "Be intentional about the friendships you cultivate.",
        ],
      },
      {
        id: 33,
        title: "Living Out Your Identity in Christ",
        image: img33,
        date: "2024-08-10",
        author: "Megan Foster",
        text: "The teenage years are a crucial time in shaping who you will become. It’s easy to be swept away by peer pressure and societal expectations, but as a young believer, your identity is rooted in Christ. Don’t let anyone or anything define who you are except God. He has given you purpose, and He desires for you to live a life that reflects His love and grace. In the midst of trials and temptations, remember that you are not alone—God is always there to guide you. Embrace your uniqueness, and let your faith shine brightly in every area of your life.",
        quote:
          "I can do all things through Christ who strengthens me. - Philippians 4:13",
        advice: [
          "Spend time in God’s Word to strengthen your faith.",
          "Don’t be afraid to stand out for Christ, even if it’s difficult.",
          "Develop a strong prayer life to seek God’s will for your life.",
          "Serve others and make a difference in your community.",
        ],
      },
      {
        id: 34,
        title: "Standing Out in a World That Pressures You to Fit In",
        image: img34,
        date: "2024-08-15",
        author: "Ethan Clark",
        text: "The pressure to fit in can be overwhelming for many young people, but as a Christian, you're called to stand out in the world. Your faith isn’t just about attending church; it’s about living out the values of Christ every day. Whether you're at school, on the sports field, or hanging out with friends, always remember that you represent Christ. Your life should be a reflection of His love, mercy, and truth. Don't let the fear of being judged or excluded stop you from following Christ wholeheartedly. Your commitment to Him can be a powerful testimony to those around you.",
        quote: "You are the light of the world. - Matthew 5:14",
        advice: [
          "Let your actions speak louder than your words.",
          "Be mindful of your choices and their impact on your testimony.",
          "Find a support group of like-minded believers to grow together.",
          "Embrace your identity in Christ, no matter what others think.",
        ],
      },
      {
        id: 35,
        title: "Growing Through Faith's Challenges",
        image: img35,
        date: "2024-08-20",
        author: "Sarah Adams",
        text: "As a young believer, it's important to recognize that your faith journey is a process. You won’t always have all the answers, and you’ll face moments of doubt and uncertainty. But that’s where faith comes in—trusting that God is leading you, even when you don’t understand everything. The key is to stay committed to growing in your relationship with God, even when things get tough. Your faith will be tested, but each challenge you face is an opportunity to build a stronger foundation in Christ. Continue to seek His will for your life, and He will guide you every step of the way.",
        quote:
          "Trust in the Lord with all your heart, and lean not on your own understanding. - Proverbs 3:5",
        advice: [
          "Embrace the journey of growing in your faith, even when it's difficult.",
          "Stay connected to a community of believers who will encourage you.",
          "Take time to reflect on God’s faithfulness in your life.",
          "Don’t be afraid to ask tough questions about your faith.",
        ],
      },
    ],
  },
  {
    category: "Christian Apologetics",
    articles: [
      {
        id: 36,
        title: "Defending the Faith with Love and Knowledge",
        image: img36,
        date: "2024-09-01",
        author: "Dr. Mark Johnson",
        text: "Defending the faith requires knowledge, wisdom, and patience. It's not about winning arguments, but about sharing the truth in love. As Christians, we are called to give a reason for the hope we have in Christ, and this requires a deep understanding of Scripture and the ability to communicate it effectively. Apologetics is not just for theologians or pastors—it's for every believer who desires to stand firm in their faith and engage the world with the message of the Gospel. With humility and grace, we can answer objections to Christianity and point others to the hope found in Christ alone.",
        quote: "Always be prepared to give an answer... - 1 Peter 3:15",
        advice: [
          "Study Scripture deeply to know your faith well.",
          "Learn about common objections and how to respond.",
          "Engage in respectful discussions, not arguments.",
          "Live in a way that reflects the truth of the Gospel.",
        ],
      },
      {
        id: 37,
        title: "Equipping Yourself to Respond to Faith Challenges",
        image: img37,
        date: "2024-09-05",
        author: "Dr. Sarah Mitchell",
        text: "In a world that increasingly questions the validity of Christianity, apologetics is a vital tool for defending the truth of God's Word. As believers, we must be equipped to respond to challenges to our faith in a way that honors God and respects others. Apologetics helps us understand not only what we believe but why we believe it. It's about offering evidence for the hope we have and addressing doubts with grace. It’s not a matter of proving God exists but of showing the logical coherence and beauty of the Christian worldview.",
        quote:
          "The Lord gives wisdom; from His mouth come knowledge and understanding. - Proverbs 2:6",
        advice: [
          "Start by studying the basics of apologetics to strengthen your foundation.",
          "Read books by reputable apologists to deepen your understanding.",
          "Focus on building relationships before engaging in tough debates.",
          "Remember that humility and love are key when discussing faith.",
        ],
      },
      {
        id: 38,
        title: "Engaging Skeptics with Truth and Respect",
        image: img38,
        date: "2024-09-10",
        author: "Dr. James Turner",
        text: "The importance of apologetics cannot be overstated in today’s world. With rising skepticism and a culture that challenges traditional values, we need to be prepared to defend the Christian faith with knowledge, clarity, and respect. Apologetics is not about arguing with people but engaging them in thoughtful conversations that lead to truth. It helps us demonstrate that faith and reason are not in conflict. Christians have the resources to provide compelling answers to life's most difficult questions, and apologetics equips us to do just that.",
        quote:
          "Sanctify Christ as Lord in your hearts, always being ready to make a defense. - 1 Peter 3:15",
        advice: [
          "Understand the philosophical foundations of Christianity.",
          "Engage with contemporary issues through a Biblical worldview.",
          "Be patient and listen to the concerns of others before offering an answer.",
          "Use apologetics as a tool to point others to Jesus, not just to win arguments.",
        ],
      },
      {
        id: 39,
        title: "Presenting Christianity as Rational and Transformative",
        image: img39,
        date: "2024-09-15",
        author: "Dr. Emily Roberts",
        text: "Christian apologetics is more than just a defense of doctrine; it’s a means of reaching the hearts of those who may never have encountered the gospel in a meaningful way. Many people’s objections to Christianity are rooted in misunderstandings or misconceptions about the faith. Apologists help break down these barriers by presenting evidence, addressing emotional and intellectual doubts, and offering a vision of the Christian faith that is both rational and transformative. In a society that increasingly values secularism and relativism, apologetics offers a way to bring the eternal truth of the gospel into a conversation.",
        quote:
          "You will know the truth, and the truth will set you free. - John 8:32",
        advice: [
          "Familiarize yourself with the major worldviews and philosophies that challenge Christianity.",
          "Always approach apologetics with love and compassion.",
          "Be confident in your faith, but also open to learning from others.",
          "Remember that the goal is to point people to Christ, not to prove them wrong.",
        ],
      },
      {
        id: 40,
        title: "Responding Thoughtfully to Life's Hard Questions",
        image: img40,
        date: "2024-09-20",
        author: "Dr. David Harris",
        text: "Christian apologetics provides a reasoned defense for the truth claims of Christianity. It’s an essential tool for addressing the doubts and questions that arise in both the believer and the skeptic. The beauty of apologetics lies in its ability to show that faith is not irrational but is grounded in truth and reason. As Christians, we don’t have to hide from the hard questions about life, faith, and suffering. Apologetics allows us to answer these questions thoughtfully and with integrity, presenting a well-rounded and intellectually satisfying view of Christianity.",
        quote:
          "For the word of the Lord is right and true; He is faithful in all He does. - Psalm 33:4",
        advice: [
          "Take time to develop a biblical worldview to answer tough questions.",
          "Stay humble in your approach, knowing you don’t have all the answers.",
          "Embrace the journey of learning and growing in knowledge of Scripture.",
          "Use apologetics as an opportunity to glorify God and share His truth.",
        ],
      },
    ],
  },
];
const sectionType = "";
  const buttonType = "raedArticle"
  const sections = [
    {
      id: 28,
      title: "Trusting God in Every Season",
      paragraphs: [
        "No matter the season of life—joy or sorrow—God remains faithful and present.",
        "Trusting God means relying on His promises even when circumstances don’t make sense.",
        "Learn how surrendering each season to God builds unshakable confidence in His plan.",
      ],
    },
    {
      id: 29,
      title: "Growing Together in Christ",
      paragraphs: [
        "Walking with others in faith strengthens our relationship with Christ.",
        "Through shared experiences and prayer, we grow in unity and love.",
        "Discover how deep connections in Christ-centered communities lead to spiritual maturity.",
      ],
    },
    {
      id: 30,
      title: "Living Out the Gospel Daily",
      paragraphs: [
        "The gospel isn't just a message—it's a way of life filled with purpose and grace.",
        "Each act of kindness and truth we live out reflects Christ to the world.",
        "Explore how your everyday choices can mirror the love and truth of the gospel.",
      ],
    },
    {
      id: 27,
      title: "Serving with a Christlike Heart",
      paragraphs: [
        "True service flows from a heart that mirrors Jesus’ compassion and humility.",
        "Serving others draws us closer to God and reveals His love in action.",
        "Uncover how a lifestyle of service reflects God’s character and transforms lives.",
      ],
    },
  ];
const BlogGrid = ({ scrollTop, setActive }) => {
  const {categoryIndex} = useParams()
  // const currentCategory = articles[categoryIndex]

  useEffect(() => {
  setActive("blog");
  }, [])
  
  
  return (
    <div className="Bloggrid">
      <Hero sections={sections} sectionType={sectionType} buttonType={buttonType}/>
      <div className="bloggrid_container ">
        {articles.map((category, index) =>
        categoryIndex == index &&
          (
            <div key={index} id={index} className="category_holder ">
              <h2 className="title">{category.category}</h2>
              <div className="category container_flex_around">
                {category.articles.map((blog, blogIdx) => (
                  <div key={blogIdx} className="blog">
                    <div className="blog_image">
                    <img src={blog.image} alt="" />
                    </div>
                    
  
                    <div className="blog_data">
                      <p>{blog.author}</p> <small></small>{" "}
                      <span>{blog.date}</span>
                    </div>
                    <h2 className="blog_title"><small>{blog.id}.</small>  {blog.title}</h2>
                    <p className="blog_text">{blog.text.slice(0, 250)}...</p>
                    <Link onClick={scrollTop} to={`/readblog/${blog.id}`}  className="btn">
                      <p>Read now</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )
         )}
      </div>
    </div>
  );
};

export default BlogGrid;
