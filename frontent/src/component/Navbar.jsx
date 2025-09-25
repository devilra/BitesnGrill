"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateLink = () => {
    navigate("/");
  };

  const menuItems = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "MENU", id: "menu" },
    { name: "PARTY BOOKING", id: "party" },
    { name: "GALLERY", id: "gallery" },
    { name: "CONTACT", id: "contact", path: "/contact" },
    { name: "FRANCHISE ENQUIRY", id: "franchise", path: "/franchise" },
  ];

  const renderLink = (item) => {
    if (item?.path) {
      const isActive = location.pathname === item.path;

      return (
        <RouterLink
          to={item.path}
          className={`duration-300 group-hover:text-white ${
            isActive ? "text-white" : ""
          } `}
        >
          {item.name}
        </RouterLink>
      );
    } else {
      return (
        <ScrollLink
          to={item.id}
          smooth={true}
          duration={600}
          spy={true}
          offset={-120}
          onClick={() => navigateLink()}
          activeClass="text-white"
          className={`duration-300 group-hover:text-white ${
            location.pathname !== "/" ? "text-black" : ""
          } `}
        >
          {item.name}
        </ScrollLink>
      );
    }
  };

  return (
    <nav
      style={{
        backgroundImage: 'url("/banner/b.jpg")',
      }}
      className="h-[100px] sticky z-[1000] top-0 w-full pl-10 md:h-[120px] gap-5 flex  items-center bg-center bg-no-repeat bg-cover"
    >
      {/* Logo Section */}
      <div className="flex items-center  md:pl-10 gap-2">
        <img
          src="/banner/logo.png"
          alt="logo"
          className="h-[70px] md:h-[98px]"
        />
        <img
          src="/banner/logo2.png"
          alt="logo"
          className="h-[45px] md:h-[65px]"
        />
      </div>

      {/*  Desktop Menu   */}
      <ul className="hidden md:hidden lg:flex items-center justify-center text-[15px] font-bold  gap-5">
        {menuItems.map((item, idx) => (
          <motion.li
            key={idx}
            className="relative font-bold cursor-pointer group"
          >
            {renderLink(item)}

            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute left-0 -bottom-1 h-[2px] bg-white origin-left"
            />
          </motion.li>
        ))}
        <li className="rounded-full">
          <button className="bg-[#CE1212] border-2 border-black text-white font-bold px-4 py-2 rounded-full transition-all duration-300 hover:bg-black hover:border-[#CE1212]">
            Order Now
          </button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex justify-end items-center gap-3">
        <li>
          <button className="bg-[#CE1212] text-[7px] border-2 border-black text-white font-bold px-2 py-2 rounded-full transition-all duration-300 hover:bg-black hover:border-[#CE1212]">
            Order Now
          </button>
        </li>
        {isOpen ? (
          <HiX
            onClick={() => setIsOpen(false)}
            className="text-3xl cursor-pointer text-white"
          />
        ) : (
          <HiMenu
            onClick={() => setIsOpen(true)}
            className="text-3xl cursor-pointer text-white"
          />
        )}
      </div>

      {/* Mobile Slide Menu */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 right-0 w-[85%] sm:w-[50%] h-full bg-white text-black flex flex-col items-start p-8 z-50"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-3xl mb-6"
          >
            <HiX />
          </button>
          <ul className="flex flex-col gap-6 text-lg font-semibold">
            {menuItems.map((item, idx) => (
              <motion.li key={idx} className="relative cursor-pointer group">
                {renderLink(item)}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute left-0 -bottom-1 h-[2px] bg-[#CE1212] origin-left"
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
