import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import Blog from "./components/blog/blog";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Routes>
          {/* Routes avec Navbar */}
          <Route
            path="/Home"
            element={
              <>
                <Navbar />
                <ScrollToTop />
                <Home />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Navbar />
                <ScrollToTop />
                <Blog />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <ScrollToTop />
                <About />
              </>
            }
          />
          <Route
            path="/resume"
            element={
              <>
                <Navbar />
                <ScrollToTop />
                <Resume />
              </>
            }
          />
          {/* Route sans Navbar */}
          <Route path="/" element={<Login />} />
          <Route path="/project" element={<Projects />} />
          {/* Redirection vers la page d'accueil pour les routes non définies */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
