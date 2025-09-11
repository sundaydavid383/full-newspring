import { useRef, useEffect, useState } from "react";
import "./upcommingevent.css";
// If you're using react-router-dom (most apps do), import Link from here:
import { Link } from "react-router-dom";
import image1 from "../../assets/rccg2.jpg";
import image2 from "../../assets/rccg3.jpg";

const ZERO_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getLastSundayOfMonth(year, month) {
  const lastDay = new Date(year, month + 1, 0);
  const date = new Date(lastDay);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() - 1);
  }
  // normalize time
  date.setHours(0, 0, 0, 0);
  return date;
}

function getFirstSundayOfMonth(year, month) {
  const date = new Date(year, month, 1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  // normalize time
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDateTimeForDisplay(date) {
  if (!date) return "";
  return new Date(date).toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const Upcommingevent = ({ eventData }) => {
  const observer = useRef(null);
  const containerRef = useRef(null);
  const [time, setTime] = useState(ZERO_TIME);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.current.unobserve(entry.target);
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    const el = containerRef.current;
    if (el && observer.current) observer.current.observe(el);

    return () => {
      try {
        if (observer.current && el) observer.current.unobserve(el);
      } catch (err) {
        /* ignore if already unobserved */
      }
    };
  }, []);

  const computeDisplayEvent = (backendEvent) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based

    // Find first Sunday of THIS month (used to decide anchor month)
    const firstSundayThisMonth = getFirstSundayOfMonth(year, month);
    const firstSundayThisMonthAt10 = new Date(firstSundayThisMonth);
    firstSundayThisMonthAt10.setHours(10, 0, 0, 0);

    // Decide anchor month: if now is BEFORE firstSundayThisMonth @10:00
    // then the anchor for "last Sunday" is the previous month (we're still counting down
    // from previous month's lastSunday -> firstSunday of this month).
    let anchorMonth = month;
    let anchorYear = year;
    if (now <= firstSundayThisMonthAt10) {
      anchorMonth = month - 1;
      if (anchorMonth < 0) {
        anchorMonth = 11;
        anchorYear = year - 1;
      }
    }

    const lastSunday = getLastSundayOfMonth(anchorYear, anchorMonth);
    const firstSundayNextMonth = getFirstSundayOfMonth(anchorYear, anchorMonth + 1);

    // Sunday Unusual window: start = lastSunday - 10 days (00:00), end = lastSunday @ 10:00 AM
    const unusualStart = new Date(lastSunday);
    unusualStart.setDate(unusualStart.getDate() - 10);
    unusualStart.setHours(0, 0, 0, 0);

    const unusualEnd = new Date(lastSunday);
    unusualEnd.setHours(10, 0, 0, 0);

    // Thanksgiving window: after unusualEnd up to firstSundayNextMonth @ 10:00 AM
    const thanksgivingEnd = new Date(firstSundayNextMonth);
    thanksgivingEnd.setHours(10, 0, 0, 0);

    const sundayUnusual = {
      title: "Sunday Unusual Service",
      description:
        "A special season of deep worship, prophetic encouragement and testimonies. Come expecting God to move.",
      image: image1,
      dateTime: formatDateTimeForDisplay(unusualEnd),
      location: "RCCG Newspring, Idiroko Bus Stop",
      datelogic: unusualEnd.toISOString(),
    };

    const thanksgivingSunday = {
      title: "Thanksgiving Sunday",
      description:
        "Our monthly thanksgiving celebration — praise, testimonies and corporate gratitude to God.",
      image: image2,
      dateTime: formatDateTimeForDisplay(thanksgivingEnd),
      location: "RCCG Newspring, Idiroko Bus Stop",
      datelogic: thanksgivingEnd.toISOString(),
    };

    // Decision (inclusive of unusualEnd at 10:00)
    if (now >= unusualStart && now <= unusualEnd) {
      return sundayUnusual;
    } else if (now > unusualEnd && now <= thanksgivingEnd) {
      return thanksgivingSunday;
    } else {
      return (
        backendEvent || {
          title: "No Upcoming Event",
          description: "No event data available.",
          image: "/images/default-event.jpg",
          dateTime: "",
          location: "",
          datelogic: null,
        }
      );
    }
  };

  // compute every render (we re-render every second because of the countdown state)
  const displayEvent = computeDisplayEvent(eventData);

  // Countdown effect with safe cleanup
  useEffect(() => {
    if (!displayEvent || !displayEvent.datelogic) {
      setTime(ZERO_TIME);
      return;
    }

    const targetDate = new Date(displayEvent.datelogic);
    let interval = null;

    const tick = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTime(ZERO_TIME);
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    // run immediately then every second
    tick();
    interval = setInterval(tick, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [displayEvent && displayEvent.datelogic]);

  return (
    <div className="upcommingevent">
      <h2 className="title">Our Upcoming Events</h2>
      <p className="title_small">{displayEvent.description}</p>

      <div className="upcommingevent_container" ref={containerRef}>
        <div className="upcomming_image">
          <img src={displayEvent.image} alt={displayEvent.title || "event"} />
        </div>

        <div className="upcomming_details">
          <h3>{displayEvent.title}</h3>
          <p>
            <i className="fa-solid fa-calendar-days"></i> {displayEvent.dateTime}
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> {displayEvent.location}
          </p>

          <div className="countdown">
            <div className="div">
              <p>Day</p>
              <span>{String(time.days).padStart(2, "0")}</span>
            </div>
            <div className="div">
              <p>Hours</p>
              <span>{String(time.hours).padStart(2, "0")}</span>
            </div>
            <div className="div">
              <p>Minutes</p>
              <span>{String(time.minutes).padStart(2, "0")}</span>
            </div>
            <div className="div">
              <p>Seconds</p>
              <span>{String(time.seconds).padStart(2, "0")}</span>
            </div>
          </div>

          <Link to="/contact" className="btn">
            <p>Contact Us</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Upcommingevent;