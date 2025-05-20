import React, { useEffect, useState } from "react";
import "./App.css"
import Nav from "./components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/Home";
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
import ContentEditing from "./pages/contentEditing/ContentEditing";
import Test from "./Test";
import Test2 from "./Test2";


const App = () => {
  
  const [active, setActive] = useState("");
  const [dataBase, setDataBase] = useState([])
  const base_Url = 'https://full-newspring.onrender.com/'

    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onLoad = async ()=>{
      try {
        const response = await fetch('http://localhost:5001/api/people')
        const data = await response.json()
        console.log(data)
        setDataBase(data.data)
      } catch (error) {
         console.error(error)
         alert("an error occured")
      }
        }
    
    useEffect(() => {
      onLoad()
    }, [])
    console.log("database at App.jsx", dataBase)

    
  

  return (
    <div>
     
      <Nav active={active} />
      <Routes>
        <Route path="/" element={<Home setActive={setActive} dataBase={dataBase} setDataBase={setDataBase} onLoad={onLoad} />} />
        <Route path="/about" element={<About setActive={setActive} />} />
        <Route path="/contact" element={<Contact setActive={setActive} />} />
        <Route path="/services" element={<Service setActive={setActive} />} />
        <Route path="/worshipnight" element={<WorshipNight />} />
        <Route path="/biblestudy" element={<BibleStudy />} />
        <Route path="/retreat" element={<Retreat />} />
        <Route path="/readblog/:id"element={<ReadBlog setActive={setActive} />}/>
        <Route path="/bloggrid/:categoryIndex" element={<BlogGrid setActive={setActive}/> } />
        <Route path="*" element={<NoRoute/>}/>   
        <Route path="/dataBase" element={<DataBase setActive={setActive} dataBase={dataBase} setDataBase={setDataBase} onLoad={onLoad} />}/>
        <Route path="/content/editing" element={<ContentEditing />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
      <Footer />
      <div  className=" take_up ">
        <i onClick={()=>{scrollTop()}} className="fa-solid fa-arrow-up iconactive"></i>
      </div>
    </div>
  );
};

export default App;
