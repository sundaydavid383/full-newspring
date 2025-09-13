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


          betrayed: {
            verses: [
              "Psalm 41:9 - Yea, mine own familiar friend, in whom I trusted, which did eat of my bread, hath lifted up his heel against me.",
              "Micah 7:5-6 - Trust ye not in a friend, put ye not confidence in a guide: keep the doors of thy mouth from her that lieth in thy bosom. For the son dishonoureth the father, the daughter riseth up against her mother...",
              "Romans 12:19 - Dearly beloved, avenge not yourselves, but rather give place unto wrath: for it is written, Vengeance is mine; I will repay, saith the Lord."
            ],
            explanation:
              "Betrayal cuts deep, but God understands. He calls you to trust Him for justice and lean on His presence when others fail you."
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

          curious: {
            verses: [
              "Acts 17:11 - These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.",
              "Proverbs 25:2 - It is the glory of God to conceal a thing: but the honour of kings is to search out a matter.",
              "Matthew 7:7 - Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you."
            ],
            explanation:
              "God welcomes a curious heart that seeks Him. His Word invites you to search, ask, and knock, and He reveals truth to those who hunger for it."
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
          ashamed: {
            verses: [
              "Romans 10:11 - For the scripture saith, Whosoever believeth on him shall not be ashamed.",
              "Psalm 34:5 - They looked unto him, and were lightened: and their faces were not ashamed.",
              "2 Timothy 1:8 - Be not thou therefore ashamed of the testimony of our Lord, nor of me his prisoner: but be thou partaker of the afflictions of the gospel according to the power of God."
            ],
            explanation:
              "Shame disappears in the light of God’s truth. Those who trust Him are never truly ashamed, and standing for Christ is always a reason for boldness."
          },

          weak: {
            verses: [
              "2 Corinthians 12:9 - And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.",
              "Isaiah 40:29 - He giveth power to the faint; and to them that have no might he increaseth strength.",
              "Psalm 73:26 - My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever."
            ],
            explanation:
              "When you feel weak, God’s strength shines through. He strengthens the faint and becomes the anchor of your heart."
          },
         

          broken: {
            verses: [
              "Psalm 34:18 - The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
              "Isaiah 61:1 - The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives.",
              "Psalm 147:3 - He healeth the broken in heart, and bindeth up their wounds."
            ],
            explanation:
              "God is close to the brokenhearted. He heals, restores, and binds up wounds when life feels shattered."
          },

          fearful: {
            verses: [
              "Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
              "2 Timothy 1:7 - For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
              "Psalm 56:3 - What time I am afraid, I will trust in thee."
            ],
            explanation:
              "Fear is overcome by God’s presence. He gives power, love, and a sound mind, assuring you that you are never alone."
          },

          guilty: {
            verses: [
              "1 John 1:9 - If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
              "Psalm 32:5 - I acknowledged my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the LORD; and thou forgavest the iniquity of my sin.",
              "Romans 8:1 - There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."
            ],
            explanation:
              "Guilt is lifted through confession and forgiveness. In Christ, there is freedom and no condemnation."
          },

          content: {
            verses: [
              "Philippians 4:11 - Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.",
              "1 Timothy 6:6 - But godliness with contentment is great gain.",
              "Hebrews 13:5 - Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee."
            ],
            explanation:
              "Contentment comes from trusting God’s provision. His presence is enough, and He never abandons you."
          },

          nervous: {
            verses: [
              "Joshua 1:9 - Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
              "Psalm 94:19 - In the multitude of my thoughts within me thy comforts delight my soul.",
              "Isaiah 35:4 - Say to them that are of a fearful heart, Be strong, fear not: behold, your God will come with vengeance, even God with a recompence; he will come and save you."
            ],
            explanation:
              "Nervousness is calmed when you remember God is with you. His comfort brings courage and assurance of salvation."
          },

          excited: {
            verses: [
              "Psalm 118:24 - This is the day which the LORD hath made; we will rejoice and be glad in it.",
              "Psalm 100:2 - Serve the LORD with gladness: come before his presence with singing.",
              "Luke 10:20 - Notwithstanding in this rejoice not, that the spirits are subject unto you; but rather rejoice, because your names are written in heaven."
            ],
            explanation:
              "Excitement rooted in the Lord is pure joy. Celebrate His goodness and the eternal hope of knowing your name is in heaven."
          },



           loved: {
    explanation: 'God’s love is eternal and unchanging. He gave Christ for us, and we are called His children — secure in His affection.',
    verses: [
      'Jeremiah 31:3 - The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee.',
      'Romans 5:8 - But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
      '1 John 3:1 - Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God.'
    ]
  },
  humbled: {
    explanation: 'Humility draws God’s favor. Bowing low before Him leads to exaltation and guidance in justice and mercy.',
    verses: [
      'James 4:10 - Humble yourselves in the sight of the Lord, and he shall lift you up.',
      'Micah 6:8 - He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
      '1 Peter 5:6 - Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time.'
    ]
  },
  insecure: {
    explanation: 'Insecurity fades when you remember your identity in Christ. You are wonderfully made, upheld by God, and inseparable from His love.',
    verses: [
      'Psalm 139:14 - I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',
      'Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
      'Romans 8:38-39 - For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers... shall be able to separate us from the love of God, which is in Christ Jesus our Lord.'
    ]
  },
  desperate: {
    explanation: 'Desperation leads to God. Like the thirsty deer or the woman reaching for Jesus’ garment, cry out — He will hear and respond.',
    verses: [
      'Psalm 42:1-2 - As the hart panteth after the water brooks, so panteth my soul after thee, O God. My soul thirsteth for God, for the living God.',
      'Mark 5:27-28 - When she had heard of Jesus, came in the press behind, and touched his garment. For she said, If I may touch but his clothes, I shall be whole.',
      'Jonah 2:2 - I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice.'
    ]
  },
  eager: {
    explanation: 'Eagerness for God’s Word and righteousness shows the Spirit at work. Let your hunger for Him lead to growth and faithful action.',
    verses: [
      'Psalm 119:20 - My soul breaketh for the longing that it hath unto thy judgments at all times.',
      '1 Peter 2:2 - As newborn babes, desire the sincere milk of the word, that ye may grow thereby:',
      'Titus 2:14 - Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works.'
    ]
  },
  bold: {
    explanation: 'Boldness comes from righteousness and hope. God gives courage to speak His Word and act with fearless confidence.',     
    verses: [
      'Proverbs 28:1 - The wicked flee when no man pursueth: but the righteous are bold as a lion.',
      'Acts 4:29 - And now, Lord, behold their threatenings: and grant unto thy servants, that with all boldness they may speak thy word.',
      '2 Corinthians 3:12 - Seeing then that we have such hope, we use great plainness of speech.'
    ]
  },
  restless: {
    explanation: 'Restlessness is quieted in Christ. The world cannot satisfy, but Jesus offers true rest to your soul.',
    verses: [
      'Matthew 11:28-29 - Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.',
      'Isaiah 57:20 - But the wicked are like the troubled sea, when it cannot rest, whose waters cast up mire and dirt.',
      'Psalm 62:1 - Truly my soul waiteth upon God: from him cometh my salvation.'
    ]
  },
  calm: {
    explanation: 'Calm comes from stillness in God. Trust Him, and His peace will guard your mind and heart, beyond all human understanding.',
    verses: [
      'Psalm 46:10 - Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
      'Isaiah 26:3 - Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.',
      'Philippians 4:7 - And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.'   
    ]
  },
  free: {
    explanation: 'True freedom is only in Christ. He breaks the chains of sin and death and calls you to live in His liberty.',
    verses: [
      'John 8:36 - If the Son therefore shall make you free, ye shall be free indeed.',
      'Romans 8:2 - For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death.',
      'Galatians 5:1 - Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage.'
    ]
  },
  trapped: {
    explanation: 'When you feel trapped, cry to God. He hears and delivers, breaking every snare and bringing liberty through His Spirit.',
    verses: [
      'Psalm 18:5-6 - The sorrows of hell compassed me about: the snares of death prevented me. In my distress I called upon the LORD, and cried unto my God: he heard my voice out of his temple, and my cry came before him, even into his ears.',
      'Psalm 124:7 - Our soul is escaped as a bird out of the snare of the fowlers: the snare is broken, and we are escaped.',
      '2 Corinthians 3:17 - Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty.'
    ]
  },
  overwhelmed: {
    explanation: 'In overwhelming times, God is your rock and refuge. He promises His presence in deep waters and rest for the weary.',   
    verses: [
      'Psalm 61:2 - From the end of the earth will I cry unto thee, when my heart is overwhelmed: lead me to the rock that is higher than I.',
      'Isaiah 43:2 - When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.',   
      'Matthew 11:28 - Come unto me, all ye that labour and are heavy laden, and I will give you rest.'
    ]
  },
  helpless: {
    explanation: 'God is the Helper of the helpless. When you cry to Him, He hears and provides strength and salvation through Christ.',  
    verses: [
      'Psalm 72:12 - For he shall deliver the needy when he crieth; the poor also, and him that hath no helper.',
      'Romans 5:6 - For when we were yet without strength, in due time Christ died for the ungodly.',
      'Psalm 121:1-2 - I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.'
    ]
  },
  empowered: {
    explanation: 'Empowerment comes from Christ’s strength and the Spirit’s power. God equips you with courage, love, and a sound mind.', 
    verses: [
      'Philippians 4:13 - I can do all things through Christ which strengtheneth me.',
      'Acts 1:8 - But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me...',
      '2 Timothy 1:7 - For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.'
    ]
  },
  mournful: {
    explanation: 'Mourning is not without hope. God comforts, promises joy after sorrow, and will one day wipe away every tear.',
    verses: [
      'Matthew 5:4 - Blessed are they that mourn: for they shall be comforted.',
      'Psalm 30:5 - For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning.',
      'Revelation 21:4 - And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain.'
    ]
  },
  hopeDrained: {
    explanation: 'When hope feels drained, remember God’s mercies are new every morning. He is the God of hope, ready to fill you again.',
    verses: [
      "Lamentations 3:21-23 - This I recall to my mind, therefore have I hope. It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
      'Romans 15:13 - Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.',
      'Psalm 42:11 - Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.'
    ]
  },
  faithful: {
    explanation: 'God’s faithfulness never fails. He keeps covenant, protects, and establishes you in His love and power.',
    verses: [
      '1 Corinthians 1:9 - God is faithful, by whom ye were called unto the fellowship of his Son Jesus Christ our Lord.',
      'Deuteronomy 7:9 - Know therefore that the LORD thy God, he is God, the faithful God, which keepeth covenant and mercy with them that love him...',
      '2 Thessalonians 3:3 - But the Lord is faithful, who shall stablish you, and keep you from evil.'
    ]
  },
  rejected: {
    explanation: 'Even when others reject you, God receives you and calls you chosen. His love is constant and unfailing.',
    verses: [
      'Psalm 27:10 - When my father and my mother forsake me, then the LORD will take me up.',
      'Isaiah 41:9 - Thou whom I have taken from the ends of the earth, and called thee from the chief men thereof, and said unto thee, Thou art my servant; I have chosen thee, and not cast thee away.',
      'John 6:37 - All that the Father giveth me shall come to me; and him that cometh to me I will in no wise cast out.',
      '1 Peter 2:4 - To whom coming, as unto a living stone, disallowed indeed of men, but chosen of God, and precious,'
    ]
  },
  anguished: {
    explanation: 'God is the Father of mercies who comforts you in anguish and gives strength to comfort others.',
    verses: [
      'Psalm 31:9 - Have mercy upon me, O LORD, for I am in trouble: mine eye is consumed with grief, yea, my soul and my belly.',        
      '2 Corinthians 1:3-4 - Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble, by the comfort wherewith we ourselves are comforted of God.',
      'Psalm 42:11 - Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.',
      'Matthew 5:4 - Blessed are they that mourn: for they shall be comforted.'
    ]
  },
  fulfilled: {
    explanation: 'True fulfillment comes only from Christ, who satisfies your soul and fills you with His goodness.',
    verses: [
      'John 6:35 - And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.',
      'Psalm 107:9 - For he satisfieth the longing soul, and filleth the hungry soul with goodness.',
      'Philippians 4:19 - But my God shall supply all your need according to his riches in glory by Christ Jesus.',
      'Psalm 23:1 - The LORD is my shepherd; I shall not want.'
    ]
  },
  patient: {
    explanation: 'Patience is developed through trials. It shapes you into maturity and wholeness in Christ.',
    verses: [
      'Romans 12:12 - Rejoicing in hope; patient in tribulation; continuing instant in prayer;',
      'James 1:4 - But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.',
      'Hebrews 10:36 - For ye have need of patience, that, after ye have done the will of God, ye might receive the promise.',
      'Psalm 37:7 - Rest in the LORD, and wait patiently for him: fret not thyself because of him who prospereth in his way, because of the man who bringeth wicked devices to pass.'
    ]
  },
  lively: {
    explanation: 'In Christ, you are alive and vibrant, part of His living temple, with abundant life.',
    verses: [
      '1 Peter 2:5 - Ye also, as lively stones, are built up a spiritual house, an holy priesthood, to offer up spiritual sacrifices, acceptable to God by Jesus Christ.',
      'John 10:10 - The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.',
      'Romans 6:11 - Likewise reckon ye also yourselves to be dead indeed unto sin, but alive unto God through Jesus Christ our Lord.',   
      'Galatians 2:20 - I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.'
    ]
  },
  inspired: {
    explanation: 'God inspires by His Word and Spirit, filling you with wisdom, creativity, and guidance.',
    verses: [
      '2 Timothy 3:16 - All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:',
      'Exodus 35:31 - And he hath filled him with the spirit of God, in wisdom, in understanding, and in knowledge, and in all manner of workmanship;',
      'Job 32:8 - But there is a spirit in man: and the inspiration of the Almighty giveth them understanding.',
      'Micah 3:8 - But truly I am full of power by the spirit of the LORD, and of judgment, and of might, to declare unto Jacob his transgression, and to Israel his sin.'
    ]
  },
  conflicted: {
    explanation: 'Conflict within is real, but in Christ there is no condemnation. The Spirit enables you to overcome the pull of the flesh.',
    verses: [
      'Romans 7:19 - For the good that I would I do not: but the evil which I would not, that I do.',
      'Galatians 5:17 - For the flesh lusteth against the Spirit, and the Spirit against the flesh: and these are contrary the one to the other: so that ye cannot do the things that ye would.',
      'James 1:8 - A double minded man is unstable in all his ways.',
      'Romans 8:1 - There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.'
    ]
  },
  distracted: {
    explanation: 'Distractions fade when your focus is set on Christ. Keep your eyes on Him, the author and finisher of your faith.',     
    verses: [
      'Luke 10:41-42 - And Jesus answered and said unto her, Martha, Martha, thou art careful and troubled about many things: But one thing is needful: and Mary hath chosen that good part, which shall not be taken away from her.',
      'Colossians 3:2 - Set your affection on things above, not on things on the earth.',
      'Proverbs 4:25 - Let thine eyes look right on, and let thine eyelids look straight before thee.',
      'Hebrews 12:2 - Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God.'
    ]
  },
  watchful: {
    explanation: 'A watchful heart stays alert in prayer and guards against temptation, standing firm against the enemy.',
    verses: [
      'Matthew 26:41 - Watch and pray, that ye enter not into temptation: the spirit indeed is willing, but the flesh is weak.',
      '1 Peter 5:8 - Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour:',
      'Colossians 4:2 - Continue in prayer, and watch in the same with thanksgiving;',
      '1 Thessalonians 5:6 - Therefore let us not sleep, as do others; but let us watch and be sober.'
    ]
  },
  sleepy: {
    explanation: 'God calls you to awaken from spiritual sleep and be ready, for Christ’s return is nearer than ever.',
    verses: [
      'Romans 13:11 - And that, knowing the time, that now it is high time to awake out of sleep: for now is our salvation nearer than when we believed.',
      'Matthew 25:5-6 - While the bridegroom tarried, they all slumbered and slept. And at midnight there was a cry made, Behold, the bridegroom cometh; go ye out to meet him.',
      'Ephesians 5:14 - Wherefore he saith, Awake thou that sleepest, and arise from the dead, and Christ shall give thee light.',        
      '1 Thessalonians 5:7 - For they that sleep sleep in the night; and they that be drunken are drunken in the night.'
    ]
  },
  warm: {
    explanation: 'Warmth comes from God’s love flowing through you in kindness, affection, and hospitality.',
    verses: [
      'Romans 12:10 - Be kindly affectioned one to another with brotherly love; in honour preferring one another;',
      '1 John 4:7 - Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.',    
      'Hebrews 13:1-2 - Let brotherly love continue. Be not forgetful to entertain strangers: for thereby some have entertained angels unawares.',
      'Proverbs 15:30 - The light of the eyes rejoiceth the heart: and a good report maketh the bones fat.'
    ]
  },
  cold: {
    explanation: 'When love grows cold, cling to God’s mercy and stir up your zeal through His Spirit.',
    verses: [
      'Matthew 24:12 - And because iniquity shall abound, the love of many shall wax cold.',
      'Revelation 3:15-16 - I know thy works, that thou art neither cold nor hot: I would thou wert cold or hot. So then because thou art lukewarm, and neither cold nor hot, I will spue thee out of my mouth.',
      '2 Timothy 3:1-2 - This know also, that in the last days perilous times shall come. For men shall be lovers of their own selves, covetous, boasters, proud, blasphemers, disobedient to parents, unthankful, unholy,',
      'Jude 1:21 - Keep yourselves in the love of God, looking for the mercy of our Lord Jesus Christ unto eternal life.'
    ]
  },
  withdrawn: {
    explanation: 'Even in moments of withdrawal and loneliness, God is your refuge, strength, and constant companion.',
    verses: [
      'Psalm 142:4 - I looked on my right hand, and beheld, but there was no man that would know me: refuge failed me; no man cared for my soul.',
      'Psalm 62:8 - Trust in him at all times; ye people, pour out your heart before him: God is a refuge for us. Selah.',
      'Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.',
      'John 14:18 - I will not leave you comfortless: I will come to you.'
    ]
  },
  foolish: {
    explanation: 'Foolishness rejects God’s wisdom, but His Word is ready to turn the simple into the wise.',
    verses: [
      'Proverbs 1:7 - The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.',
      "Ecclesiastes 10:2 - A wise man's heart is at his right hand; but a fool's heart at his left.",
      'Matthew 7:26 - And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand:',
      'Proverbs 14:9 - Fools make a mock at sin: but among the righteous there is favour.'
    ]
  },
  wise: {
    explanation: 'Wisdom begins with fearing the Lord and grows as you walk in His Word and seek Him in prayer.',
    verses: [
      'Proverbs 9:10 - The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.',
      'James 1:5 - If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
      'Proverbs 3:13 - Happy is the man that findeth wisdom, and the man that getteth understanding.',
      'Colossians 4:5 - Walk in wisdom toward them that are without, redeeming the time.'
    ]
  },
  growing: {
    explanation: 'Growth in Christ is God’s work through His Word, Spirit, and faithful obedience in love.',
    verses: [
      '2 Peter 3:18 - But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ. To him be glory both now and for ever. Amen.',
      'Ephesians 4:15 - But speaking the truth in love, may grow up into him in all things, which is the head, even Christ:',
      'Colossians 1:10 - That ye might walk worthy of the Lord unto all pleasing, being fruitful in every good work, and increasing in the knowledge of God;',
      '1 Corinthians 3:7 - So then neither is he that planteth any thing, neither he that watereth; but God that giveth the increase.'    
    ]
  },
  lustful: {
    explanation: 'Lust is destructive, but victory comes by fleeing it and clothing yourself with Christ.',
    verses: [
      '2 Timothy 2:22 - Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart.',
      'Matthew 5:28 - But I say unto you, That whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart.',
      '1 John 2:16 - For all that is in the world, the lust of the flesh, and the lust of the eyes, and the pride of life, is not of the Father, but is of the world.',
      'Romans 13:14 - But put ye on the Lord Jesus Christ, and make not provision for the flesh, to fulfil the lusts thereof.'
    ]
  },
  lost: {
    explanation: 'Even when you feel lost, Christ came to seek and save you. His love reaches to bring you home.',
    verses: [
      'Luke 19:10 - For the Son of man is come to seek and to save that which was lost.',
      'Isaiah 53:6 - All we like sheep have gone astray; we have turned every one to his own way; and the LORD hath laid on him the iniquity of us all.',
      'Matthew 18:12 - How think ye? if a man have an hundred sheep, and one of them be gone astray, doth he not leave the ninety and nine, and goeth into the mountains, and seeketh that which is gone astray?',
      'Ezekiel 34:16 - I will seek that which was lost, and bring again that which was driven away, and will bind up that which was broken, and will strengthen that which was sick...'
    ]
  },
  found: {
    explanation: 'Being found in Christ is the greatest joy—He restores, redeems, and brings you into His kingdom.',
    verses: [
      'Luke 15:6 - And when he cometh home, he calleth together his friends and neighbours, saying unto them, Rejoice with me; for I have found my sheep which was lost.',
      'Luke 15:24 - For this my son was dead, and is alive again; he was lost, and is found. And they began to be merry.',
      'John 1:41 - He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ.',
      'Matthew 13:44 - Again, the kingdom of heaven is like unto treasure hid in a field; the which when a man hath found, he hideth...'  
    ]
  },
  secure: {
    explanation: 'True security is in God alone—He is your fortress, peace, and keeper of your soul.',
    verses: [
      'Proverbs 18:10 - The name of the LORD is a strong tower: the righteous runneth into it, and is safe.',
      'John 10:28 - And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand.',    
      'Psalm 91:2 - I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.',
      'Isaiah 26:3 - Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.'
    ]
  },
  unloved: {
    explanation: 'Even when you feel unloved, God’s everlasting love surrounds you, proven by Christ’s sacrifice.',
    verses: [
      'Romans 5:8 - But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
      'Jeremiah 31:3 - The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee.',
      'John 15:13 - Greater love hath no man than this, that a man lay down his life for his friends.',
      '1 John 3:1 - Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God...'
    ]
  },
  focused: {
    explanation: 'Focus means fixing your eyes on Christ and pressing toward His calling without distraction.',
    verses: [
      'Philippians 3:13-14 - Brethren, I count not myself to have apprehended: but this one thing I do, forgetting those things which are behind, and reaching forth unto those things which are before, I press toward the mark for the prize of the high calling of God in Christ Jesus.',
      'Hebrews 12:2 - Looking unto Jesus the author and finisher of our faith...',
      'Colossians 3:2 - Set your affection on things above, not on things on the earth.',
      'Proverbs 4:25 - Let thine eyes look right on, and let thine eyelids look straight before thee.'
    ]
  },
  protective: {
    explanation: 'God is your protector. He preserves your soul and keeps you from the enemy’s snares.',
    verses: [
      'Psalm 121:7 - The LORD shall preserve thee from all evil: he shall preserve thy soul.',
      'Isaiah 54:17 - No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn...',
      'Psalm 91:11 - For he shall give his angels charge over thee, to keep thee in all thy ways.',
      '2 Thessalonians 3:3 - But the Lord is faithful, who shall stablish you, and keep you from evil.'
    ]
  },
  determined: {
    explanation: 'Determination in Christ gives strength to endure and finish the race of faith with victory.',
    verses: [
      'Luke 9:62 - And Jesus said unto him, No man, having put his hand to the plough, and looking back, is fit for the kingdom of God.', 
      'Philippians 4:13 - I can do all things through Christ which strengtheneth me.',
      '2 Timothy 4:7 - I have fought a good fight, I have finished my course, I have kept the faith:',
      'Hebrews 12:1 - Let us run with patience the race that is set before us,'
    ]
  },
  faithless: {
    explanation: 'When faith feels weak, God invites you to cry out for help and build faith through His Word.',
    verses: [
      'Hebrews 11:6 - But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.',
      'Mark 9:24 - And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief.',    
      'Romans 10:17 - So then faith cometh by hearing, and hearing by the word of God.',
      'James 1:6 - But let him ask in faith, nothing wavering...'
    ]
  },
  unforgiving: {
    explanation: 'Unforgiveness blocks God’s flow of mercy. Forgive as Christ forgave you, freely and fully.',
    verses: [
      'Matthew 6:14-15 - For if ye forgive men their trespasses, your heavenly Father will also forgive you: But if ye forgive not men their trespasses, neither will your Father forgive your trespasses.',
      "Ephesians 4:32 - And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
      'Colossians 3:13 - Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.',
      'Mark 11:25 - And when ye stand praying, forgive, if ye have ought against any: that your Father also which is in heaven may forgive you your trespasses.'
    ]
  },
  diligent: {
    explanation: 'Diligence honors God and leads to fruitfulness. He rewards those who seek and serve Him earnestly.',
    verses: [
      'Proverbs 22:29 - Seest thou a man diligent in his business? he shall stand before kings; he shall not stand before mean men.',     
      'Hebrews 11:6 - But without faith it is impossible to please him... and that he is a rewarder of them that diligently seek him.',   
      '2 Peter 1:10 - Wherefore the rather, brethren, give diligence to make your calling and election sure: for if ye do these things, ye shall never fall:',
      'Romans 12:11 - Not slothful in business; fervent in spirit; serving the Lord;'
    ]
  },
  grieving: {
    explanation: 'In grief, God draws near to the brokenhearted and promises eternal comfort where sorrow will be no more.',
    verses: [
      'Psalm 34:18 - The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.',
      'Matthew 5:4 - Blessed are they that mourn: for they shall be comforted.',
      'John 16:22 - And ye now therefore have sorrow: but I will see you again, and your heart shall rejoice, and your joy no man taketh from you.',
      'Revelation 21:4 - And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.'
    ]
  },
  comforted: {
    explanation: 'God Himself is the source of all true comfort, strengthening you in trouble and assuring His presence with you.',       
    verses: [
      '2 Corinthians 1:3-4 - Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble, by the comfort wherewith we ourselves are comforted of God.',
      'Psalm 119:50 - This is my comfort in my affliction: for thy word hath quickened me.',
      'Isaiah 51:12 - I, even I, am he that comforteth you: who art thou, that thou shouldest be afraid of a man that shall die, and of the son of man which shall be made as grass;',
      'John 14:18 - I will not leave you comfortless: I will come to you.'
    ]
  },
  revived: {
    explanation: 'Revival comes from God’s Spirit, renewing our hearts and restoring joy in Him.',
    verses: [
      'Wilt thou not revive us again: that thy people may rejoice in thee? (Psalm 85:6)',
      'Though I walk in the midst of trouble, thou wilt revive me. (Psalm 138:7)',
      'The law of the LORD is perfect, converting the soul. (Psalm 19:7)'
    ]
  },
  emptied: {
    explanation: 'Being emptied of self allows God’s strength and grace to fill and empower you for His purpose.',
    verses: [
      'Philippians 2:7 - But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men:',
      '2 Corinthians 12:9 - And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.',
      'John 3:30 - He must increase, but I must decrease.',
      'Galatians 2:20 - I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.'
    ]
  },
  restored: {
    explanation: 'God restores broken souls, lost years, and wounded hearts, making you whole and steadfast again.',
    verses: [
      "Psalm 23:3 - He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
      'Joel 2:25 - And I will restore to you the years that the locust hath eaten, the cankerworm, and the caterpiller, and the palmerworm, my great army which I sent among you.',
      '1 Peter 5:10 - But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, after that ye have suffered a while, make you perfect, stablish, strengthen, settle you.',
      'Jeremiah 30:17 - For I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD;'
    ]
  },
  zealous: {
    explanation: 'Zeal for God shows itself in fervent love, good works, and a passionate pursuit of holiness.',
    verses: [
      'Titus 2:14 - Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works.',
      'Romans 12:11 - Not slothful in business; fervent in spirit; serving the Lord;',
      'Galatians 4:18 - But it is good to be zealously affected always in a good thing, and not only when I am present with you.',        
      'Revelation 3:19 - As many as I love, I rebuke and chasten: be zealous therefore, and repent.'
    ]
  },
  hungry: {
    explanation: 'Hunger for God’s righteousness will always be satisfied by Christ, the Bread of Life.',
    verses: [
      'Matthew 5:6 - Blessed are they which do hunger and thirst after righteousness: for they shall be filled.',
      'Psalm 107:9 - For he satisfieth the longing soul, and filleth the hungry soul with goodness.',
      'John 6:35 - And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.',
      'Isaiah 55:2 - Wherefore do ye spend money for that which is not bread? and your labour for that which satisfieth not? hearken diligently unto me, and eat ye that which is good, and let your soul delight itself in fatness.'
    ]
  },
  thirsty: {
    explanation: 'Thirst for God draws you to His Spirit, who alone can refresh, satisfy, and give life everlasting.',
    verses: [
      'John 7:37 - In the last day, that great day of the feast, Jesus stood and cried, saying, If any man thirst, let him come unto me, and drink.',
      'Isaiah 44:3 - For I will pour water upon him that is thirsty, and floods upon the dry ground: I will pour my spirit upon thy seed, and my blessing upon thine offspring:',
      'Revelation 22:17 - And the Spirit and the bride say, Come. And let him that heareth say, Come. And let him that is athirst come. And whosoever will, let him take the water of life freely.',
      'Psalm 42:2 - My soul thirsteth for God, for the living God: when shall I come and appear before God?'
    ]
  },
  satisfied: {
    explanation: 'True satisfaction is found in God’s presence, His goodness, and learning contentment in Him.',
    verses: [
      'Psalm 17:15 - As for me, I will behold thy face in righteousness: I shall be satisfied, when I awake, with thy likeness.',
      'Psalm 107:9 - For he satisfieth the longing soul, and filleth the hungry soul with goodness.',
      'Philippians 4:11 - Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.',   
      'Proverbs 19:23 - The fear of the LORD tendeth to life: and he that hath it shall abide satisfied; he shall not be visited with evil.'
    ]
  },
  unsatisfied: {
    explanation: 'Chasing worldly things leaves you unsatisfied, but only God provides lasting fulfillment.',
    verses: [
      'Ecclesiastes 5:10 - He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity.',
      'Isaiah 55:2 - Wherefore do ye spend money for that which is not bread? and your labour for that which satisfieth not? hearken diligently unto me, and eat ye that which is good, and let your soul delight itself in fatness.',
      'Jeremiah 2:13 - For my people have committed two evils; they have forsaken me the fountain of living waters, and hewed them out cisterns, broken cisterns, that can hold no water.',
      'Haggai 1:6 - Ye have sown much, and bring in little; ye eat, but ye have not enough; ye drink, but ye are not filled with drink; ye clothe you, but there is none warm; and he that earneth wages earneth wages to put it into a bag with holes.'
    ]
  },
  prayerful: {
    explanation: 'A prayerful life is one of constant communion with God, trusting Him with every care and giving thanks.',
    verses: [
      '1 Thessalonians 5:17 - Pray without ceasing.',
      'Philippians 4:6 - Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
      'Luke 18:1 - And he spake a parable unto them to this end, that men ought always to pray, and not to faint;',
      'Colossians 4:2 - Continue in prayer, and watch in the same with thanksgiving;'
    ]
  },
  'distant-from-God': {
    explanation: 'Distance from God comes through sin and neglect, but repentance and seeking Him draws you back near.',
    verses: [
      'Isaiah 59:2 - But your iniquities have separated between you and your God, and your sins have hid his face from you, that he will not hear.',
      'Hosea 11:7 - And my people are bent to backsliding from me: though they called them to the most High, none at all would exalt him.',
      'Revelation 2:4 - Nevertheless I have somewhat against thee, because thou hast left thy first love.',
      'James 4:8 - Draw nigh to God, and he will draw nigh to you. Cleanse your hands, ye sinners; and purify your hearts, ye double minded.'
    ]
  },
  'close-to-God': {
    explanation: 'Closeness to God comes through trust, purity, and abiding in Christ, the true Vine.',
    verses: [
      'Psalm 73:28 - But it is good for me to draw near to God: I have put my trust in the Lord GOD, that I may declare all thy works.',  
      'James 4:8 - Draw nigh to God, and he will draw nigh to you. Cleanse your hands, ye sinners; and purify your hearts, ye double minded.',
      'Hebrews 10:22 - Let us draw near with a true heart in full assurance of faith, having our hearts sprinkled from an evil conscience, and our bodies washed with pure water.',
      'John 15:5 - I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.'
    ]
  },
  obedient: {
    explanation: 'Obedience is the true expression of love for God and brings His blessing and favor.',
    verses: [
      'John 14:15 - If ye love me, keep my commandments.',
      '1 Samuel 15:22 - And Samuel said, Hath the LORD as great delight in burnt offerings and sacrifices, as in obeying the voice of the LORD? Behold, to obey is better than sacrifice, and to hearken than the fat of rams.',
      'James 1:22 - But be ye doers of the word, and not hearers only, deceiving your own selves.',
      'Deuteronomy 28:1 - And it shall come to pass, if thou shalt hearken diligently unto the voice of the LORD thy God, to observe and to do all his commandments which I command thee this day, that the LORD thy God will set thee on high above all nations of the earth:'     
    ]
  },
  rebellious: {
    explanation: 'Rebellion hardens the heart against God, but He still shows mercy and calls the rebellious to repentance.',
    verses: [
      'Isaiah 30:1 - Woe to the rebellious children, saith the LORD, that take counsel, but not of me; and that cover with a covering, but not of my spirit, that they may add sin to sin:',
      'Ezekiel 2:5 - And they, whether they will hear, or whether they will forbear, (for they are a rebellious house,) yet shall know that there hath been a prophet among them.',
      'Nehemiah 9:17 - And refused to obey, neither were mindful of thy wonders that thou didst among them; but hardened their necks, and in their rebellion appointed a captain to return to their bondage: but thou art a God ready to pardon, gracious and merciful, slow to anger, and of great kindness, and forsookest them not.',
      'Proverbs 17:11 - An evil man seeketh only rebellion: therefore a cruel messenger shall be sent against him.'
    ]
  },
  'ashamed-of-sin': {
    explanation: 'Being ashamed of sin is a step toward godly sorrow that leads to true repentance and life.',
    verses: [
      'Ezra 9:6 - And said, O my God, I am ashamed and blush to lift up my face to thee, my God: for our iniquities are increased over our head, and our trespass is grown up unto the heavens.',
      'Romans 6:21 - What fruit had ye then in those things whereof ye are now ashamed? for the end of those things is death.',
      'Jeremiah 3:25 - We lie down in our shame, and our confusion covereth us: for we have sinned against the LORD our God, we and our fathers, from our youth even unto this day, and have not obeyed the voice of the LORD our God.',
      '2 Corinthians 7:10 - For godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death.'
    ]
  },
  convicted: {
    explanation: 'Conviction is the Spirit and Word of God piercing the heart, leading you to repentance and righteousness.',
    verses: [
      'John 16:8 - And when he is come, he will reprove the world of sin, and of righteousness, and of judgment:',
      'Acts 2:37 - Now when they heard this, they were pricked in their heart, and said unto Peter and to the rest of the apostles, Men and brethren, what shall we do?',
      'Hebrews 4:12 - For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.',
      'Romans 2:15 - Which shew the work of the law written in their hearts, their conscience also bearing witness, and their thoughts the mean while accusing or else excusing one another;)'
    ]
  },
  purified: {
    explanation: 'Purification comes through Christ’s redemption and obedience to God’s Word, making you holy and set apart for Him.',    
    verses: [
      '1 John 3:3 - And every man that hath this hope in him purifieth himself, even as he is pure.',
      'Titus 2:14 - Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works.',
      'Psalm 119:9 - Wherewithal shall a young man cleanse his way? by taking heed thereto according to thy word.',
      'Malachi 3:3 - And he shall sit as a refiner and purifier of silver: and he shall purify the sons of Levi, and purge them as gold and silver, that they may offer unto the LORD an offering in righteousness.'
    ]
  },
  cleansed: {
    explanation: 'Cleansing comes by the blood of Jesus, washing away sin and renewing you to serve the living God.',
    verses: [
      '1 John 1:9 - If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.', 
      'Psalm 51:2 - Wash me throughly from mine iniquity, and cleanse me from my sin.',
      'Hebrews 9:14 - How much more shall the blood of Christ, who through the eternal Spirit offered himself without spot to God, purge your conscience from dead works to serve the living God?',
      'Ezekiel 36:25 - Then will I sprinkle clean water upon you, and ye shall be clean: from all your filthiness, and from all your idols, will I cleanse you.'
    ]
  },
  expectant: {
    explanation: 'Living expectantly means waiting in hope and confidence on God, knowing He will fulfill His promises.',
    verses: [
      'Psalm 62:5 - My soul, wait thou only upon God; for my expectation is from him.',
      'Philippians 1:20 - According to my earnest expectation and my hope, that in nothing I shall be ashamed, but that with all boldness, as always, so now also Christ shall be magnified in my body, whether it be by life, or by death.',
      'Proverbs 23:18 - For surely there is an end; and thine expectation shall not be cut off.',
      'Micah 7:7 - Therefore I will look unto the LORD; I will wait for the God of my salvation: my God will hear me.'
    ]
  },
  hopeless: {
    explanation: 'Even in hopeless times, God’s mercy and Spirit restore hope and joy.',
    verses: [
      "Lamentations 3:21-22 - This I recall to my mind, therefore have I hope. It is of the LORD'S mercies that we are not consumed, because his compassions fail not.",
      'Romans 15:13 - Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.',
      'Psalm 42:11 - Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.'
    ]
  },
  'loved-by-God': {
    explanation: 'You are deeply loved by God with an everlasting and sacrificial love.',
    verses: [
      'Jeremiah 31:3 - The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee.',
      'Romans 5:8 - But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.',
      '1 John 3:1 - Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God: therefore the world knoweth us not, because it knew him not.'
    ]
  },
  abandoned: {
    explanation: 'Even when people abandon you, God never forsakes or forgets you.',
    verses: [
      'Psalm 27:10 - When my father and my mother forsake me, then the LORD will take me up.',
      'Hebrews 13:5 - For he hath said, I will never leave thee, nor forsake thee.',
      'Isaiah 49:15 - Can a woman forget her sucking child, that she should not have compassion on the son of her womb? yea, they may forget, yet will I not forget thee.'
    ]
  },
  uplifted: {
    explanation: 'The Lord is the lifter of your head, giving renewed strength and honor.',
    verses: [
      'Psalm 3:3 - But thou, O LORD, art a shield for me; my glory, and the lifter up of mine head.',
      'Isaiah 40:31 - But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
      'James 4:10 - Humble yourselves in the sight of the Lord, and he shall lift you up.'
    ]
  },
  disciplined: {
    explanation: 'Discipline is a sign of God’s love, shaping you for holiness and maturity.',
    verses: [
      'Hebrews 12:6 - For whom the Lord loveth he chasteneth, and scourgeth every son whom he receiveth.',
      'Proverbs 3:11-12 - My son, despise not the chastening of the LORD; neither be weary of his correction: For whom the LORD loveth he correcteth; even as a father the son in whom he delighteth.',
      'Revelation 3:19 - As many as I love, I rebuke and chasten: be zealous therefore, and repent.'
    ]
  },
  refreshed: {
    explanation: 'The presence of the Lord brings refreshing and rest for your soul.',
    verses: [
      'Acts 3:19 - Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord.',
      'Proverbs 11:25 - The liberal soul shall be made fat: and he that watereth shall be watered also himself.',
      'Matthew 11:29 - Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.' 
    ]
  },
  weary: {
    explanation: 'In weariness, God strengthens and promises rest for the faithful.',
    verses: [
      'Galatians 6:9 - And let us not be weary in well doing: for in due season we shall reap, if we faint not.',
      'Isaiah 40:29 - He giveth power to the faint; and to them that have no might he increaseth strength.',
      'Matthew 11:28 - Come unto me, all ye that labour and are heavy laden, and I will give you rest.'
    ]
  },
  tested: {
    explanation: 'Tests refine your faith like gold, bringing eternal reward in Christ.',
    verses: [
      '1 Peter 1:7 - That the trial of your faith, being much more precious than of gold that perisheth, though it be tried with fire, might be found unto praise and honour and glory at the appearing of Jesus Christ:',
      'James 1:12 - Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him.',
      'Psalm 66:10 - For thou, O God, hast proved us: thou hast tried us, as silver is tried.'
    ]
  },
  'tempted-beyond': {
    explanation: 'God never allows temptation beyond your strength and always provides a way of escape.',
    verses: [
      '1 Corinthians 10:13 - There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.',
      'Hebrews 2:18 - For in that he himself hath suffered being tempted, he is able to succour them that are tempted.',
      '2 Peter 2:9 - The Lord knoweth how to deliver the godly out of temptations, and to reserve the unjust unto the day of judgment to be punished.'
    ]
  },
  delivered: {
    explanation: 'The Lord delivers from fear, evil, and darkness, bringing you into His kingdom.',
    verses: [
      'Psalm 34:4 - I sought the LORD, and he heard me, and delivered me from all my fears.',
      '2 Timothy 4:18 - And the Lord shall deliver me from every evil work, and will preserve me unto his heavenly kingdom: to whom be glory for ever and ever. Amen.',
      'Colossians 1:13 - Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son:'      
    ]
  },
  guided: {
    explanation: 'God guides by His Spirit, Word, and eye of care in all seasons.',
    verses: [
      'Psalm 32:8 - I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.',
      'Isaiah 58:11 - And the LORD shall guide thee continually, and satisfy thy soul in drought, and make fat thy bones: and thou shalt be like a watered garden, and like a spring of water, whose waters fail not.',
      'John 16:13 - Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come.'
    ]
  },
  misunderstood: {
    explanation: 'Christ Himself was misunderstood and rejected, so He understands and comforts you.',
    verses: [
      'John 15:18 - If the world hate you, ye know that it hated me before it hated you.',
      'Psalm 69:20 - Reproach hath broken my heart; and I am full of heaviness: and I looked for some to take pity, but there was none; and for comforters, but I found none.',
      'Isaiah 53:3 - He is despised and rejected of men; a man of sorrows, and acquainted with grief: and we hid as it were our faces from him; he was despised, and we esteemed him not.'
    ]
  },
  accepted: {
    explanation: 'In Christ, you are accepted, welcomed, and never cast out.',
    verses: [
      'Ephesians 1:6 - To the praise of the glory of his grace, wherein he hath made us accepted in the beloved.',
      'Romans 15:7 - Wherefore receive ye one another, as Christ also received us to the glory of God.',
      'John 6:37 - All that the Father giveth me shall come to me; and him that cometh to me I will in no wise cast out.'
    ]
  },
  comfortless: {
    explanation: 'Jesus promises not to leave you comfortless but to be your Comforter through His Spirit.',
    verses: [
      'John 14:18 - I will not leave you comfortless: I will come to you.',
      'Isaiah 66:13 - As one whom his mother comforteth, so will I comfort you; and ye shall be comforted in Jerusalem.',
      '2 Corinthians 1:3-4 - Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation...'
    ]
  },
  strengthened: {
    explanation: 'Christ strengthens you inwardly and outwardly by His Spirit and presence.',
    verses: [
      'Philippians 4:13 - I can do all things through Christ which strengtheneth me.',
      'Ephesians 3:16 - That he would grant you, according to the riches of his glory, to be strengthened with might by his Spirit in the inner man;',
      'Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.'
    ]
  },
  protected: {
    explanation: 'The Lord is your shield and tower of protection, keeping you from harm.',
    verses: [
      'Psalm 91:4 - He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.',
      'Proverbs 18:10 - The name of the LORD is a strong tower: the righteous runneth into it, and is safe.',
      '2 Thessalonians 3:3 - But the Lord is faithful, who shall stablish you, and keep you from evil.'
    ]
  },
  covered: {
    explanation: 'You are covered by forgiveness and the shelter of God’s presence.',
    verses: [
      'Psalm 32:1 - Blessed is he whose transgression is forgiven, whose sin is covered.',
      'Romans 4:7 - Saying, Blessed are they whose iniquities are forgiven, and whose sins are covered.',
      'Psalm 91:1 - He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.'
    ]
  },
  open: {
    explanation: 'God opens doors no man can shut and welcomes you into His blessings.',
    verses: [
      'Revelation 3:8 - I know thy works: behold, I have set before thee an open door, and no man can shut it...',
      'Matthew 7:7 - Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you:',
      'Acts 14:27 - And when they were come, and had gathered the church together, they rehearsed all that God had done with them, and how he had opened the door of faith unto the Gentiles.'
    ]
  },
  closed: {
    explanation: 'When God closes a door, it is for your protection and His greater plan.',
    verses: [
      'Job 12:14 - Behold, he breaketh down, and it cannot be built again: he shutteth up a man, and there can be no opening.',
      'Revelation 3:7 - These things saith he that is holy, he that is true, he that hath the key of David, he that openeth, and no man shutteth; and shutteth, and no man openeth;',
      'Nahum 1:7 - The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.'
    ]
  },
  waiting: {
    explanation: 'Waiting on the Lord brings renewal, courage, and salvation in His perfect timing.',
    verses: [
      'Isaiah 40:31 - But they that wait upon the LORD shall renew their strength...',
      'Psalm 27:14 - Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.',
      'Lamentations 3:25-26 - The LORD is good unto them that wait for him, to the soul that seeketh him. It is good that a man should both hope and quietly wait for the salvation of the LORD.'
    ]
  },
  hurried: {
    explanation: 'When life feels rushed and hurried, God calls us to stillness and rest in Him.',
    verses: [
      'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth. (Psalm 46:10)',
      'Rest in the LORD, and wait patiently for him: fret not thyself because of him who prospereth in his way. (Psalm 37:7)',
      'Come unto me, all ye that labour and are heavy laden, and I will give you rest. (Matthew 11:28)'
    ]
  },
  'peace-filled': {
    explanation: 'Peace is not from the world, but a gift from Christ to those who trust in Him.',
    verses: [
      'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus. (Philippians 4:7)',  
      'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee. (Isaiah 26:3)',
      'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. (John 14:27)'
    ]
  },
  angst: {
    explanation: 'When anxious or restless, we can cast our burdens on the Lord, who hears and cares.',
    verses: [
      'In the day of my trouble I will call upon thee: for thou wilt answer me. (Psalm 86:7)',
      'Casting all your care upon him; for he careth for you. (1 Peter 5:7)',
      'Why art thou cast down, O my soul? and why art thou disquieted in me? hope thou in God. (Psalm 42:11)'
    ]
  },
  encouraged: {
    explanation: 'Encouragement comes from God’s presence and the building up of one another in faith.',
    verses: [
      'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee. (Deuteronomy 31:6)',
      'Wait on the LORD: be of good courage, and he shall strengthen thine heart. (Psalm 27:14)',
      'Wherefore comfort yourselves together, and edify one another, even as also ye do. (1 Thessalonians 5:11)'
    ]
  },
  overflowing: {
    explanation: 'God’s blessings overflow in the lives of His children, filling them with joy and abundance.',
    verses: [
      'My cup runneth over. (Psalm 23:5)',
      'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope. (Romans 15:13)',
      'Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over. (Luke 6:38)'
    ]
  },
  dry: {
    explanation: 'When spiritually dry, God promises to pour out His Spirit and refresh the soul.',
    verses: [
      'O God, thou art my God; early will I seek thee: my soul thirsteth for thee, my flesh longeth for thee in a dry and thirsty land, where no water is. (Psalm 63:1)',
      'For I will pour water upon him that is thirsty, and floods upon the dry ground. (Isaiah 44:3)',
      'Come unto me, all ye that thirst, come ye to the waters. (Isaiah 55:1)'
    ]
  },
  burdened: {
    explanation: 'Christ invites the weary and burdened to find rest in Him.',
    verses: [
      'Come unto me, all ye that labour and are heavy laden, and I will give you rest. (Matthew 11:28)',
      'Cast thy burden upon the LORD, and he shall sustain thee. (Psalm 55:22)',
      'Casting all your care upon him; for he careth for you. (1 Peter 5:7)'
    ]
  },
  released: {
    explanation: 'God releases His people from bondage, giving freedom in Christ.',
    verses: [
      'If the Son therefore shall make you free, ye shall be free indeed. (John 8:36)',
      'The Spirit of the Lord is upon me… to preach deliverance to the captives. (Luke 4:18)',
      'Stand fast therefore in the liberty wherewith Christ hath made us free. (Galatians 5:1)'
    ]
  },
  bound: {
    explanation: 'Even when bound outwardly, the spirit can remain free in Christ.',
    verses: [
      'For I am ready not to be bound only, but also to die at Jerusalem for the name of the Lord Jesus. (Acts 21:13)',
      'Remember them that are in bonds, as bound with them. (Hebrews 13:3)',
      'Bring my soul out of prison, that I may praise thy name. (Psalm 142:7)'
    ]
  },
  'set-free': {
    explanation: 'Christ sets us free from sin’s chains, giving true liberty.',
    verses: [
      'For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death. (Romans 8:2)',
      'Stand fast therefore in the liberty wherewith Christ hath made us free. (Galatians 5:1)',
      'Ye shall know the truth, and the truth shall make you free. (John 8:32)'
    ]
  },
  watching: {
    explanation: 'Watching in prayer and faith keeps us ready for the Lord’s coming.',
    verses: [
      'Watch ye and pray, lest ye enter into temptation. (Mark 14:38)',
      'Blessed are those servants, whom the lord when he cometh shall find watching. (Luke 12:37)',
      'Therefore let us not sleep, as do others; but let us watch and be sober. (1 Thessalonians 5:6)'
    ]
  },
  'zeal-less': {
    explanation: 'Lack of zeal can be restored by repentance and renewed fire from God.',
    verses: [
      'Be not slothful in business; fervent in spirit; serving the Lord. (Romans 12:11)',
      'As many as I love, I rebuke and chasten: be zealous therefore, and repent. (Revelation 3:19)',
      'For the zeal of thine house hath eaten me up. (Psalm 69:9)'
    ]
  },
  burning: {
    explanation: 'The fire of God’s Word and Spirit burns in the heart of His people.',
    verses: [
      'Did not our heart burn within us, while he talked with us by the way? (Luke 24:32)',
      'His word was in mine heart as a burning fire shut up in my bones. (Jeremiah 20:9)',
      'Who maketh his angels spirits; his ministers a flaming fire. (Psalm 104:4)'
    ]
  },
  fading: {
    explanation: 'Even when all else fades, God’s Word remains sure and eternal.',
    verses: [
      'The grass withereth, the flower fadeth: but the word of our God shall stand for ever. (Isaiah 40:8)',
      'Though our outward man perish, yet the inward man is renewed day by day. (2 Corinthians 4:16)',
      'Heaven and earth shall pass away, but my words shall not pass away. (Matthew 24:35)'
    ]
  },
  ready: {
    explanation: 'The believer lives ready for Christ’s return and to serve Him daily.',
    verses: [
      'Be ye therefore ready also: for the Son of man cometh at an hour when ye think not. (Luke 12:40)',
      'And their lamps took no oil with them… but the wise took oil in their vessels. (Matthew 25:3-4)',
      'For to me to live is Christ, and to die is gain. (Philippians 1:21)'
    ]
  },
  unprepared: {
    explanation: 'Unprepared hearts are warned to wake up and be ready for the Lord.',
    verses: [
      'The foolish said unto the wise, Give us of your oil; for our lamps are gone out. (Matthew 25:8)',
      'Prepare to meet thy God, O Israel. (Amos 4:12)',
      'Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about. (1 Peter 5:8)'
    ]
  },
  mindful: {
    explanation: 'Being mindful of God keeps us walking in gratitude and holiness.',
    verses: [
      'What is man, that thou art mindful of him? (Psalm 8:4)',
      'Thou meetest him that rejoiceth and worketh righteousness, those that remember thee in thy ways. (Isaiah 64:5)',
      'This do in remembrance of me. (Luke 22:19)'
    ]
  },
  forgetful: {
    explanation: 'Forgetfulness of God’s works can lead astray; remembering His benefits strengthens faith.',
    verses: [
      'Beware lest thou forget the LORD thy God. (Deuteronomy 8:11)',
      'Bless the LORD, O my soul, and forget not all his benefits. (Psalm 103:2)',
      'But whoso looketh into the perfect law of liberty… this man shall be blessed in his deed. (James 1:25)'
    ]
  },
  awake: {
    explanation: 'Awake hearts are alert to God’s call and ready to serve Him.',
    verses: [
      'Awake thou that sleepest, and arise from the dead, and Christ shall give thee light. (Ephesians 5:14)',
      'Watch ye, stand fast in the faith, quit you like men, be strong. (1 Corinthians 16:13)',
      'Therefore let us not sleep, as do others; but let us watch and be sober. (1 Thessalonians 5:6)'
    ]
  },
  slumbering: {
    explanation: 'Slumbering spiritually is dangerous; God calls us to awaken to righteousness.',
    verses: [
      'Yet a little sleep, a little slumber, a little folding of the hands to sleep. (Proverbs 24:33)',
      'And while the bridegroom tarried, they all slumbered and slept. (Matthew 25:5)',
      'How long wilt thou sleep, O sluggard? when wilt thou arise out of thy sleep? (Proverbs 6:9)'
    ]
  }
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
  // Defensive: ensure moodVerseMap exists
  if (!moodVerseMap || Object.keys(moodVerseMap).length === 0) {
    console.warn("handleSelect: moodVerseMap is empty or missing");
    setVerse("No verse found.");
    return;
  }

  // Helper: normalize strings for reliable comparison
  const normalize = (s) =>
    String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // remove punctuation
      .replace(/\s+/g, " "); // collapse whitespace

  // Small, efficient Levenshtein (used as last resort for typos)
  const levenshtein = (a, b) => {
    a = String(a);
    b = String(b);
    if (a === b) return 0;
    const m = a.length,
      n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    let v0 = new Array(n + 1);
    let v1 = new Array(n + 1);
    for (let j = 0; j <= n; j++) v0[j] = j;
    for (let i = 0; i < m; i++) {
      v1[0] = i + 1;
      for (let j = 0; j < n; j++) {
        const cost = a[i] === b[j] ? 0 : 1;
        v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      }
      [v0, v1] = [v1, v0];
    }
    return v0[n];
  };

  // Start
  console.debug("handleSelect called with:", mood);
  const rawInput = String(mood || "");
  const input = normalize(rawInput);

  if (!input) {
    console.warn("handleSelect: empty input");
    setVerse("No verse found.");
    return;
  }

  // Build normalized index of keys
  const keys = Object.keys(moodVerseMap);
  const index = keys.map((k) => ({ key: k, norm: normalize(k) }));

  // 1) Exact normalized match
  let found = index.find((it) => it.norm === input);

  // 2) If input contains commas, try each part separately
  if (!found && input.includes(",")) {
    const parts = input.split(",").map((p) => p.trim()).filter(Boolean);
    for (const p of parts) {
      found = index.find((it) => it.norm === p);
      if (found) break;
    }
  }

  // 3) startsWith (user typed beginning of mood)
  if (!found) {
    found = index.find((it) => it.norm.startsWith(input));
  }

  // 4) includes (user typed substring)
  if (!found) {
    found = index.find((it) => it.norm.includes(input));
  }

  // 5) all-words match (input has multiple words, all must appear in key)
  if (!found) {
    const words = input.split(" ").filter(Boolean);
    if (words.length > 0) {
      found = index.find((it) => words.every((w) => it.norm.includes(w)));
    }
  }

  // 6) Levenshtein fallback (typo tolerance)
  if (!found) {
    let best = { item: null, dist: Infinity };
    for (const it of index) {
      const d = levenshtein(input, it.norm);
      if (d < best.dist) best = { item: it, dist: d };
    }
    // threshold: allow small typos (30% of longer length, min 1)
    const threshold = Math.max(1, Math.floor(Math.max(input.length, (best.item?.norm || "").length) * 0.3));
    if (best.item && best.dist <= threshold) {
      console.debug("handleSelect: fuzzy match via levenshtein", best);
      found = best.item;
    } else {
      console.debug("handleSelect: no fuzzy match (best)", best);
    }
  }

  // If still nothing, provide suggestions (if any) and bail out
  if (!found) {
    const suggestions = index
      .filter((it) => it.norm.includes(input))
      .slice(0, 6)
      .map((it) => it.key);
    console.info("handleSelect: no exact match; suggestions:", suggestions);
    setFilteredMoods(suggestions); // show dropdown suggestions for user
    setVerse("No verse found.");
    return;
  }

  // Use the matched key
  const matchedKey = found.key;
  console.debug("handleSelect: matchedKey ->", matchedKey);

  // Update UI state exactly as before
  setInputMood(matchedKey);
  setFilteredMoods([]);

  // Fetch entry and present it
  const entry = moodVerseMap[matchedKey];
  if (entry && Array.isArray(entry.verses) && entry.verses.length > 0) {
    const verses = entry.verses.join("\n");
    const fullText = `${verses}${entry.explanation ? `\n\n${entry.explanation}` : ""}`;
    setVerse(fullText);

    try {
      // speak only the verses (keep your original TTS behaviour)
      const utterance = new SpeechSynthesisUtterance(verses);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("handleSelect: speech error", err);
    }
  } else {
    console.warn("handleSelect: matched entry had no verses", matchedKey);
    setVerse("No verse found.");
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
