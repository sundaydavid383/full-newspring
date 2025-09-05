import React, { useEffect, useState } from "react";
import "./readBlog.css"
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
import { Link, useParams } from "react-router";
import Hero from "../../components/hero/Hero";

const ReadBlog = ({setActive, scrollTop}) => {
  const { id } = useParams();
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
    {
      id: 4,
      title: "The Power of Journaling in Devotion",
      image: img4,
      date: "2024-02-15",
      author: "Sarah Johnson",
      gist1:
        "Journaling is an incredibly powerful tool in deepening our spiritual journey. Writing down our thoughts, prayers, and insights from Scripture allows us to reflect more deeply on God’s Word and track our growth over time. It also gives us a place to process our emotions, struggles, and victories, making it easier to see God’s hand at work in our lives. By journaling, we create a record of God’s faithfulness, which we can look back on during times of doubt or difficulty. This practice helps us remember His promises and encourages us to keep moving forward in faith.",
      gist2:
        "When we take the time to journal our thoughts and reflections, we are engaging in a conversation with God. It becomes a space for honesty, self-examination, and gratitude. Journaling during devotionals allows us to make our relationship with God more personal and intimate. Over time, it becomes a beautiful record of how we’ve grown in our faith, how God has answered prayers, and how we’ve experienced His grace and mercy. Whether through written prayers, insights from Bible readings, or reflections on life’s challenges, journaling helps us grow closer to God and provides clarity as we reflect on His work in our lives.",
      quote: "Write the vision; make it plain on tablets. - Habakkuk 2:2",
      quoteAuthor: "Emily Parker",
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
      quote: "Let the word of Christ dwell in you richly. - Colossians 3:16",
      quoteAuthor: "Sophia Richards",
      gist1:
        "Meditating on Scripture daily renews the mind, shaping thoughts, attitudes, and decisions to align with God’s truth. As we take time to reflect on God's Word, we allow His truth to transform the way we think and live. The more we meditate on Scripture, the more it becomes part of our daily lives. It informs our decisions, shapes our attitudes, and helps us to respond to life’s challenges with a Christ-centered perspective. This process of transformation is not about changing who we are at the core but about becoming more aligned with the image of Christ through His Word.",
      gist2:
        "By immersing yourself in God’s Word, you replace negative thoughts with His promises, leading to spiritual growth and transformation. This consistent practice of meditating on Scripture helps us to overcome feelings of anxiety, doubt, or fear, as we replace them with God's truth. It strengthens our faith, renews our minds, and transforms our outlook on life. In doing so, we experience the deep, abiding peace that comes from aligning ourselves with God’s Word, and we begin to reflect His character in all we do. This transformation is a lifelong journey that leads to a deeper intimacy with God and a life that honors Him.",
      advice: [
        "Read and reflect on a passage of Scripture before making major decisions.",
        "Use Scripture to replace negative thoughts with God’s promises.",
        "Pray over the Word and ask God for deeper understanding.",
        "Share what you learn with others to strengthen your faith community.",
      ],
    },
    {
      id: 6,
      title: "The Power of Grace in Romans",
      image: img6,
      date: "2024-03-01",
      author: "James Peterson",
      quote: "For by grace you have been saved through faith. - Ephesians 2:8",
      quoteAuthor: "Paul the Apostle",
      gist1:
        "The book of Romans offers a profound exploration of God's grace, detailing how it serves as the foundation of our salvation. Romans underscores the idea that righteousness is granted through faith in Jesus Christ, rather than by adhering to the law. This revelation helps believers shift their perspective from trying to earn salvation through works to receiving it as a gracious gift from God, ensuring that salvation is accessible to all who believe, not based on merit or human effort.",
      gist2:
        "Understanding God's grace is a pivotal element in the life of a Christian. By embracing grace, believers are liberated from the burdens of legalism and performance-based faith. The teachings in Romans emphasize that salvation is a free gift from God, given through faith in Christ, which provides freedom from sin and the law. This grace is not only a means of redemption but also a call to live out a life of righteousness, relying on God's power rather than our own abilities.",
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
      quote: "Repent, for the Kingdom of Heaven is at hand. - Matthew 4:17",
      quoteAuthor: "Jesus Christ",
      gist1:
        "In the Gospels, Jesus reveals the nature of the Kingdom of God, offering a new perspective on God's reign and the way it impacts the lives of His followers. He teaches that the Kingdom is not merely a future reality but something that is already breaking into the present. Through His parables, healings, and teachings, Jesus illustrates that the Kingdom of God is characterized by love, justice, mercy, and righteousness. It is a Kingdom where the marginalized are uplifted, and the values of the world are turned upside down in favor of humility, service, and forgiveness.",
      gist2:
        "Understanding the Kingdom of God is essential for any believer who desires to align their life with the mission of Jesus. The Gospels teach that the Kingdom is both a present and future reality, a space where God’s will is done on earth as it is in heaven. As Christians, our role is to live according to the principles of this Kingdom, embodying the teachings of Jesus in our everyday lives. This means loving our enemies, practicing forgiveness, and working towards justice and peace in a world that often opposes these values.",
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
      quote: "The Lord is my shepherd; I shall not want. - Psalm 23:1",
      quoteAuthor: "King David",
      gist1:
        "The Psalms are a rich treasure trove of human emotions, offering believers a means to express everything from despair to joy, praise to lament. These poetic songs capture the depth of our relationship with God, allowing us to speak to Him in the rawness of our hearts. They offer comfort in times of distress, joy in moments of celebration, and an unshakable trust in God’s faithfulness no matter the circumstances. The Psalms invite us into a personal, intimate dialogue with our Creator, teaching us how to worship, cry out, and rejoice.",
      gist2:
        "Through the Psalms, believers learn how to approach God in every season of life. Whether in praise, fear, gratitude, or grief, the Psalms offer words that connect us to God’s presence and perspective. They provide a framework for prayer and worship, guiding us as we express our deepest emotions to God. By reflecting on the Psalms, Christians deepen their understanding of God's character and His enduring faithfulness, gaining encouragement and strength as they navigate their own spiritual journeys.",
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
      quote:
        "I can do all things through Christ who strengthens me. - Philippians 4:13",
      quoteAuthor: "Paul the Apostle",
      gist1:
        "The Epistles in the New Testament provide practical teachings on Christian living, addressing various aspects of faith, love, and conduct. Written by early Christian leaders such as Paul, Peter, and John, these letters offer guidance for how believers should live out their faith in community, in their homes, and in the world. The Epistles also provide profound theological insights into the nature of salvation, the church, and the role of the Holy Spirit in the life of the believer. By studying these letters, Christians are equipped to live lives that reflect God’s love and truth.",
      gist2:
        "To live out the teachings of the Epistles means to apply the doctrines of the New Testament in practical ways. The letters encourage believers to love one another, persevere in the face of trials, and remain steadfast in faith. They also emphasize the importance of community, unity, and support within the body of Christ. By immersing ourselves in the teachings of the Epistles, we gain insight into how to live a holy life, rooted in faith, hope, and love. The Epistles challenge us to embody the character of Christ in every area of our lives.",
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
      quote: "The fear of the Lord is the beginning of wisdom. - Proverbs 1:7",
      quoteAuthor: "King Solomon",
      gist1:
        "The book of Proverbs is a collection of timeless sayings that offer practical wisdom for daily living. Proverbs teaches that true wisdom begins with the fear of the Lord, which is a reverence and awe of God’s holiness and power. Throughout the book, Solomon shares insights on various aspects of life, such as relationships, work, speech, and personal integrity. The Proverbs offer guidance on how to make wise decisions, avoid foolishness, and live in alignment with God’s purposes. It’s a manual for living a life that is pleasing to God and beneficial to others.",
      gist2:
        "By applying the wisdom found in Proverbs, believers are equipped to navigate the complexities of life with discernment and understanding. Proverbs teaches that wisdom is more than intellectual knowledge—it is the practical application of God's truth in our daily choices. Through the teachings of Proverbs, Christians are encouraged to pursue righteousness, seek understanding, and honor God in every area of their lives. Proverbs is a guide for living a life that reflects the wisdom, justice, and love of God.",
      advice: [
        "Read a chapter of Proverbs daily for practical wisdom.",
        "Meditate on key verses that speak to areas where you need guidance.",
        "Teach others the wisdom you’ve gained from Proverbs.",
        "Pray for wisdom and understanding as you study Proverbs.",
      ],
    },
    {
      id: 11,
      title: "Living Out Your Faith Every Day",
      image: img11,
      date: "2024-04-01",
      author: "Lisa Green",
      quote: "Be doers of the word, and not hearers only. - James 1:22",
      quoteAuthor: "James the Apostle",
      gist1:
        "Living out faith every day requires believers to make intentional choices that reflect God's love, truth, and righteousness in all aspects of life. This involves maintaining personal integrity, showing compassion to others, and living a life that demonstrates the teachings of Christ. Each decision we make—whether in our relationships, work, or everyday actions—should align with God’s Word, embodying His will in tangible ways that reveal His goodness to the world around us.",
      gist2:
        "A faith-driven lifestyle is more than just belief; it's a practical, everyday demonstration of trust in God’s guidance. By living out our faith, we become a living testimony of God's grace, impacting the lives of others with His love and truth. As believers consistently walk in obedience and trust in His Word, they experience spiritual growth, deepen their relationship with God, and reflect the light of Christ in a world in need of hope.",
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
      quote: "Be doers of the word, and not hearers only. - James 1:22",
      quoteAuthor: "James the Apostle",
      gist1:
        "Faith is not a passive experience but an active commitment that requires daily surrender, trust, and obedience to God. It is more than a one-time decision—it’s a continual choice to live according to His Word, no matter the circumstances. Faith is choosing to believe and trust in God’s promises daily, allowing Him to lead and shape our lives through every challenge, moment of doubt, or opportunity for growth.",
      gist2:
        "By actively choosing faith in every situation, believers become more resilient and spiritually mature. Each decision to trust God strengthens their relationship with Him, builds character, and develops a deeper understanding of His ways. As we walk in alignment with God’s purpose, we grow in our ability to persevere through trials and experience His faithfulness in new and profound ways.",
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
      quote: "For we live by faith, not by sight. - 2 Corinthians 5:7",
      quoteAuthor: "Paul the Apostle",
      gist1:
        "True faith involves not just belief in God, but complete trust in Him, especially when trials come our way. Trusting God in the face of adversity means relying on His wisdom, knowing that He is always working for our good, even when we can't see the outcome. True faith in God involves surrendering our fear, worries, and anxieties to Him, and having confidence that He will guide us through every storm we face.",
      gist2:
        "When we lean on God during difficult times, we experience His faithfulness firsthand. Every trial offers an opportunity to deepen our reliance on God’s wisdom and timing, knowing that He is in control. Through these tests of faith, we grow stronger spiritually, developing a deeper trust in God’s sovereignty and learning to rely on His strength rather than our own.",
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
      quote:
        "Now faith is confidence in what we hope for and assurance about what we do not see. - Hebrews 11:1",
      quoteAuthor: "The Author of Hebrews",
      gist1:
        "Stepping out in faith requires embracing the unknown and trusting that God’s plans are greater than our own fears and limitations. It’s about letting go of the comfort of certainty and following God’s lead, even when the path is unclear. Faith is not about having all the answers, but about having confidence in God’s promises, knowing that He is guiding us every step of the way, even through uncertainty.",
      gist2:
        "By obeying God’s call, even in the face of uncertainty, believers experience profound personal growth, a deeper trust in God’s provision, and open doors to opportunities they never imagined possible. Stepping out in faith is about trusting in God’s character and faithfulness, knowing that He will equip us for whatever lies ahead. It’s a powerful reminder that God's plans are always higher and better than our own.",
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
      quote: "For we walk by faith, not by sight. - 2 Corinthians 5:7",
      quoteAuthor: "Paul the Apostle",
      gist1:
        "Faith serves as a stabilizing anchor in the midst of life's storms, reminding us that God remains constant and in control, even when circumstances seem chaotic. In times of uncertainty, faith helps believers stay rooted in God's promises and remain steadfast in their trust that He will never leave them nor forsake them. It provides peace amidst turmoil, knowing that our Heavenly Father is with us, guiding us through each trial.",
      gist2:
        "By anchoring our hearts in God’s promises, we gain the strength to face challenges with confidence and trust in His perfect plan. In the stormiest seasons of life, faith allows us to hold fast to God’s goodness and His faithfulness, knowing that He is with us every step of the way. Our faith becomes a source of peace and assurance, providing comfort as we weather the storms of life.",
      advice: [
        "In moments of uncertainty, anchor yourself in God's promises.",
        "Don’t let the storms of life shake your faith in God's goodness.",
        "Look back at past times when God has been faithful to you for encouragement.",
        "Surround yourself with others who will lift you up in faith during tough times.",
      ],
    },
    {
      id: 16,
      title: "Finding Peace in the Midst of Depression",
      image: img16,
      date: "2024-05-01",
      author: "Robert Kelly",
      quote: "The Lord is near to the brokenhearted. - Psalm 34:18",
      quoteAuthor: "David Martin",
      gist1:
        "God’s peace is accessible to everyone, even in the darkest moments of life. His peace brings comfort and strength to those struggling with depression, offering a sense of calm in the midst of turmoil. Through God’s peace, individuals find the strength to endure, knowing that His love never falters, even when emotional or mental pain feels overwhelming.",
      gist2:
        "By leaning into God’s promises and turning to Him in times of need, believers can find renewed hope and assurance. God’s presence remains constant, and through prayer and faith, He gently restores joy, reminding us that we are never truly alone, even in our deepest struggles.",
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
      quote: "The Lord is near to the brokenhearted. - Psalm 34:18",
      quoteAuthor: "David Martin",
      gist1:
        "Overcoming depression and anxiety can feel like an impossible task, but by opening one’s heart to the peace of God, everything changes. When we invite God into our struggles, He brings light into the darkest places of our lives, showing us that His love and peace are stronger than any of our fears or sadness.",
      gist2:
        "The process of healing from depression is not immediate, but with each step, God’s presence grows more real. Through prayer, faith, and a willingness to trust God, individuals can experience a profound transformation from sadness to joy, from darkness to light, finding the strength to carry on each day with hope.",
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
      quote:
        "God is our refuge and strength, an ever-present help in trouble. - Psalm 46:1",
      quoteAuthor: "Angela Thomas",
      gist1:
        "Rejection can cause deep emotional wounds, but God’s love has the power to heal those wounds. His unconditional love offers us the security and worth that we often fail to find in the world around us. When we understand that we are loved by God, regardless of our past or circumstances, we can begin to heal and reclaim our identity in Christ.",
      gist2:
        "God’s love is the foundation of healing from past hurts, including feelings of rejection and inadequacy. As we embrace our new identity in Christ, we allow His love to transform us. The love we receive from God also enables us to share that same love with others, creating a cycle of healing and restoration that can break the chains of rejection.",
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
      quote:
        "I can do all things through Christ who strengthens me. - Philippians 4:13",
      quoteAuthor: "David Martin",
      gist1:
        "A life of selfishness and self-centeredness can leave a person feeling empty, but when we surrender our lives to God’s purpose, we discover a new sense of direction, meaning, and fulfillment. God transforms our hearts, replacing our selfish desires with His divine calling. He gives us the strength to live with purpose and to serve others, no matter our past mistakes or struggles.",
      gist2:
        "Once we align our lives with God’s purpose, we begin to see opportunities for growth and transformation in areas we never expected. God redeems the broken parts of our lives, and through His strength, we are able to live a life that glorifies Him and makes a difference in the lives of others. His plans for us are always greater than anything we could ever envision for ourselves.",
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
      quote: "If the Son sets you free, you will be free indeed. - John 8:36",
      quoteAuthor: "Sophia Clark",
      gist1:
        "Addiction can trap us in cycles of despair and hopelessness, but in Christ, there is freedom. The power of Jesus to break chains is greater than any addiction, and through surrendering our struggles to Him, we can experience true freedom. No longer do we need to be defined by our addictions; we are defined by the love and grace of God that sets us free.",
      gist2:
        "Freedom from addiction is not a one-time event; it is a daily decision to rely on Christ and seek His strength. Through accountability, support from others, and a commitment to trust in God’s deliverance, we can walk in the freedom that Christ offers. His grace empowers us to live differently, finding fulfillment and peace in Him alone.",
      advice: [
        "Surrender your struggles to God and trust in His ability to set you free.",
        "Seek accountability and support from others who have walked the same path.",
        "Don’t define yourself by your addiction—define yourself by God’s love for you.",
        "Live each day in the freedom that Christ offers.",
      ],
    },
    {
      id: 21,
      title: "The Lifelong Journey of Marriage",
      image: img21,
      date: "2024-06-01",
      author: "Stephanie Rogers",
      quote:
        "A cord of three strands is not quickly broken. - Ecclesiastes 4:12",
      quoteAuthor: "Stephanie Rogers",
      gist1:
        "Marriage is a sacred and lifelong journey, requiring love, sacrifice, and faith. It is a commitment to honor and support one another, through both joy and challenges. With God at the center, couples can build a foundation of love that withstands all seasons of life. Marriage is not without difficulties, but with a strong relationship with Christ, couples can experience a love that is unshakable and lasting, reflecting God’s own love for His people.",
      gist2:
        "The secret to a successful marriage lies in putting God first, prioritizing each other’s needs, and choosing to love and serve one another sacrificially. When Christ is the center of the relationship, He binds the couple together in ways that make them resilient to external pressures. A marriage rooted in prayer, mutual respect, and love is a reflection of the covenant relationship between Christ and His church.",
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
      quote:
        "Husbands, love your wives, just as Christ loved the church. - Ephesians 5:25",
      quoteAuthor: "Michael Adams",
      gist1:
        "Marriage is not only about finding the right person but also about becoming the right person. It’s a transformative journey, where both partners must grow individually and together. With patience, understanding, and a commitment to love, couples can navigate differences and create a bond based on God’s love. True intimacy is built on open communication, serving each other selflessly, and embracing the refining work of God in the relationship.",
      gist2:
        "The key to a strong marriage is not just compatibility but personal growth. As individuals become more like Christ, they bring strength and maturity to the relationship. Marriage is a beautiful picture of God’s love, and when both partners embrace His design for their lives, they experience a deeper connection and mutual respect, leading to a fulfilling and blessed relationship.",
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
      quote:
        "Submit to one another out of reverence for Christ. - Ephesians 5:21",
      quoteAuthor: "Rachel Matthews",
      gist1:
        "Marriage is not only a commitment between two people but also a reflection of God’s love for His people. As we extend patience, mercy, and grace to our spouses, we mirror the love God shows us. A Christ-centered marriage requires us to forgive, serve, and love selflessly, understanding that it is through our struggles and triumphs that God shapes our hearts. This kind of marriage becomes a testimony to others of God’s faithfulness and love.",
      gist2:
        "The beauty of marriage lies in how it reflects God’s love. Just as God is patient with us, we are called to be patient with our spouses. True love in marriage is not about perfection but about mutual submission and respect. Through hardships and triumphs, God uses marriage to refine and strengthen both partners, leading them to a deeper understanding of His love and faithfulness.",
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
      quote:
        "Therefore what God has joined together, let no one separate. - Mark 10:9",
      quoteAuthor: "Johnathan Scott",
      gist1:
        "Marriage is a sacred partnership, requiring hard work, sacrifice, and unwavering commitment. Couples must be intentional about nurturing their relationship through both joy and difficulty. God’s love is the foundation upon which a marriage can thrive, and when both partners approach challenges with grace, reconciliation, and a servant-hearted attitude, they can grow stronger together. A healthy marriage is built on trust, respect, and a shared commitment to Christ’s love.",
      gist2:
        "Marriage requires intentional effort from both partners, especially during times of conflict. It is important to prioritize understanding, patience, and reconciliation when issues arise. With God’s help, couples can strengthen their relationship, building a foundation of trust and love that allows them to weather the storms of life and stay united, reflecting Christ’s love and faithfulness.",
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
      quote: "Let all that you do be done in love. - 1 Corinthians 16:14",
      quoteAuthor: "Elizabeth Walker",
      gist1:
        "Marriage is about much more than cohabitation—it’s about sharing dreams, burdens, and building a life together. As couples walk through the seasons of life, they are called to reflect the selfless love of Christ by prioritizing their spouse’s needs. A marriage built on mutual love, respect, and trust can withstand life’s joys and challenges, and can serve as a testimony of God’s grace and goodness to the world.",
      gist2:
        "Marriage is a partnership where both individuals choose to invest in one another’s growth and well-being. Through intentional communication, patience, and mutual support, couples can create a deep emotional connection that enables them to face life’s challenges together. When Christ is at the center of the marriage, it becomes a powerful witness to God’s love, radiating grace and strength to everyone around them.",
      advice: [
        "Be intentional about spending quality time together.",
        "Keep a strong emotional connection by being open and honest.",
        "Practice patience with each other and extend grace in difficult moments.",
        "Encourage your spouse and speak life into their dreams.",
      ],
    },
    {
      id: 26,
      title: "The Foundation of Church Leadership",
      image: img26,
      date: "2024-07-01",
      author: "Pastor David Brown",
      quote: "Shepherd the flock of God among you. - 1 Peter 5:2",
      quoteAuthor: "Apostle Peter",
      gist1:
        "Church leadership is built on a foundation of humility, service, and spiritual growth. Leaders must be committed to guiding their congregation with wisdom and love, always prioritizing God’s calling above their own ambitions. The true role of a leader is to serve others selflessly, setting an example in both words and actions. Effective leadership in the church requires a deep relationship with God and a clear vision to lead others toward spiritual maturity, while also fostering unity and growth within the church body.",
      gist2:
        "True leadership is not about seeking power or control but serving others with a heart of compassion. Church leaders must lead by example, live according to biblical principles, and continuously grow in both faith and wisdom. Their role is to inspire, equip, and support their congregation, helping them live out their calling and strengthen their relationship with Christ.",
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
      quote: "Where there is no vision, the people perish. - Proverbs 29:18",
      quoteAuthor: "King Solomon",
      gist1:
        "Effective leadership in the church is built on a clear and compelling vision aligned with God’s will. Leaders must be committed to empowering others to fulfill their calling, ensuring that the needs of the congregation are met through biblical guidance and servant leadership. Visionary leadership requires the ability to inspire and mobilize people, creating a culture of trust and transparency where everyone is equipped to serve and grow in their faith. A visionary leader not only guides the church but also empowers others to step into their own leadership roles.",
      gist2:
        "Visionary leadership involves more than just guiding the congregation—it’s about inspiring others to live out God’s calling for their lives. Leaders must constantly seek God’s direction, make decisions based on biblical principles, and build an environment that fosters trust, growth, and mutual support. This kind of leadership requires wisdom, humility, and a willingness to sacrifice for the greater good of the church body.",
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
      quote:
        "Whoever wants to be great among you must be your servant. - Matthew 20:26",
      quoteAuthor: "Jesus Christ",
      gist1:
        "Servant leadership is the foundation of effective church leadership. It’s not about titles or positions of power but about guiding others with humility, love, and selflessness. True leaders are willing to serve those they lead, putting their needs above their own. Through humility, leaders earn the respect and trust of their congregation, and by being servant-hearted, they foster unity and growth within the church. Effective leaders must remain grounded in biblical truth while being adaptable to the changing needs of their community.",
      gist2:
        "The essence of leadership in the church lies in serving others, just as Christ served us. Humble leaders build strong relationships with their congregation, inspire unity, and foster an environment of growth and support. True leadership requires a willingness to adapt and meet the needs of the church while remaining firmly rooted in faith and biblical principles. Humility is the key to influence, and servant leadership ensures the flourishing of both the individual and the community as a whole.",
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
      quote: "Where there is no vision, the people perish. - Proverbs 29:18",
      quoteAuthor: "King Solomon",
      gist1:
        "Visionary leadership is essential for a thriving church. Leaders must be able to cast a compelling vision that aligns with God’s will, guiding the congregation toward a shared mission. However, vision alone is not enough; effective leadership requires wisdom, patience, and the ability to lead through challenges with humility and grace. Leaders must invest in their own spiritual growth, study God’s Word, and seek God’s direction in all their decisions. A leader who is spiritually grounded can guide the church with confidence, compassion, and purpose.",
      gist2:
        "The key to church leadership is casting a vision that inspires and equips others to live out their calling. Leaders must be spiritually strong and rooted in God’s Word to navigate the challenges of leadership. Effective leadership is not just about managing a congregation but empowering individuals to take ownership of their faith, their service, and their leadership. This requires constant growth, prayer, and a deep commitment to the mission of the church.",
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
      quote:
        "As each has received a gift, use it to serve one another. - 1 Peter 4:10",
      quoteAuthor: "Apostle Peter",
      gist1:
        "Leadership in the church is about equipping others to live out their God-given purpose. A true leader empowers others to serve, grow in their faith, and contribute to the body of Christ. The role of a leader is not to do everything but to train, mentor, and support others in fulfilling their roles within the church. Equipping the church for service requires a commitment to spiritual growth, a willingness to invest in others, and the ability to create an environment where everyone’s gifts are celebrated and utilized for God’s glory.",
      gist2:
        "Effective church leadership is centered on empowering others. Leaders must equip their congregation with the tools, knowledge, and support they need to serve and grow in their faith. Through mentorship, training, and fostering a spirit of cooperation, leaders create a thriving church community. Leaders also must prioritize their own personal reflection and spiritual growth to remain effective and impactful in their service to others.",
      advice: [
        "Equip others for leadership by providing training and mentorship.",
        "Make time for personal reflection and spiritual growth.",
        "Foster a spirit of cooperation and teamwork within your leadership team.",
        "Celebrate the successes of your team and give credit where it’s due.",
      ],
    },
    {
      id: 31,
      title: "Staying Rooted in Faith as a Young Christian",
      image: img31,
      date: "2024-08-01",
      author: "Jessica Lee",
      quote: "Let no one despise your youth. - 1 Timothy 4:12",
      quoteAuthor: "Paul",
      gist1:
        "As a young believer, it’s important to stay rooted in God’s Word and in a community that encourages your faith. Youth comes with its own set of challenges, distractions, and temptations, but with a firm foundation in Scripture, you can navigate these obstacles with God’s strength. Embrace the season of youth as a time of growth, purpose, and service. The world may try to pull you in different directions, but God has a plan for your life, and your voice can make a difference in His kingdom, regardless of your age.",
      gist2:
        "God calls young Christians to stand firm in their faith and make a positive impact in the world around them. While challenges may arise, staying connected to God’s Word, surrounding yourself with godly influences, and remaining bold in your faith will help you stay focused on His purpose for your life. Your youth does not limit you; instead, it’s a time for growth, exploration, and making a meaningful difference in the world through Christ.",
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
      quote:
        "Do not let anyone look down on you because you are young. - 1 Timothy 4:12",
      quoteAuthor: "Paul",
      gist1:
        "Christian youth are called not only to avoid the wrong things but to actively pursue what is right. You are in a unique position to influence your peers, whether at school, in your community, or online. Embrace the call to be a witness to Christ, standing firm in your beliefs even when the world doesn’t understand or appreciate your faith. The challenges you face today are opportunities to grow and witness to others, as God has equipped you to face them with strength and courage.",
      gist2:
        "Being a Christian youth means making intentional choices that align with God’s will. You are called to be a light in a dark world, embracing your role as a representative of Christ wherever you go. Despite the pressures and challenges of youth, remember that God is always with you, and He has equipped you with everything you need to overcome the obstacles that come your way. Trust in His plan for your life and pursue His purpose with courage and faith.",
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
      quote:
        "I can do all things through Christ who strengthens me. - Philippians 4:13",
      quoteAuthor: "Paul",
      gist1:
        "During the teenage years, it’s easy to let external pressures shape your identity, but as a Christian, your true identity is found in Christ. God has given you a unique purpose, and it is through Him that you are defined. In the midst of peer pressure, societal expectations, and temptations, always remember that you are a child of God. Embrace who you are in Christ, and let your faith shine through every aspect of your life, knowing that with Christ, all things are possible.",
      gist2:
        "As a young believer, living out your identity in Christ means standing firm in who God has called you to be. The world will try to pull you in different directions, but your worth and purpose are rooted in Christ alone. Don’t let others or circumstances define you; instead, find your strength, purpose, and identity in God. Embrace your uniqueness and let God use your life as a testimony of His love and grace.",
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
      quote: "You are the light of the world. - Matthew 5:14",
      quoteAuthor: "Jesus",
      gist1:
        "As a Christian, you are called to stand out, not fit in. The world may pressure you to conform, but your life should reflect the love, truth, and mercy of Christ. Every area of your life, whether at school, with friends, or on the sports field, should demonstrate the values of the Kingdom. Don’t be afraid to live differently, even if it means standing alone. Your commitment to Christ can serve as a powerful testimony to those around you, showing them the light of God’s truth.",
      gist2:
        "Standing out as a Christian in a world that pressures you to conform is challenging, but it’s also a powerful opportunity. Your actions, choices, and words should reflect Christ’s love and truth. Whether you’re facing peer pressure or social media challenges, remember that you are the light of the world, and your faith can influence others in a positive way. Don’t let fear of rejection stop you from living out your calling in Christ.",
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
      quote:
        "Trust in the Lord with all your heart, and lean not on your own understanding. - Proverbs 3:5",
      quoteAuthor: "Solomon",
      gist1:
        "As a young believer, it’s important to understand that your faith journey is ongoing. There will be times of doubt, uncertainty, and struggle, but these challenges are opportunities for growth. Trusting in God’s plan, even when things don’t make sense, will build a strong foundation in your faith. Your relationship with God deepens as you rely on Him through difficult moments, and each challenge you face brings you closer to understanding His will for your life.",
      gist2:
        "Faith is not about having all the answers but trusting God even when you don’t understand. The challenges you face as a young Christian are opportunities for growth, and they help strengthen your trust in God. Embrace the process of spiritual growth, stay committed to prayer and Bible study, and trust that God is leading you through every trial. As you continue to grow in your relationship with Him, your faith will become stronger and more resilient.",
      advice: [
        "Embrace the journey of growing in your faith, even when it's difficult.",
        "Stay connected to a community of believers who will encourage you.",
        "Take time to reflect on God’s faithfulness in your life.",
        "Don’t be afraid to ask tough questions about your faith.",
      ],
    },
    {
      id: 36,
      title: "Defending the Faith with Love and Knowledge",
      image: img36,
      date: "2024-09-01",
      author: "Dr. Mark Johnson",
      quote: "Always be prepared to give an answer... - 1 Peter 3:15",
      quoteAuthor: "Peter",
      gist1:
        "Defending the Christian faith is not about winning arguments or proving others wrong. It’s about sharing the truth of the Gospel with love and respect. As Christians, we are called to be prepared to give an answer for the hope we have in Christ, but this requires both deep knowledge of Scripture and the ability to communicate it in a way that resonates with others. Apologetics is for every believer, not just theologians, as it helps us to stand firm in our faith and effectively engage with the world around us.",
      gist2:
        "Apologetics is a crucial tool for Christians who want to engage thoughtfully and respectfully with those who question or misunderstand the faith. By defending the faith with humility, wisdom, and love, we can point others to the hope found in Christ alone. Whether through personal conversations, debates, or social media discussions, a firm foundation in Scripture and the ability to communicate the Gospel can make a powerful impact.",
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
      quote:
        "The Lord gives wisdom; from His mouth come knowledge and understanding. - Proverbs 2:6",
      quoteAuthor: "Solomon",
      gist1:
        "Apologetics is an essential tool for Christians in a world that increasingly challenges the validity of their faith. It equips believers to respond to questions and doubts in a way that honors God and respects others. By understanding what we believe and why we believe it, we can offer thoughtful, reasoned responses to the objections and challenges we face. It’s not about forcing people to accept our faith, but rather showing them the logical beauty and coherence of the Christian worldview.",
      gist2:
        "Christian apologetics helps us not only to defend our faith but to understand it more deeply. Engaging with the challenges to Christianity requires a balance of knowledge, humility, and love. As believers, we are called to engage with the world in a way that is respectful and understanding, and apologetics provides the foundation for doing this with confidence. Remember, the goal is not to win debates but to point people toward the truth of the Gospel.",
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
      quote:
        "Sanctify Christ as Lord in your hearts, always being ready to make a defense. - 1 Peter 3:15",
      quoteAuthor: "Peter",
      gist1:
        "Apologetics equips Christians to engage with skeptics in a way that demonstrates the rationality and truth of the Christian faith. In a world filled with skepticism and challenges to traditional beliefs, it’s crucial that we are prepared to respond with clarity, respect, and knowledge. Apologetics helps us show that faith and reason are not mutually exclusive and provides answers to life's big questions. Engaging skeptics requires patience, listening, and the ability to present the Gospel in a compelling way that draws people closer to the truth.",
      gist2:
        "When engaging with skeptics, it’s important to approach conversations with humility and a desire to listen and understand. Apologetics is not about arguing to win but about engaging in meaningful dialogue that points to the truth of the Gospel. By understanding the worldview of those we engage with, we can offer answers that are both intellectually satisfying and compassionate. Always remember that apologetics is a tool to bring others to Christ, not just to prove them wrong.",
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
      quote:
        "You will know the truth, and the truth will set you free. - John 8:32",
      quoteAuthor: "Jesus",
      gist1:
        "Christian apologetics is about more than just defending doctrine—it’s about showing the world that the Christian faith is both rational and transformative. Many objections to Christianity are rooted in misunderstandings or misconceptions about the faith. Apologists work to break down these barriers by presenting evidence and addressing doubts in a way that highlights the coherence and beauty of the Christian worldview. In a secular society, apologetics provides a means of sharing the timeless truth of the Gospel with those who may not be open to traditional methods of evangelism.",
      gist2:
        "The goal of Christian apologetics is to present Christianity as a rational, life-changing faith. By addressing common objections and presenting logical and intellectual arguments for the truth of Christianity, apologists help people see that the Christian faith is not only true but also transformative. As Christians, we should approach apologetics with humility and compassion, always seeking to point others to Christ through our words and actions.",
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
      quote:
        "For the word of the Lord is right and true; He is faithful in all He does. - Psalm 33:4",
      quoteAuthor: "David",
      gist1:
        "Apologetics is not just for defending abstract theological concepts—it’s also about answering life’s tough questions with integrity and reason. Christianity provides satisfying answers to questions about suffering, morality, and existence, and apologetics helps us articulate these answers in a way that respects both the believer and the skeptic. By understanding the heart of our faith and the logic behind it, we can respond to difficult questions thoughtfully and with confidence, pointing to the truth of God's Word.",
      gist2:
        "Responding to life’s hard questions requires both knowledge and humility. As Christians, we are equipped with the truth of God’s Word to respond to the doubts and challenges that arise in our own lives and in the lives of others. Apologetics allows us to engage with tough topics in a way that is intellectually satisfying and spiritually nurturing. It’s not about having all the answers, but about being willing to engage honestly and thoughtfully with the hard questions of life and faith.",
      advice: [
        "Take time to develop a biblical worldview to answer tough questions.",
        "Stay humble in your approach, knowing you don’t have all the answers.",
        "Embrace the journey of learning and growing in knowledge of Scripture.",
        "Use apologetics as an opportunity to glorify God and share His truth.",
      ],
    },
  ];
  setActive("blog");
  const sectionType = ""
  const buttonType = "article"
  const sections = [
    {
      id: 24,
      title: "Faith as a Guide Through Life’s Challenges",
      paragraphs: [
        "In the face of adversity, faith acts as a light in the darkness, guiding us through turbulent times with hope and resilience.",
        "When we lean into our beliefs, we find the strength to persevere, knowing that we are never truly alone in our struggles.",
        "This journey of faith teaches us the power of patience, perseverance, and trust, helping us navigate life with a clearer purpose.",
      ],
    },
    {
      id: 25,
      title: "Building Connections Through Shared Beliefs",
      paragraphs: [
        "The bonds we form within a faith community are built on shared values and experiences, creating lasting and meaningful relationships.",
        "When we come together to support one another, we not only deepen our faith but also create a network of love and understanding.",
        "True community is built on mutual respect, trust, and a shared commitment to uplift one another as we walk our faith journeys together.",
      ],
    },
    {
      id: 26,
      title: "Faith in Action: Making a Difference",
      paragraphs: [
        "Faith becomes most powerful when it is put into action. It compels us to reach out and make a tangible impact on the world around us.",
        "Every act of kindness, every outreach, and every effort to support others is a reflection of the values we hold dear in our hearts.",
        "By living our faith daily, we contribute to creating a world filled with compassion, understanding, and positive change.",
      ],
    },
    {
      id: 27,
      title: "The Impact of Service on Our Souls",
      paragraphs: [
        "Service is not just about helping others—it is a transformative experience that shapes our character and deepens our spiritual lives.",
        "Through service, we learn humility, gratitude, and the joy of giving. It opens our eyes to the struggles of others and our role in alleviating them.",
        "Each act of service is an opportunity to grow spiritually, to connect with others on a deeper level, and to fulfill our calling to love and serve.",
      ],
    },
  ];
   const [recPost, setRecPost] = useState([]);

  useEffect(() => {
    // Pick 3 random unique indexes
    const chosen = new Set();
    while (chosen.size < 3 && chosen.size < articles.length) {
      chosen.add(Math.floor(Math.random() * articles.length));
    }
    setRecPost(Array.from(chosen).map((i) => articles[i]));
  }, []);

  const article = articles.find((a) => a.id == id);

  if (!article) {
    return (
      <div className="holder">
        <p>Article not found.</p>
        <Link to="/bloggrid/1" onClick={scrollTop}>
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="holder">
      <Link to={`/bloggrid/${1}`} onClick={scrollTop}>
        <i title="Go Back" className="fa-solid fa-backward"></i>
      </Link>

      {/* Remove Hero if you don’t have props ready */}
      {/* <Hero sections={sections} sectionType={sectionType} buttonType={buttonType} /> */}

      <div className="readBlog_holder container_flex_between">
        {/* Main Article */}
        <div className="readBlog_container">
          <div key={article.id} className="article">
            {article.image && <img src={article.image} alt={article.title} />}
            <div className="article_date_author">
              <p>{article.author}</p>
              <p>{article.date}</p>
            </div>
            <h2>{article.title}</h2>

            {/* If gist1/gist2 exist */}
            {article.gist1 && (
              <p className="gist1">
                <span>{article.gist1.charAt(0)}</span>
                {article.gist1.slice(1)}
              </p>
            )}
            {article.quote && (
              <div className="quote">
                <i className="fa-solid fa-quote-right"></i>
                <i className="fa-solid fa-quote-left"></i>
                <p>{article.quote}</p>
                <small>-{article.quoteAuthor}</small>
              </div>
            )}
            {article.gist2 && <p className="gist1">{article.gist2}</p>}

            {/* If advice exists */}
            {article.advice && (
              <ul className="advice">
                {article.advice.map((advc, i) => (
                  <li key={i}>
                    <i className="fa-solid fa-square-check"></i> {advc}
                  </li>
                ))}
              </ul>
            )}

            {/* If paragraphs exist */}
            {article.paragraphs &&
              article.paragraphs.map((para, i) => (
                <p key={i} className="gist1">
                  {para}
                </p>
              ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="readBlog_extra">
          <ul className="categories">
            <h1>Categories</h1>
            {[
              "Biblical Devotionals",
              "Theology Studies",
              "Christian Growth",
              "Testimonies Stories",
              "Church News",
              "Christian Ministry",
              "Book Reviews",
              "Contemporary Issues",
            ].map((cat, idx) => (
              <li key={idx}>
                <Link to={`/bloggrid/${idx + 1}`} onClick={scrollTop}>
                  <p className="categories_column">{cat}</p>
                  <p>{Math.floor(Math.random() * 20) + 5} posts</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="related_post">
            <h2>Latest Blogs</h2>
            <div className="related_post_cards">
              {recPost.map(
                (post) =>
                  post && (
                    <Link
                      to={`/readblog/${post.id}`}
                      key={post.id}
                      className="related_card"
                      onClick={scrollTop}
                    >
                      {post.image && (
                        <div className="related_card_image">
                          <img src={post.image} alt={post.title} />
                        </div>
                      )}
                      <div className="related_card_text">
                        <span>{post.date}</span>
                        <p>{post.title}</p>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>

          <div className="know_us">
            <span>Call 123 234-567-890</span>
            <h2>Have a Blessed</h2>
            <h1>Sunday Service</h1>
            <Link to="/contact" className="btn" onClick={scrollTop}>
              <p>Know About Us</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;