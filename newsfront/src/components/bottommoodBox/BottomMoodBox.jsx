import React, { useState, useRef } from 'react';
import woman from '../../assets/woman.png'
import './bottomMoodBox.css';

function BottomMoodBox() {
const moods = [
  "joyful", "sad", "peaceful", "anxious", "lonely", "angry", "thankful", "hopeful", 
  "discouraged", "happy", "ashamed", "weak", "tired", "confused", "broken", "fearful", 
  "guilty", "content", "nervous", "excited", "betrayed", "loved", "humbled", "bitter", 
  "insecure", "curious", "desperate", "doubtful", "eager", "bold", "restless", "calm", 
  "free", "trapped", "overwhelmed", "helpless", "empowered", "mournful", "jealous", 
  "grateful", "isolated", "victorious", "repentant", "motivated", "apathetic", "unworthy", 
  "strong", "resentful", "generous", "forgiving", "trusted", "hope-drained", "faithful", 
  "rejected", "anguished", "fulfilled", "patient", "lively", "low", "exhausted", "inspired", 
  "conflicted", "brave", "joyless", "panicked", "attentive", "distant", "brokenhearted", 
  "worried", "cheerful", "afraid", "healing", "redeemed", "renewed", "stressed", "distracted", 
  "watchful", "sleepy", "warm", "cold", "withdrawn", "foolish", "wise", "growing", 
  "lustful", "tempted", "lost", "found", "secure", "unloved", "focused", "protective", 
  "determined", "faithless", "unforgiving", "diligent",

  // ✨ New additions
  "grieving", "comforted", "revived", "emptied", "restored", "zealous", "hungry", "thirsty", 
  "satisfied", "unsatisfied", "prayerful", "distant-from-God", "close-to-God", "obedient", 
  "rebellious", "ashamed-of-sin", "convicted", "purified", "cleansed", "expectant", 
  "hopeless", "loved-by-God", "abandoned", "uplifted", "disciplined", "refreshed", "weary", 
  "tested", "tempted-beyond", "delivered", "guided", "misunderstood", "accepted", 
  "comfortless", "strengthened", "protected", "covered", "open", "closed", "waiting", 
  "hurried", "peace-filled", "angst", "resentful", "encouraged", "overflowing", "dry", 
  "revived", "burdened", "released", "bound", "set-free", "watching", "zeal-less", 
  "burning", "fading", "ready", "unprepared", "mindful", "forgetful", "awake", "slumbering"
];

const moodVerseMap = {
       joyful: {
    verses: [
      "Psalm 118:24 - This is the day which the LORD hath made; we will rejoice and be glad in it.",
      "Philippians 4:4 - Rejoice in the Lord alway: and again I say, Rejoice.",
      "Nehemiah 8:10 - Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength."
    ],
    explanation:
      "When you are joyful, God reminds you to celebrate His goodness. Your joy is not just from circumstances but is rooted in the Lord Himself. His joy gives strength and keeps you rejoicing every day."
  },

  sad: {
    verses: [
      "Psalm 34:18 - The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
      "Matthew 5:4 - Blessed are they that mourn: for they shall be comforted.",
      "Revelation 21:4 - And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away."
    ],
    explanation:
      "In sadness, God is near to heal broken hearts. Jesus promises comfort to those who mourn, and we look forward to the day when God Himself will wipe away all tears forever."
  },
  angry: {
    verses: [
      "Ephesians 4:26 - Be ye angry, and sin not: let not the sun go down upon your wrath:",
      "James 1:19-20 - Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath: For the wrath of man worketh not the righteousness of God.",
      "Proverbs 15:1 - A soft answer turneth away wrath: but grievous words stir up anger."
    ],
    explanation:
      "God understands anger but warns us not to sin with it. Slow down, listen, and answer gently. Human wrath cannot produce God’s righteousness, but His Spirit helps you respond with peace."
  },
    anxious: {
    verses: [
      "Philippians 4:6 - Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      "Philippians 4:7 - And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      "Matthew 6:34 - Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.",
      "1 Peter 5:7 - Casting all your care upon him; for he careth for you."
    ],
    explanation: "When anxiety tries to take over, the Word reminds us to pray instead of worrying. God’s peace will guard our hearts when we release our burdens to Him. Jesus assures us that tomorrow is in His hands, and Peter tells us clearly — He cares deeply about every concern we have."
  },

    tired: {
    verses: [
      "Matthew 11:28 - Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      "Isaiah 40:29 - He giveth power to the faint; and to them that have no might he increaseth strength.",
      "Isaiah 40:31 - But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      "Psalm 23:1-2 - The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters."
    ],
    explanation: "When we’re exhausted, Jesus invites us to come to Him for true rest. God renews our strength like eagles soaring high, refreshing us in His presence. The Good Shepherd cares for our soul, leading us to peace and restoration."
  },
  thankful: {
    verses: [
      "1 Thessalonians 5:18 - In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
      "Psalm 100:4 - Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.",
      "Colossians 3:17 - And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him.",
      "Ephesians 5:20 - Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Christ."
    ],
    explanation: "Thankfulness is God’s will for us. Gratitude shifts our focus from problems to His goodness and blessings."
  },

  lonely: {
    verses: [
      "Deuteronomy 31:6 - Be strong and of a good courage, fear not, nor be afraid of them: for the Lord thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
      "Psalm 27:10 - When my father and my mother forsake me, then the Lord will take me up.",
      "Matthew 28:20 - Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
      "Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."
    ],
    explanation: "Even in loneliness, God’s presence is constant. He promises never to forsake His children."
  },

  discouraged: {
    verses: [
      "Joshua 1:9 - Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.",
      "2 Corinthians 4:8-9 - We are troubled on every side, yet not distressed; we are perplexed, but not in despair; Persecuted, but not forsaken; cast down, but not destroyed.",
      "Psalm 42:11 - Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.",
      "Isaiah 41:13 - For I the Lord thy God will hold thy right hand, saying unto thee, Fear not; I will help thee."
    ],
    explanation: "When discouraged, remember God is with you. Trials do not destroy you; His hand lifts you up and gives courage."
  },

  confused: {
    verses: [
      "Proverbs 3:5-6 - Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      "James 1:5 - If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
      "Isaiah 30:21 - And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it, when ye turn to the right hand, and when ye turn to the left.",
      "Psalm 32:8 - I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye."
    ],
    explanation: "Confusion fades when we trust God’s wisdom. He directs our paths and gives clarity when we ask."
  },

  hopeful: {
    verses: [
      "Romans 15:13 - Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
      "Jeremiah 29:11 - For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
      "Hebrews 10:23 - Let us hold fast the profession of our faith without wavering; (for he is faithful that promised;)",
      "Lamentations 3:24 - The Lord is my portion, saith my soul; therefore will I hope in him."
    ],
    explanation: "Hope is grounded in God’s promises. He is faithful, and His plans bring peace and a secure future."
  },

  sick: {
    verses: [
      "Isaiah 53:5 - But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
      "James 5:14-15 - Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him.",
      "Psalm 103:2-3 - Bless the Lord, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.",
      "Jeremiah 30:17 - For I will restore health unto thee, and I will heal thee of thy wounds, saith the Lord; because they called thee an Outcast, saying, This is Zion, whom no man seeketh after."
    ],
    explanation: "God is the Healer. Through Christ’s sacrifice, prayer, and faith, He promises restoration and health."
  },

  tempted: {
    verses: [
      "1 Corinthians 10:13 - There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.",
      "James 1:12 - Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him.",
      "Hebrews 2:18 - For in that he himself hath suffered being tempted, he is able to succour them that are tempted.",
      "Matthew 26:41 - Watch and pray, that ye enter not into temptation: the spirit indeed is willing, but the flesh is weak."
    ],
    explanation: "Temptation is common, but God provides strength and an escape. Christ understands and helps us overcome."
  },

  peaceful: {
  verses: [
    "John 14:27 - Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
    "Isaiah 26:3 - Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
    "Philippians 4:7 - And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
  ],
  explanation:
    "When you feel peaceful, it’s God’s Spirit at work. His peace is not like the world’s — it is deeper, steady, and unshakable, guarding your heart and mind in Christ."
},

ashamed: {
  verses: [
    "Romans 10:11 - For the scripture saith, Whosoever believeth on him shall not be ashamed.",
    "Psalm 34:5 - They looked unto him, and were lightened: and their faces were not ashamed.",
    "2 Timothy 1:8 - Be not thou therefore ashamed of the testimony of our Lord, nor of me his prisoner: but be thou partaker of the afflictions of the gospel according to the power of God."
  ],
  explanation:
    "Shame melts away in the light of God’s truth. Those who trust in Him are never put to shame, and standing for Christ is always a reason for boldness."
},

weak: {
  verses: [
    "2 Corinthians 12:9 - And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.",
    "Isaiah 40:29 - He giveth power to the faint; and to them that have no might he increaseth strength.",
    "Psalm 73:26 - My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever."
  ],
  explanation:
    "When you feel weak, remember God’s strength is revealed most clearly then. He gives power to the faint and becomes the strength of your heart."
},

broken: {
  verses: [
    "Psalm 34:18 - The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
    "Isaiah 61:1 - He hath sent me to bind up the brokenhearted, to proclaim liberty to the captives.",
    "Psalm 147:3 - He healeth the broken in heart, and bindeth up their wounds."
  ],
  explanation:
    "God is close to the brokenhearted. He binds up wounds and restores hope, showing His love and healing power in your lowest moments."
},

fearful: {
  verses: [
    "Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    "2 Timothy 1:7 - For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    "Psalm 56:3 - What time I am afraid, I will trust in thee."
  ],
  explanation:
    "Fear is not from God. His Spirit gives power, love, and a sound mind, and His presence is your assurance that you are not alone."
},

guilty: {
  verses: [
    "1 John 1:9 - If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    "Psalm 32:5 - I acknowledged my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the LORD; and thou forgavest the iniquity of my sin.",
    "Romans 8:1 - There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."
  ],
  explanation:
    "Guilt is answered by confession and forgiveness. In Christ, there is no condemnation, only freedom and cleansing through His grace."
},

content: {
  verses: [
    "Philippians 4:11 - Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.",
    "1 Timothy 6:6 - But godliness with contentment is great gain.",
    "Hebrews 13:5 - Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee."
  ],
  explanation:
    "True contentment is found in God’s presence, not in possessions. He never leaves you, and His sufficiency brings great gain."
},

nervous: {
  verses: [
    "Joshua 1:9 - Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    "Psalm 94:19 - In the multitude of my thoughts within me thy comforts delight my soul.",
    "Isaiah 35:4 - Say to them that are of a fearful heart, Be strong, fear not: behold, your God will come with vengeance, even God with a recompence; he will come and save you."
  ],
  explanation:
    "When nerves overwhelm you, God’s Word reminds you to be strong and courageous. His comfort and promise of salvation calm your heart."
},

excited: {
  verses: [
    "Psalm 118:24 - This is the day which the LORD hath made; we will rejoice and be glad in it.",
    "Psalm 100:2 - Serve the LORD with gladness: come before his presence with singing.",
    "Luke 10:20 - Notwithstanding in this rejoice not, that the spirits are subject unto you; but rather rejoice, because your names are written in heaven."
  ],
  explanation:
    "Excitement is a gift when rooted in the Lord. Rejoice in the day He has made and in the eternal joy of knowing your name is written in heaven."
},

betrayed: {
  verses: [
    "Psalm 41:9 - Yea, mine own familiar friend, in whom I trusted, which did eat of my bread, hath lifted up his heel against me.",
    "Micah 7:5-6 - Trust ye not in a friend, put ye not confidence in a guide: keep the doors of thy mouth from her that lieth in thy bosom. For the son dishonoureth the father, the daughter riseth up against her mother...",
    "Romans 12:19 - Dearly beloved, avenge not yourselves, but rather give place unto wrath: for it is written, Vengeance is mine; I will repay, saith the Lord."
  ],
  explanation:
    "Betrayal cuts deep, but God understands. He calls you to trust Him for justice and lean on His presence when others fail you."
},
  loved: {
  verses: [
    "Jeremiah 31:3 - The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee.",
    "Romans 5:8 - But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
    "1 John 3:1 - Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God."
  ],
  explanation:
    "God’s love is everlasting and unchanging. He loved you enough to send Christ for you, and He calls you His child — His love is your identity."
},

humbled: {
  verses: [
    "James 4:10 - Humble yourselves in the sight of the Lord, and he shall lift you up.",
    "Micah 6:8 - He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
    "1 Peter 5:6 - Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time."
  ],
  explanation:
    "Humility brings God’s favor. When you bow low before Him, He lifts you up and guides you in justice, mercy, and grace."
},

bitter: {
  verses: [
    "Hebrews 12:15 - Looking diligently lest any man fail of the grace of God; lest any root of bitterness springing up trouble you, and thereby many be defiled.",
    "Ephesians 4:31 - Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice.",
    "Proverbs 14:10 - The heart knoweth his own bitterness; and a stranger doth not intermeddle with his joy."
  ],
  explanation:
    "Bitterness poisons the heart and affects others. God calls you to let it go through His grace, replacing it with forgiveness and healing."
},

insecure: {
  verses: [
    "Psalm 139:14 - I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.",
    "Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    "Romans 8:38-39 - For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers... shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
  ],
  explanation:
    "Insecurity fades when you remember who you are in Christ. You are wonderfully made, upheld by God’s strength, and inseparable from His love."
},

curious: {
  verses: [
    "Acts 17:11 - These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.",
    "Proverbs 25:2 - It is the glory of God to conceal a thing: but the honour of kings is to search out a matter.",
    "Matthew 7:7 - Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you."
  ],
  explanation:
    "God welcomes a curious heart that seeks Him. His Word invites you to search, ask, and knock, and He reveals truth to those who hunger for it."
},

desperate: {
  verses: [
    "Psalm 42:1-2 - As the hart panteth after the water brooks, so panteth my soul after thee, O God. My soul thirsteth for God, for the living God.",
    "Mark 5:27-28 - When she had heard of Jesus, came in the press behind, and touched his garment. For she said, If I may touch but his clothes, I shall be whole.",
    "Jonah 2:2 - I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice."
  ],
  explanation:
    "Desperation can drive you to God’s presence. Like the thirsty deer or the woman reaching for Jesus’ garment, cry out and He will hear you."
},

doubtful: {
  verses: [
    "James 1:6 - But let him ask in faith, nothing wavering. For he that wavereth is like a wave of the sea driven with the wind and tossed.",
    "Mark 9:24 - And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief.",
    "John 20:27 - Then saith he to Thomas, Reach hither thy finger, and behold my hands... and be not faithless, but believing."
  ],
  explanation:
    "Doubt happens, but God meets you in it. He calls you to faith, helps your unbelief, and shows proof of His power and presence."
},

eager: {
  verses: [
    "Psalm 119:20 - My soul breaketh for the longing that it hath unto thy judgments at all times.",
    "1 Peter 2:2 - As newborn babes, desire the sincere milk of the word, that ye may grow thereby:",
    "Titus 2:14 - Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works."
  ],
  explanation:
    "Eagerness for God’s Word and works is a mark of His Spirit in you. Let your hunger for Him lead to growth and zealous service."
},

bold: {
  verses: [
    "Proverbs 28:1 - The wicked flee when no man pursueth: but the righteous are bold as a lion.",
    "Acts 4:29 - And now, Lord, behold their threatenings: and grant unto thy servants, that with all boldness they may speak thy word.",
    "2 Corinthians 3:12 - Seeing then that we have such hope, we use great plainness of speech."
  ],
  explanation:
    "Boldness comes from righteousness and hope in Christ. God fills you with courage to speak His Word and stand strong like a lion."
},

restless: {
  verses: [
    "Matthew 11:28-29 - Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
    "Isaiah 57:20 - But the wicked are like the troubled sea, when it cannot rest, whose waters cast up mire and dirt.",
    "Psalm 62:1 - Truly my soul waiteth upon God: from him cometh my salvation."
  ],
  explanation:
    "Restlessness finds peace only in Christ. The world’s turmoil cannot satisfy, but Jesus gives true rest to your weary soul."
},
happy: {
  verses: [
    "Psalm 144:15 - Happy is that people, that is in such a case: yea, happy is that people, whose God is the LORD.",
    "Proverbs 16:20 - He that handleth a matter wisely shall find good: and whoso trusteth in the LORD, happy is he.",
    "John 13:17 - If ye know these things, happy are ye if ye do them."
  ],
  explanation:
    "Happiness in Scripture is tied to trusting God, living wisely, and obeying His Word. True happiness flows from Him, not circumstances."
},
mourning: {
  verses: [
    "Matthew 5:4 - Blessed are they that mourn: for they shall be comforted.",
    "Psalm 30:5 - For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning.",
    "Revelation 21:4 - And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying..."
  ],
  explanation:
    "God promises comfort for those who mourn. Sorrow is temporary, but His presence brings lasting hope and healing."
},
jealous: {
  verses: [
    "Proverbs 14:30 - A sound heart is the life of the flesh: but envy the rottenness of the bones.",
    "James 3:16 - For where envying and strife is, there is confusion and every evil work.",
    "Galatians 5:26 - Let us not be desirous of vain glory, provoking one another, envying one another."
  ],
  explanation:
    "Jealousy eats away at the heart. The Word warns against envy, pointing us instead to contentment and love toward others."
},
grateful: {
  verses: [
    "1 Thessalonians 5:18 - In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
    "Colossians 3:15 - ...and be ye thankful.",
    "Psalm 100:4 - Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name."
  ],
  explanation:
    "Gratitude shifts focus from problems to God’s goodness. Thankfulness invites His presence and strengthens faith."
},
isolated: {
  verses: [
    "Psalm 68:6 - God setteth the solitary in families: he bringeth out those which are bound with chains...",
    "Hebrews 10:25 - Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another...",
    "Genesis 2:18 - It is not good that the man should be alone; I will make him an help meet for him."
  ],
  explanation:
    "God doesn’t want His children isolated. He places us in fellowship and calls us into relationship with Him and others."
},
victorious: {
  verses: [
    "1 Corinthians 15:57 - But thanks be to God, which giveth us the victory through our Lord Jesus Christ.",
    "Romans 8:37 - Nay, in all these things we are more than conquerors through him that loved us.",
    "2 Corinthians 2:14 - Now thanks be unto God, which always causeth us to triumph in Christ..."
  ],
  explanation:
    "Victory is secured in Christ. No matter the battle, we overcome by His love, power, and resurrection life."
},
repentant: {
  verses: [
    "Acts 3:19 - Repent ye therefore, and be converted, that your sins may be blotted out...",
    "2 Chronicles 7:14 - If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways...",
    "Psalm 51:17 - The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise."
  ],
  explanation:
    "Repentance brings forgiveness and restoration. God honors the humble, broken heart that turns back to Him."
},
motivated: {
  verses: [
    "Colossians 3:23 - And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
    "Philippians 3:14 - I press toward the mark for the prize of the high calling of God in Christ Jesus.",
    "Hebrews 12:1 - ...let us run with patience the race that is set before us."
  ],
  explanation:
    "Godly motivation flows from living for Christ. His call inspires us to run faithfully with endurance."
},
apathetic: {
  verses: [
    "Revelation 3:16 - So then because thou art lukewarm, and neither cold nor hot, I will spue thee out of my mouth.",
    "Romans 12:11 - Not slothful in business; fervent in spirit; serving the Lord;",
    "Galatians 6:9 - And let us not be weary in well doing: for in due season we shall reap, if we faint not."
  ],
  explanation:
    "Apathy dulls the spirit, but God calls for zeal and steadfastness. Staying fervent keeps us fruitful in Him."
},
unworthy: {
  verses: [
    "Romans 3:23-24 - For all have sinned, and come short of the glory of God; being justified freely by his grace...",
    "Ephesians 2:8-9 - For by grace are ye saved through faith... not of works, lest any man should boast.",
    "Luke 15:21-22 - ...Father, I have sinned against heaven... But the father said... Bring forth the best robe, and put it on him..."
  ],
  explanation:
    "Though we may feel unworthy, God’s grace makes us accepted. He clothes us in His righteousness."
},
strong: {
  verses: [
    "Philippians 4:13 - I can do all things through Christ which strengtheneth me.",
    "Isaiah 40:31 - ...they that wait upon the LORD shall renew their strength...",
    "2 Corinthians 12:10 - For when I am weak, then am I strong."
  ],
  explanation:
    "Strength comes not from ourselves but from God. In Him, our weakness becomes the place for His power."
},
resentful: {
  verses: [
    "Ephesians 4:31 - Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice:",
    "Hebrews 12:15 - ...lest any root of bitterness springing up trouble you, and thereby many be defiled;",
    "Colossians 3:13 - Forbearing one another, and forgiving one another..."
  ],
  explanation:
    "Resentment poisons the heart. God calls us to release bitterness and walk in forgiveness through Christ."
},
generous: {
  verses: [
    "2 Corinthians 9:7 - Every man according as he purposeth in his heart, so let him give... for God loveth a cheerful giver.",
    "Proverbs 11:25 - The liberal soul shall be made fat: and he that watereth shall be watered also himself.",
    "Luke 6:38 - Give, and it shall be given unto you..."
  ],
  explanation:
    "Generosity reflects God’s nature. As we give freely, He promises to supply abundantly."
},
forgiving: {
  verses: [
    "Ephesians 4:32 - And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
    "Matthew 6:14 - For if ye forgive men their trespasses, your heavenly Father will also forgive you:",
    "Colossians 3:13 - ...even as Christ forgave you, so also do ye."
  ],
  explanation:
    "Forgiveness mirrors Christ’s love. We forgive because He forgave us, freeing both heart and relationships."
},
trusted: {
  verses: [
    "Psalm 37:5 - Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.",
    "Proverbs 3:5 - Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
    "Isaiah 26:4 - Trust ye in the LORD for ever: for in the LORD JEHOVAH is everlasting strength."
  ],
  explanation:
    "Trusting God anchors the soul. His strength and promises never fail, so He is fully worthy of reliance."
},
  

};


  const [inputMood, setInputMood] = useState('');
  const [filteredMoods, setFilteredMoods] = useState([]);
  const [verse, setVerse] = useState('');
  const [seen, setSeen] = useState(false);

  const lastSpokenRef = useRef(0)

  const speakText = (text) => {
    const now = Date.now();
    if(now - lastSpokenRef.current < 3000) return;
    
    lastSpokenRef.current = now;

    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel(); //stop any previous speech
    window.speechSynthesis.speak(utterance);
  };

  const handleHover = () => {
    const text = "Hello, how are you feeling today?";
    speakText(text);
  }


  const handleChange = (value) => {
    setInputMood(value);
    if (value.trim() === '') {
      setFilteredMoods([]);
      return;
    }
    const filtered = moods.filter(mood =>
      mood.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMoods(filtered);
  };

  const handleSelect = (mood) => {

    setInputMood(mood);
    setFilteredMoods([]);
    const entry = moodVerseMap[mood];
     if (entry && entry.length > 0) {
   
       const verses = entry.verses.join("\n");
       const fullText = `${verses}\n\n${entry.explanation}`

      setVerse(fullText);

    const utterance = new SpeechSynthesisUtterance(verses)
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance)
     }
     else {
    setVerse('No verse found.');
  }
  };

   if(!seen) return <div onClick={()=>setSeen(true)} className="woman" onMouseEnter={handleHover}>
    <div className="woman_text">hello how are you feeling today</div>
    <img src={woman}/>
   </div>
  return (
    <div className="bottom-box">
      <i onClick={()=>{setSeen(false);  window.speechSynthesis.cancel();}} className="fa-solid fa-times iconactive"></i>
      <div className="filter-area">
         {filteredMoods.length > 0 && (
          <ul className="dropdown">
            {filteredMoods.map((mood, index) => (
              <li key={index} onClick={() => handleSelect(mood)}>
                {mood}
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={(e)=>{e.preventDefault(); handleSelect(inputMood)}} className="box_form">
            <input
          type="text"
          value={inputMood}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="joyful, anxious, or grateful."
        />
        <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
        </form>
      
       
        {verse && <p className="verse"><img src={woman}/>{verse}</p>}
      </div>
    </div>
  );
}

export default BottomMoodBox;
