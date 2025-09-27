import React from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Footer";
import Contact from "./component/Contact";
import FranchiseEnquiry from "./component/FranchiseEnquiry";
import Signup from "./component/Signup";
import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard from "./component/Dashboard/DashboardLayout";
import Blog from "./component/Dashboard/Blog";
import DashboardHome from "./component/Dashboard/DashboardHome";
import { ToastContainer } from "react-toastify";
import BlogCreate from "./component/Dashboard/BlogCreate";
import BlogEdit from "./component/Dashboard/BlogEdit";
import BlogDetail from "./component/Dashboard/BlogDetail";

const App = () => {
  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/franchise" element={<FranchiseEnquiry />} />

        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="signup" element={<Signup />} />
            <Route path="blog">
              <Route index element={<Blog />} />
              <Route path="create" element={<BlogCreate />} />
              <Route path="edit/:id" element={<BlogEdit />} />
              <Route path=":id" element={<BlogDetail />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      {!hideNavbar && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3 sec
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="colored" // light, dark, colored
      />
    </>
  );
};

export default App;
