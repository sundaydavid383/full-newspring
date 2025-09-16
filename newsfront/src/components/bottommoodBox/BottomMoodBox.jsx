import React, { useState, useRef } from 'react';
import woman from '../../assets/woman.png'
import './bottomMoodBox.css';
import { moodVerseMap } from "../../assets/moodVerseMap.js"

function BottomMoodBox() {
// const moods = [
//   "joyful", "sad", "peaceful", "anxious", "lonely", "angry", "thankful", "hopeful", 
//   "discouraged", "happy", "ashamed", "weak", "tired", "confused", "broken", "fearful", 
//   "guilty", "content", "nervous", "excited", "betrayed", "loved", "humbled", "bitter", 
//   "insecure", "curious", "desperate", "doubtful", "eager", "bold", "restless", "calm", 
//   "free", "trapped", "overwhelmed", "helpless", "empowered", "mournful", "jealous", 
//   "grateful", "isolated", "victorious", "repentant", "motivated", "apathetic", "unworthy", 
//   "strong", "resentful", "generous", "forgiving", "trusted", "hope-drained", "faithful", 
//   "rejected", "anguished", "fulfilled", "patient", "lively", "low", "exhausted", "inspired", 
//   "conflicted", "brave", "joyless", "panicked", "attentive", "distant", "brokenhearted", 
//   "worried", "cheerful", "afraid", "healing", "redeemed", "renewed", "stressed", "distracted", 
//   "watchful", "sleepy", "warm", "cold", "withdrawn", "foolish", "wise", "growing", 
//   "lustful", "tempted", "lost", "found", "secure", "unloved", "focused", "protective", 
//   "determined", "faithless", "unforgiving", "diligent",

//   // ✨ New additions
//   "grieving", "comforted", "revived", "emptied", "restored", "zealous", "hungry", "thirsty", 
//   "satisfied", "unsatisfied", "prayerful", "distant-from-God", "close-to-God", "obedient", 
//   "rebellious", "ashamed-of-sin", "convicted", "purified", "cleansed", "expectant", 
//   "hopeless", "loved-by-God", "abandoned", "uplifted", "disciplined", "refreshed", "weary", 
//   "tested", "tempted-beyond", "delivered", "guided", "misunderstood", "accepted", 
//   "comfortless", "strengthened", "protected", "covered", "open", "closed", "waiting", 
//   "hurried", "peace-filled", "angst", "resentful", "encouraged", "overflowing", "dry", 
//   "revived", "burdened", "released", "bound", "set-free", "watching", "zeal-less", 
//   "burning", "fading", "ready", "unprepared", "mindful", "forgetful", "awake", "slumbering"
// ];


const moods = Object.keys(moodVerseMap);




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
