
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Video from "./pages/Video";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Team from "./pages/Team";
import Certificates from "./pages/Certificates";

import Preloader from "./components/Preloader";
import ScrollAnimations from "./components/ScrollAnimations";
import ServiceDetails from "./pages/ServiceDetails";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />

      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      <ScrollAnimations />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetails />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="video" element={<Video />} />
          <Route path="contact" element={<Contact />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="team" element={<Team />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
