import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./contentEditing.css";

const ContentEditing = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState("unable to receive content data")
  const [journey, setJourney] = useState(null);
  const [sections, setSections] = useState([]);
  const [videoData, setVideoData] = useState(null);
  const [churchCards, setChurchCards] = useState([]);
  const [events, setEvents] = useState([]);
  const [ministryAreas, setMinistryAreas] = useState([]);
  const [features, setFeatures] = useState({ type: "home", data: [] });
  const [schedule, setSchedule] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [articles, setArticles] = useState([]);
  const base_Url = 'https://full-newspring.onrender.com/'
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
  
    axios.get(`${base_Url}api/home-content`)
      .then((res) => {
        if (!isMounted) return;
        setLoading(false);
        console.log("data from the home content", res.data);
        setJourney(res.data.journeyData?.[0]);
        setSections(res.data.sections || []);
        setVideoData(res.data.videoData || []);
        setChurchCards(res.data.churchCards || []);
        setEvents(res.data.events || []);
        setMinistryAreas(res.data.ministryAreas || []);
        setFeatures(res.data.features || { type: "home", data: [] });
        setSchedule(res.data.schedule || []);
        setEventData(res.data.eventData || []);
        setArticles(res.data.articles || []);
})
      .catch((err) => {
        if (!isMounted) return;
        setLoading(false);
        console.error("Error fetching home content", err);
      });
  
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (e, type, index = null, field = null) => {
    const updated = { ...journey };

    if (type === "title") updated.title = e.target.value;
    if (type === "paragraphs") updated.paragraphs[index] = e.target.value;
    if (type === "link") updated.link[field] = e.target.value;
    if (type === "images") updated.images[index][field] = e.target.value;

    setJourney(updated);
  };

  const handleArticleTextChange = (index, field, value) => {
    const updatedArticles = [...articles];
    updatedArticles[index][field] = value;
    setArticles(updatedArticles);
  };



  const handleArticleAdviceChange = (articleIndex, adviceIndex, newAdvice) => {
    const updatedArticles = [...articles];
    updatedArticles[articleIndex].advice[adviceIndex] = newAdvice;
    setArticles(updatedArticles);
  };

  const handleScheduleChange = (index, field, value) => {
    setSchedule(prev => {
      const updated = [...prev];
      if (!updated[index]) return prev; // Prevent modifying if index doesn't exist
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };
  
  const addEvent = () => {
    setSchedule([
      ...schedule,
      {
        event: "",
        time: "",
        location: "",
      },
    ]);
  };

  const removeEvent = (index) => {
    setSchedule(prev => prev.filter((_, i) => i !== index));
  };

  const handleVideoInputChange = (e, field) => {
    setVideoData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleMinistryChange = (e, index, field) => {
    const updated = [...ministryAreas];
    updated[index][field] = e.target.value;
    setMinistryAreas(updated);
  };

  const handleMinistryImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...ministryAreas];
      updated[index].img = reader.result;
      setMinistryAreas(updated);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleFeatureChange = (e, index, field) => {
    const updated = { ...features };
    updated.data[index][field] = e.target.value;
    setFeatures(updated);
  };

  const handleChurchCardChange = (e, index, field) => {
    const updatedCards = [...churchCards];
    updatedCards[index][field] = e.target.value;
    setChurchCards(updatedCards);
  };

  const handleChurchCardImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedCards = [...churchCards];
      updatedCards[index].image = reader.result;
      setChurchCards(updatedCards);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...journey };
      updated.images[index].src = reader.result;
      setJourney(updated);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAllImageUpload = (e, image, index=0) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if(image === videoData.src){
        const updated = { ...videoData };
        updated.src = reader.result;
        setVideoData(updated);
      }
      else if(image === eventData.image){
        const updated = { ...eventData };
        updated.image = reader.result;
        setEventData(updated);
      }
      else if(image === articles[index].image){
        const updated = [ ...articles ];
        updated[index].image = reader.result;
        setArticles(updated);
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await axios.put(`${base_Url}api/update-home-content`, {
        journeyData: [journey],
        sections,
        videoData,
        churchCards,
        events,
        ministryAreas,
        features,
        schedule,
        eventData,
        articles
      });
      setAlert(true)
      setLoading(false)
      setAlertText("Content updated!");
    } catch (err) {
      console.error(err);
      setAlert(true)
      setLoading(false)
      setAlertText("Error updating content");
    }
  };

 
   if(loading){
  return(
    <div className="loading">
      <div className="bar bar1"></div>
       <div className="bar bar2"></div>
       <div className="bar bar3"></div>
     </div>
  ) }

  if(alert){
    return (
      <div className="alert_holder">
      <div className="alert">
        <p>{alertText}</p>
        <div onClick={() => setAlert(false)} className="btn">
          <p>OK</p>
        </div>
      </div>
    </div>
    );
  }

  return (
    journey ? 
    <div className="content_form_holder">
      <form className="contentediting-form" onSubmit={handleSubmit}>
        <ul className='content-nav'>
      <li><a href="#JourneyData">JourneyData</a></li>
      <li><a href="#Sections">Sections</a></li>
      <li><a href="#VideoData">VideoData</a></li>
      <li><a href="#ChurchCards">ChurchCards</a></li>
      <li><a href="#Events">Events</a></li>
      <li><a href="#MinistryAreas">MinistryAreas</a></li>
      <li><a href="#Features">Features</a></li>
      <li><a href="#Schedule">Schedule</a></li>
      <li><a href="#UpcomingEvent">UpcomingEvent</a></li>
      <li><a href="#Articles">Articles</a></li>
       </ul>
      <h1 id="JourneyData">Journey Data</h1>
        <h2>Journey Title</h2>
        <label htmlFor="journey-title">Title:</label>
        <input
          id="journey-title"
          value={journey.title}
          onChange={(e) => handleInputChange(e, "title")}
        />

        <h2>Paragraphs</h2>
        {journey.paragraphs.map((p, i) => (
          <div key={i}>
            <label htmlFor={`paragraph-${i}`}>Paragraph {i + 1}:</label>
            <textarea
              id={`paragraph-${i}`}
              value={p}
              onChange={(e) => handleInputChange(e, "paragraphs", i)}
            />
          </div>
        ))}

        <h2>Images</h2>
        {journey.images.map((img, i) => (
          <div key={i}>
            <img src={img.src} alt={img.alt} width="200" />
            <div>
              <label htmlFor={`img-alt-${i}`}>Alt Text:</label>
              <input
                id={`img-alt-${i}`}
                type="text"
                value={img.alt}
                placeholder="Alt text"
                onChange={(e) => handleInputChange(e, "images", i, "alt")}
              />
            </div>
            <div>
              <label htmlFor={`img-class-${i}`}>Class Name:</label>
              <input
                id={`img-class-${i}`}
                type="text"
                value={img.className}
                placeholder="Class"
                onChange={(e) => handleInputChange(e, "images", i, "className")}
              />
            </div>
            <div>
              <label htmlFor={`img-upload-${i}`}>Upload Image:</label>
              <input
                id={`img-upload-${i}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, i)}
              />
            </div>
          </div>
        ))}

        <h3>Link</h3>
        <div>
          <label htmlFor="link-href">Link Href:</label>
          <input
            id="link-href"
            style={{marginBottom:"4px"}}
            value={journey.link.href}
            onChange={(e) => handleInputChange(e, "link", null, "href")}
            placeholder="Link href"
          />
        </div>
        <div>
          <label htmlFor="link-text">Link Text:</label>
          <input
            id="link-text"
            value={journey.link.text}
            onChange={(e) => handleInputChange(e, "link", null, "text")}
            placeholder="Link text"
          />
        </div>

        <h1 id="Sections">Sections</h1>
        {sections.map((sec, idx) => (
          <div key={idx}>
            <div>
              <label htmlFor={`section-title-${idx}`}>Section Title:</label>
              <input
                id={`section-title-${idx}`}
                value={sec.title}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[idx].title = e.target.value;
                  setSections(newSections);
                }}
              />
            </div>
            {sec.paragraphs.map((p, pi) => (
              <div key={pi}>
                <label htmlFor={`section-paragraph-${idx}-${pi}`}>Paragraph {pi + 1}:</label>
                <textarea
                  id={`section-paragraph-${idx}-${pi}`}
                  value={p}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[idx].paragraphs[pi] = e.target.value;
                    setSections(newSections);
                  }}
                />
              </div>
            ))}
          </div>
        ))}

        <h1 id="VideoData">Video Data</h1>
        <img src={videoData.src} alt="" width="200" />
        <div>
          <label htmlFor="video-src">Image Source:</label>
          <input
            id="video-src"
            type="file"
            onChange={(e) => handleAllImageUpload(e, videoData.src)}
          />
        </div>
        <div>
          <label htmlFor="video-url">Video URL:</label>
          <input
            id="video-url"
            type="text"
            value={videoData.video}
            onChange={(e) => handleVideoInputChange(e, "video")}
          />
        </div>
        <div>
          <label htmlFor="video-header">Video Header:</label>
          <input
            id="video-header"
            type="text"
            value={videoData.header}
            onChange={(e) => handleVideoInputChange(e, "header")}
          />
        </div>
        <div>
          <label htmlFor="video-paragraphs">Paragraphs for Video:</label>
          {videoData.para.map((p, idx) => (
            <div key={idx}>
              <label htmlFor={`video-paragraph-${idx}`}>Paragraph {idx + 1}:</label>
              <textarea
                id={`video-paragraph-${idx}`}
                value={p}
                onChange={(e) => {
                  const updatedVideoData = { ...videoData };
                  updatedVideoData.para[idx] = e.target.value;
                  setVideoData(updatedVideoData);
                }}
              />
            </div>
          ))}
        </div>

            <h1 id="ChurchCards">Church Cards</h1>
        {churchCards.map((card, idx) => (
          <div key={idx}>
            <img src={card.image} alt={card.alt} width="200" />
            <div>
              <label htmlFor={`card-image-${idx}`}>Upload Image:</label>
              <input
                id={`card-image-${idx}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleChurchCardImageUpload(e, idx)}
              />
            </div>
            <div>
              <label htmlFor={`card-alt-${idx}`}>Alt Text:</label>
              <input
                id={`card-alt-${idx}`}
                type="text"
                value={card.alt}
                onChange={(e) => handleChurchCardChange(e, idx, "alt")}
              />
            </div>
            <div>
              <label htmlFor={`card-title-${idx}`}>Title:</label>
              <input
                id={`card-title-${idx}`}
                type="text"
                value={card.title}
                onChange={(e) => handleChurchCardChange(e, idx, "title")}
              />
            </div>
            <div>
              <label htmlFor={`card-desc-${idx}`}>Description:</label>
              <textarea
                id={`card-desc-${idx}`}
                value={card.description}
                onChange={(e) => handleChurchCardChange(e, idx, "description")}
              />
            </div>
          </div>
        ))}

    <h1 id="Events">Events</h1>
        {events.map((event, i) => (
          <div key={i}>
            <div>
              <label htmlFor={`event-image-${i}`}>Event Image:</label>
              <img
                src={event.image}
                alt={event.alt}
                style={{ maxWidth: "200px", display: "block", marginBottom: "10px" }}
              />
              <input
                id={`event-image-${i}`}
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const updated = [...events];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    updated[i].image = reader.result;
                    setEvents(updated);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
            <div>
              <label htmlFor={`event-title-${i}`}>Event Title:</label>
              <input
                id={`event-title-${i}`}
                value={event.title}
                onChange={(e) => {
                  const updated = [...events];
                  updated[i].title = e.target.value;
                  setEvents(updated);
                }}
              />
            </div>
            <div>
              <label htmlFor={`event-desc-${i}`}>Event Description:</label>
              <textarea
                id={`event-desc-${i}`}
                value={event.description}
                onChange={(e) => {
                  const updated = [...events];
                  updated[i].description = e.target.value;
                  setEvents(updated);
                }}
              />
            </div>
          </div>
        ))}


<h1 id="MinistryAreas">Ministry Areas</h1>
{ministryAreas.map((area, index) => (
  <div key={index}>
    <div>
      <label htmlFor={`title-${index}`}>Title:</label>
      <input
        id={`title-${index}`}
        type="text"
        value={area.title}
        onChange={(e) => handleMinistryChange(e, index, "title")}
      />
    </div>

    <div>
      <label htmlFor={`description-${index}`}>Description:</label>
      <textarea
        id={`description-${index}`}
        value={area.description}
        onChange={(e) => handleMinistryChange(e, index, "description")}
      />
    </div>

    <div>
      <label htmlFor={`image-upload-${index}`}>Upload Image:</label>
      <input
        id={`image-upload-${index}`}
        type="file"
        onChange={(e) => handleMinistryImageUpload(e, index)}
      />
    </div>

    <div>
      <img src={area.img} alt={`Ministry area ${index}`} style={{ maxWidth: 200 }} />
    </div>
  </div>
))}

<h1 id="Features">Features</h1>
{features.data.map((feature, index) => (
  <div key={index}>
    <div>
      <label htmlFor={`title-${index}`}>Feature Title:</label>
      <input
        id={`title-${index}`}
        type="text"
        value={feature.title}
        onChange={(e) => handleFeatureChange(e, index, "title")}
      />
    </div>

    <div>
      <label htmlFor={`icon-${index}`}>Feature Icon:</label>
      <input
        id={`icon-${index}`}
        type="text"
        value={feature.icon}
        onChange={(e) => handleFeatureChange(e, index, "icon")}
      />
    </div>

    <div>
      <label htmlFor={`description-${index}`}>Feature Description:</label>
      <textarea
        id={`description-${index}`}
        value={feature.description}
        onChange={(e) => handleFeatureChange(e, index, "description")}
      />
    </div>
  </div>
))}


<h1 id="Schedule">Schedule</h1>
<div className="space-y-4">
      {schedule.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded shadow space-y-2">
          <input
            type="text"
            value={item.event}
            onChange={(e) => handleScheduleChange(index, "event", e.target.value)}
            placeholder="Event"
        
          />
          <input
            type="text"
            value={item.time}
            onChange={(e) => handleScheduleChange(index, "time", e.target.value)}
            placeholder="Time"
        
          />
          <input
            type="text"
            value={item.location}
            onChange={(e) => handleScheduleChange(index, "location", e.target.value)}
            placeholder="Location"
        
          />
          <button
            onClick={() => removeEvent(index)}
            className="btn"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        <button
          onClick={addEvent}
          className="btn"
        >
          + Add Event
        </button>
      </div>
    </div>



<div className="space-y-4 bg-white p-4 rounded shadow mt-6">
  <h1 id="UpcomingEvent" className="text-2xl font-bold mb-4">Edit Upcoming Event</h1>

  {/* Event Title */}
  <input
    type="text"
    value={eventData.title}
    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
    placeholder="Event Title"
    className="w-full p-2 border rounded"
  />

  {/* Event DateTime */}
  <input
    type="text"
    value={eventData.dateTime}
    onChange={(e) => setEventData({ ...eventData, dateTime: e.target.value })}
    placeholder="Date & Time (e.g. Oct 9, 2025 @ 07:00 - 15:00)"
    className="w-full p-2 border rounded"
  />

  {/* Event DateLogic */}
  <input
    type="text"
    value={eventData.datelogic}
    onChange={(e) => setEventData({ ...eventData, datelogic: e.target.value })}
    placeholder="Date & Time (e.g. October 9, 2025 00:00:00 GMT+0000)"
    className="w-full p-2 border rounded"
  />

  {/* Event Location */}
  <input
    type="text"
    value={eventData.location}
    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
    placeholder="Location"
    className="w-full p-2 border rounded"
  />

  {/* Event Description */}
  <textarea
    value={eventData.description}
    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
    placeholder="Event Description"
    className="w-full p-2 border rounded"
  />

  {/* Image Preview */}
  {eventData.image && (
    <img
      src={ eventData.image}
      alt="Event"
      className="w-full max-w-xs object-cover rounded"
    />
  )}

  {/* Image Upload */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleAllImageUpload(e,eventData.image)}
    className="block mt-2"
  />
</div>



<div className="space-y-6">
<h1 id="Articles" className="text-3xl font-bold mb-6">Edit Articles</h1>

{articles.map((article, articleIndex) => (
  <div key={article.id} className="p-4 border border-gray-300 rounded-lg bg-white space-y-4">
    <h2 className="text-2xl font-bold">{article.title}</h2>

    <input
      type="text"
      value={article.title}
      onChange={(e) => handleArticleTextChange(articleIndex, 'title', e.target.value)}
      placeholder="Article Title"
      className="w-full p-2 border border-gray-300 rounded"
    />

    <input
      type="text"
      value={article.date}
      onChange={(e) => handleArticleTextChange(articleIndex, 'date', e.target.value)}
      placeholder="Date"
      className="w-full p-2 border border-gray-300 rounded"
    />

    <input
      type="text"
      value={article.author}
      onChange={(e) => handleArticleTextChange(articleIndex, 'author', e.target.value)}
      placeholder="Author"
      className="w-full p-2 border border-gray-300 rounded"
    />

    <input
      type="text"
      value={article.quote}
      onChange={(e) => handleArticleTextChange(articleIndex, 'quote', e.target.value)}
      placeholder="Quote"
      className="w-full p-2 border border-gray-300 rounded"
    />

    <textarea
      value={article.gist1}
      onChange={(e) => handleArticleTextChange(articleIndex, 'gist1', e.target.value)}
      placeholder="Gist 1"
      className="w-full p-2 border border-gray-300 rounded"
    />

    <textarea
      value={article.gist2}
      onChange={(e) => handleArticleTextChange(articleIndex, 'gist2', e.target.value)}
      placeholder="Gist 2"
      className="w-full p-2 border border-gray-300 rounded"
    />

    <textarea
      value={article.description}
      onChange={(e) => handleArticleTextChange(articleIndex, 'description', e.target.value)}
      placeholder="Description"
      className="w-full p-2 border border-gray-300 rounded"
    />

    {/* Image preview */}
    {article.image && (
      <img
        width={500}
        src={article.image}
        alt="Article"
        className="w-full max-w-xs object-cover rounded"
      />
    )}

    {/* Image upload */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleAllImageUpload(e, articles[articleIndex].image, articleIndex)}
      className="block mt-2"
    />

    {/* Editable advice section */}
    {article.advice && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Advice:</h3>
        {article.advice.map((advice, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={advice}
              onChange={(e) => handleArticleAdviceChange(articleIndex, index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Advice"
            />
          </div>
        ))}
      </div>
    )}
  </div>
))}
</div>


        <button className='btn' type="submit"><p>Update Content</p></button>
      </form>
    </div> : null
  );
};

export default ContentEditing;