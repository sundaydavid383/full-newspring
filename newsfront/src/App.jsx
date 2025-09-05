import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/Home";
import SignupForm from "./pages/signup/SignUp";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/footer/Footer";
import Service from "./pages/service/Service";
import WorshipNight from "./pages/worshipNight/WorshipNight";
import BibleStudy from "./pages/bibleStudy/BibleStudy";
import ReadBlog from "./pages/readBlog/ReadBlog";
import BlogGrid from "./pages/bloggrid/BlogGrid";
import NoRoute from "./pages/noRoute/NoRoute";
import DataBase from "./pages/dataBase/DataBase";
import Retreat from "./pages/retreat/Retreat";
import BottomMoodBox from "./components/bottommoodBox/BottomMoodBox";
import ContentEditing from "./pages/contentEditing/ContentEditing";
import Test from "./Test";
import Test2 from "./Test2";
import { getSection } from "../src/dependencies/homecontentSection";

const App = () => {
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataBase, setDataBase] = useState([]);
  const [homedata, setHomeData] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false); // 👈 controls button visibility
  const base_Url = "https://full-newspring.onrender.com/";

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Check if footer is visible
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // when footer is visible in viewport
      if (footerTop <= windowHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSection();
        setHomeData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const onLoad = async () => {
    try {
      const response = await fetch(`${base_Url}api/people`);
      const data = await response.json();
      console.log(data);
      setDataBase(data.data);
    } catch (error) {
      console.error(error);
      alert("an error occured");
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  console.log("database at App.jsx", dataBase);

  window.onerror = function (message, source, lineno, colno, error) {
    fetch(`${base_Url}log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        source,
        lineno,
        colno,
        error: error?.stack,
      }),
    });
  };

  if (loading)
    return (
      <div className="loading">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
      </div>
    );

  return (
    <div>
      <BottomMoodBox />

      <Nav active={active} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setActive={setActive}
              dataBase={dataBase}
              setDataBase={setDataBase}
              onLoad={onLoad}
              homedata={homedata}
            />
          }
        />
        <Route path="/about" element={<About setActive={setActive} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service setActive={setActive} />} />
        <Route
          path="/register"
          element={<SignupForm setDataBase={setDataBase} onLoad={onLoad} />}
        />
        <Route path="/worshipnight" element={<WorshipNight />} />
        <Route path="/biblestudy" element={<BibleStudy />} />
        <Route path="/retreat" element={<Retreat />} />
        <Route
          path="/readblog/:id"
          element={<ReadBlog setActive={setActive} scrollTop={scrollTop} />}
        />
        <Route
          path="/bloggrid/:categoryIndex"
          element={<BlogGrid scrollTop={scrollTop} setActive={setActive} />}
        />
        <Route path="*" element={<NoRoute />} />
        <Route
          path="/dataBase"
          element={
            <DataBase
              setActive={setActive}
              dataBase={dataBase}
              setDataBase={setDataBase}
              onLoad={onLoad}
            />
          }
        />
        <Route path="/content/editing" element={<ContentEditing />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
      <Footer />

      {/* 👇 Only show when footer is visible */}
      {showScrollTop && (
        <div className="take_up">
          <i
            onClick={() => {
              scrollTop();
            }}
            className="fa-solid fa-arrow-up iconactive"
          ></i>
        </div>
      )}
    </div>
  );
};

export default App;