import React, { useState, useRef } from 'react';
import woman from '../../assets/woman.png'
import './bottomMoodBox.css';

function BottomMoodBox() {
const moods = [
  "joyful", "sad", "peaceful", "anxious", "lonely", "angry", "thankful", "tempted", "hopeful", "discouraged", "happy",
  "ashamed", "weak", "tired", "confused", "broken", "fearful", "guilty", "content", "nervous", "excited",
  "betrayed", "loved", "humbled", "bitter", "insecure", "curious", "desperate", "doubtful", "eager", "bold",
  "restless", "calm", "free", "trapped", "overwhelmed", "helpless", "empowered", "mournful", "jealous", "grateful",
  "isolated", "victorious", "repentant",
  "mourning", "motivated", "apathetic", "unworthy", "strong", "resentful", "generous", "forgiving",
  "trusted", "hope-drained", "faithful", "rejected", "anguished", "fulfilled", "patient", "lively", "low", "exhausted",
  "inspired", "conflicted", "fulfilled", "brave", "ashamed", "joyless", "panicked", "alert", "attentive", "distant",
  "brokenhearted", "worried", "loved", "cheerful", "afraid", "healing", "redeemed", "renewed", "stressed", "distracted",
  "watchful", "sleepy", "warm", "cold", "withdrawn", "alert", "foolish", "wise", "growing",
  "lost", "found", "secure", "unloved", "focused", "protective", "determined", "faithless", "unforgiving", "diligent"
];

const moodVerseMap = {
            joyless: `Psalm 51:10–12 - Create in me a clean heart, O God; and renew a right spirit within me.  
             Cast me not away from thy presence; and take not thy holy spirit from me.  
             Restore unto me the joy of thy salvation; and uphold me with thy free spirit.
             
             John 15:9–11 - As the Father hath loved me, so have I loved you: continue ye in my love.  
             If ye keep my commandments, ye shall abide in my love; even as I have kept my Father's commandments, and abide in his love.  
             These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.
             
             Isaiah 61:3 - To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning,  
             the garment of praise for the spirit of heaviness; that they might be called trees of righteousness,  
             the planting of the LORD, that he might be glorified.
             
             Nehemiah 8:10 - ...for the joy of the LORD is your strength.

            Psalm 30:5 - For his anger endureth but a moment; in his favour is life:  
            weeping may endure for a night, but joy cometh in the morning`,
            sad: `Psalm 34:18 - The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.  
             Revelation 21:4 - And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.  
             John 16:20 - Verily, verily, I say unto you, That ye shall weep and lament, but the world shall rejoice: and ye shall be sorrowful, but your sorrow shall be turned into joy.  
             Psalm 147:3 - He healeth the broken in heart, and bindeth up their wounds.`,

            joyful: `Nehemiah 8:10 - Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength.
            Psalm 16:11 - Thou wilt shew me the path of life: in thy presence is fulness of joy; 
          at thy right hand there are pleasures for evermore.
          Philippians 4:4 - Rejoice in the Lord alway: and again I say, Rejoice.`,

            peaceful: `Isaiah 26:3 - Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.
            John 14:27 - Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. 
            Let not your heart be troubled, neither let it be afraid.`,

            anxious: `Philippians 4:6-7 - Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.  
          And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.
          1 Peter 5:7 - Casting all your care upon him; for he careth for you.
          Psalm 55:22 - Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.`,

            lonely: `Matthew 28:20 - Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.  
            Psalm 25:16 - Turn thee unto me, and have mercy upon me; for I am desolate and afflicted.
            Psalm 68:6 - God setteth the solitary in families: he bringeth out those which are bound with chains: but the rebellious dwell in a dry land.`,

            angry: `Proverbs 15:1 - A soft answer turneth away wrath: but grievous words stir up anger.  
          Ephesians 4:26 - Be ye angry, and sin not: let not the sun go down upon your wrath.`,

            thankful: `1 Thessalonians 5:18 - In every thing give thanks: for this is the will of God in Christ Jesus concerning you.`,

            tempted: `1 Corinthians 10:13 - There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able;  
          but will with the temptation also make a way to escape, that ye may be able to bear it.  
          James 1:12 - Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him.
          Hebrews 4:15 - For we have not an high priest which cannot be touched with the feeling of our infirmities; 
          but was in all points tempted like as we are, yet without sin.`,

            hopeful: `Romans 15:13 - Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.`,


            happy: `Psalm 144:15 - Happy is that people, that is in such a case: yea, happy is that people, whose God is the LORD.  
          Proverbs 16:20 - He that handleth a matter wisely shall find good: and whoso trusteth in the LORD, happy is he.`,

            ashamed: `Romans 10:11 - For the scripture saith, Whosoever believeth on him shall not be ashamed.  
          Psalm 34:5 - They looked unto him, and were lightened: and their faces were not ashamed.`,

            weak: `2 Corinthians 12:9 - And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.  
          Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.`,

            tired: `Matthew 11:28-30 - Come unto me, all ye that labour and are heavy laden, and I will give you rest.  
          Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.  
          For my yoke is easy, and my burden is light.          
          Galatians 6:9 - And let us not be weary in well doing: for in due season we shall reap, if we faint not.`,

            broken: `Psalm 34:18 - The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.`,

            fearful: `2 Timothy 1:7 - For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.  
          Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God:  
          I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.`,

            guilty: `1 John 1:9 - If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.  
          Romans 8:1 - There is therefore now no condemnation to them which are in Christ Jesus,  
          who walk not after the flesh, but after the Spirit.`,

            content: `1 Timothy 6:6 - But godliness with contentment is great gain.  
          Philippians 4:11 - Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.`,

            brokenhearted: `Psalm 147:3 - He healeth the broken in heart, and bindeth up their wounds.`,

            loved: `Jeremiah 31:3 - The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love:  
          therefore with lovingkindness have I drawn thee.  
          Romans 5:8 - But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.`,

            renewed: `Isaiah 40:31 - But they that wait upon the LORD shall renew their strength;  
          they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.`,

            overwhelmed: `Psalm 61:2 - From the end of the earth will I cry unto thee, when my heart is overwhelmed:  
          lead me to the rock that is higher than I.`,

            mournful: `Matthew 5:4 - Blessed are they that mourn: for they shall be comforted.`,

            hopeful_again: `Lamentations 3:22-23 - It is of the LORD's mercies that we are not consumed, because his compassions fail not.  
          They are new every morning: great is thy faithfulness.`,

            insecure: `Psalm 139:14 - I will praise thee; for I am fearfully and wonderfully made:  
          marvellous are thy works; and that my soul knoweth right well.
          Isaiah 41:13 - For I the LORD thy God will hold thy right hand, saying unto thee, 
          Fear not; I will help thee.
          `,


            betrayed: `Psalm 41:9 - Yea, mine own familiar friend, in whom I trusted, which did eat of my bread, hath lifted up his heel against me.  
          Hebrews 4:15 - For we have not an high priest which cannot be touched with the feeling of our infirmities;  
          but was in all points tempted like as we are, yet without sin.`,

            forgiving: `Colossians 3:13 - Forbearing one another, and forgiving one another, if any man have a quarrel against any: 
          even as Christ forgave you, so also do ye.
          Ephesians 4:32 - And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.`,

            repentant: `1 John 1:9 - If we confess our sins, he is faithful and just to forgive us our sins, 
          and to cleanse us from all unrighteousness.
            2 Chronicles 7:14 - If my people, which are called by my name, shall humble themselves, and pray, and seek my face,  
          and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.`,

            faithful: `Lamentations 3:22-23 - It is of the LORD's mercies that we are not consumed, because his compassions fail not.  
          They are new every morning: great is thy faithfulness.`,

            victorious: `Romans 8:37 - Nay, in all these things we are more than conquerors through him that loved us.  
          1 John 5:4 - For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith.`,

            strong: `Philippians 4:13 - I can do all things through Christ which strengtheneth me.  
          Isaiah 40:29 - He giveth power to the faint; and to them that have no might he increaseth strength.`,

            discouraged: `Isaiah 40:29 - He giveth power to the faint; and to them that have no might he increaseth strength.
          2 Corinthians 4:8-9 - We are troubled on every side, yet not distressed; we are perplexed, but not in despair; 
          Persecuted, but not forsaken; cast down, but not destroyed.  
          Joshua 1:9 - Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.`,

            afraid: `Psalm 56:3 - What time I am afraid, I will trust in thee.
          John 14:27 - Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. 
          Let not your heart be troubled, neither let it be afraid.`,


            hopeful: `Romans 15:13 - Now the God of hope fill you with all joy and peace in believing, 
          that ye may abound in hope, through the power of the Holy Ghost.`,

            grateful: `Psalm 100:4 - Enter into his gates with thanksgiving, and into his courts with praise: 
          be thankful unto him, and bless his name.`,

            betrayed: `Psalm 41:9 - Yea, mine own familiar friend, in whom I trusted, which did eat of my bread, 
          hath lifted up his heel against me.`,

            content: `Philippians 4:11 - Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.`,

            unworthy: `Romans 5:8 - But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.  
            Ephesians 2:8-9 - For by grace are ye saved through faith; and that not of yourselves:  
          it is the gift of God: Not of works, lest any man should boast.`,


            faithful: `Lamentations 3:22-23 - It is of the LORD's mercies that we are not consumed, because his compassions fail not. 
          They are new every morning: great is thy faithfulness.`,

            strong: `Philippians 4:13 - I can do all things through Christ which strengtheneth me.`,

          mourning: `Matthew 5:4 - Blessed are they that mourn: for they shall be comforted.
          Psalm 34:18 - The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.`,

            confused: `Proverbs 3:5-6 - Trust in the LORD with all thine heart; and lean not unto thine own understanding. 
            In all thy ways acknowledge him, and he shall direct thy paths  .
          1 Corinthians 14:33 - For God is not the author of confusion, but of peace, as in all churches of the saints.`,

            desperate: `Psalm 40:1-2 - I waited patiently for the LORD; and he inclined unto me, and heard my cry. 
          He brought me up also out of an horrible pit, out of the miry clay, and set my feet upon a rock, and established my goings.`,

            angry: `Ephesians 4:26 - Be ye angry, and sin not: let not the sun go down upon your wrath.`,

            nervous: `Isaiah 41:10 - Fear thou not; for I am with thee: be not dismayed; for I am thy God: 
          I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.`,

            ashamed: `Romans 10:11 - For the scripture saith, Whosoever believeth on him shall not be ashamed.`,

            fearful: `2 Timothy 1:7 - For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.`,

            jealous: `Galatians 5:26 - Let us not be desirous of vain glory, provoking one another, envying one another.`,

            brokenhearted: `Psalm 147:3 - He healeth the broken in heart, and bindeth up their wounds.`,

            trapped: `John 8:36 - If the Son therefore shall make you free, ye shall be free indeed.`,

            rejected: `Isaiah 53:3 - He is despised and rejected of men; a man of sorrows, and acquainted with grief: 
          and we hid as it were our faces from him; he was despised, and we esteemed him not.`,

            unlovable: `Romans 8:38-39 - For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, 
          nor things present, nor things to come, nor height, nor depth, nor any other creature, 
          shall be able to separate us from the love of God, which is in Christ Jesus our Lord.`,

            bitter: `Hebrews 12:15 - Looking diligently lest any man fail of the grace of God; 
          lest any root of bitterness springing up trouble you, and thereby many be defiled.`,

            worried: `Matthew 6:34 - Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. 
          Sufficient unto the day is the evil thereof.`,

            hopeless: `Lamentations 3:21-23 - This I recall to my mind, therefore have I hope. 
          It is of the LORD'S mercies that we are not consumed, because his compassions fail not. 
          They are new every morning: great is thy faithfulness.`,

            lost: `Luke 19:10 - For the Son of man is come to seek and to save that which was lost.`,

            found: `Luke 15:24 - For this my son was dead, and is alive again; he was lost, and is found. 
          And they began to be merry.`,

            distant: `James 4:8 - Draw nigh to God, and he will draw nigh to you. 
          Cleanse your hands, ye sinners; and purify your hearts, ye double minded.`,

            unloved: `Jeremiah 31:3 - The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: 
          therefore with lovingkindness have I drawn thee.`,

            healing: `Jeremiah 17:14 - Heal me, O LORD, and I shall be healed; save me, and I shall be saved: 
          for thou art my praise.`,

            restored: `Joel 2:25 - And I will restore to you the years that the locust hath eaten, 
          the cankerworm, and the caterpiller, and the palmerworm, my great army which I sent among you.`,

            redeemed: `Isaiah 44:22 - I have blotted out, as a thick cloud, thy transgressions, and, as a cloud, thy sins: 
          return unto me; for I have redeemed thee.`,

            growing: `2 Peter 3:18 - But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ. 
          To him be glory both now and for ever. Amen.`,

            diligent: `Proverbs 13:4 - The soul of the sluggard desireth, and hath nothing: 
          but the soul of the diligent shall be made fat.`,



            distracted: `Luke 10:41-42 - And Jesus answered and said unto her, Martha, Martha, thou art careful and troubled about many things: 
          But one thing is needful: and Mary hath chosen that good part, which shall not be taken away from her.`,


            watchful: `1 Peter 5:8 - Be sober, be vigilant; because your adversary the devil, as a roaring lion, 
          walketh about, seeking whom he may devour.`,
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
    setVerse(moodVerseMap[mood] || 'No verse found.');
    if(moodVerseMap){
   const utterance = new SpeechSynthesisUtterance(moodVerseMap[mood])
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance)
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
