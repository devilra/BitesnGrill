import React from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import Contact from "./component/Contact";
import FranchiseEnquiry from "./component/FranchiseEnquiry";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/franchise" element={<FranchiseEnquiry />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
