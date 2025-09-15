// Upcommingevent.jsx
import React, { useEffect, useRef, useState } from "react";
import "./upcommingevent.css";
import { Link } from "react-router-dom";
import image1 from "../../assets/rccg2.jpg";
import image2 from "../../assets/rccg3.jpg";

// fallback image if event.image is missing or invalid
import defaultImage from "../../assets/rccg2.jpg";

const ZERO_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

/* ---------------------- Helper date functions ---------------------- */

function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return isValidDate(value) ? value : null;
  const parsed = new Date(value);
  return isValidDate(parsed) ? parsed : null;
}

// returns the last Sunday (Date object) for a given 0-based month & year
function getLastSundayOfMonth(year, month) {
  // month may overflow (we'll use Date's auto-correction)
  const lastDay = new Date(year, month + 1, 0); // last day of target month
  const date = new Date(lastDay);
  while (date.gerefurbishedDay() !== 0) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

// returns the next upcoming Sunday from 'now' (serviceHour in 0-23)
function getNextSundayFrom(now = new Date(), serviceHour = 8) {
  const date = new Date(now);
  // days until next Sunday (0 => Sunday). If today is Sunday, daysUntil = 0.
  const daysUntilSunday = (7 - date.getDay()) % 7;
  const candidate = new Date(date);
  candidate.setDate(date.getDate() + daysUntilSunday);
  candidate.setHours(serviceHour, 0, 0, 0);

  // If candidate time has already passed, jump to next week's Sunday
  if (candidate.getTime() <= now.getTime()) {
    candidate.setDate(candidate.getDate() + 7);
  }
  return candidate;
}

// returns the next upcoming last-Sunday (either this month's last Sunday if in future, otherwise next month's)
function getNextLastSundayFrom(now = new Date(), serviceHour = 8) {
  let year = now.getFullYear();
  let month = now.getMonth();

  const lastThisMonth = getLastSundayOfMonth(year, month);
  lastThisMonth.setHours(serviceHour, 0, 0, 0);

  if (lastThisMonth.getTime() > now.getTime()) {
    return lastThisMonth;
  }

  // move to next month
  month += 1;
  if (month > 11) {
    month = 0;
    year += 1;
  }
  const lastNextMonth = getLastSundayOfMonth(year, month);
  lastNextMonth.setHours(serviceHour, 0, 0, 0);
  return lastNextMonth;
}

function formatDateTime(date) {
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

/* ---------------------- Countdown hook ---------------------- */

function useCountdown(targetDate) {
  const [time, setTime] = useState(ZERO_TIME);

  useEffect(() => {
    if (!targetDate || !isValidDate(targetDate)) {
      setTime(ZERO_TIME);
      return;
    }

    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTime(ZERO_TIME);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}

/* ---------------------- EventCard component ---------------------- */

function EventCard({ event }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // safe targetDate (Date object) for hook
  const targetDate = isValidDate(event.targetDate) ? event.targetDate : parseDate(event.targetDate);

  const time = useCountdown(targetDate);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            setIsVisible(true);
            // once visible we can unobserve for smoother effect
            try { obs.unobserve(entry.target); } catch (e) {}
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => {
      try {
        if (ref.current) obs.unobserve(ref.current);
      } catch (e) {}
    };
  }, []);

  // choose image src (support data URLs from backend)
  const imgSrc = event.image || defaultImage;

  return (
    <div ref={ref} className="upcommingevent_container">
      <div className="upcomming_image">
        <img src={imgSrc} alt={event.title || "event"} onError={(e) => (e.target.src = defaultImage)} />
      </div>

      <div className="upcomming_details">
        <h3>{event.title}</h3>

        <p><i className="fa-solid fa-calendar-days"></i> {event.dateTime || formatDateTime(event.targetDate)}</p>
        <p><i className="fa-solid fa-location-dot"></i> {event.location}</p>

        {event.description && <p className="event-desc">{event.description}</p>}

        <div className="countdown">
          <div className="div">
            <p>Days</p>
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
  );
}

/* ---------------------- Main component ---------------------- */

const Upcommingevent = ({ eventData = [] }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const now = new Date();

    const processed = (eventData || []).map((ev) => {
      // normalize lower data
      const datelogic = (ev.datelogic || "").toString().toLowerCase();
      const titleLower = (ev.title || "").toString().toLowerCase();

      // dynamic: last-sunday-of-month
      if (datelogic.includes("last") || titleLower.includes("unusual") || datelogic.includes("last sunday")) {
        const target = getNextLastSundayFrom(now, 8); // service hour 8:00
        return {
          ...ev,
          targetDate: target,
          dateTime: formatDateTime(target),
        };
      }

      // dynamic: weekly / next / every sunday
      if (
        datelogic.includes("weekly") ||
        datelogic.includes("next") ||
        titleLower.includes("weekly") ||
        datelogic.includes("every sunday") ||
        titleLower.includes("sunday service")
      ) {
        const target = getNextSundayFrom(now, 8);
        return {
          ...ev,
          targetDate: target,
          dateTime: formatDateTime(target),
        };
      }

      // else: treat as static — parse provided targetDate (if present)
      const parsed = parseDate(ev.targetDate || ev.datelogic || ev.datelogic);
      return {
        ...ev,
        targetDate: parsed, // may be null (handled in EventCard)
        dateTime: ev.dateTime || (isValidDate(parsed) ? formatDateTime(parsed) : ev.dateTime),
      };
    });

    setEvents(processed);
  }, [eventData]);

  return (
    <div className="upcommingevent">
      <h2 className="title">Our Upcoming Events</h2>
      <p className="title_small">Don’t miss what God is doing among us!</p>

      <div className="upcommingevent_list">
        {events.length ? (
          events.map((ev, idx) => <EventCard key={ev.id ?? ev.title ?? idx} event={ev} />)
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Upcommingevent;