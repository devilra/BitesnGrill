"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    "HOME",
    "ABOUT",
    "MENU",
    "PARTY BOOKING",
    "GALLERY",
    "CONTACT",
    "FRANCHISE ENQUIRY",
  ];

  return (
    <nav
      style={{
        backgroundImage: 'url("/banner/b.jpg")',
      }}
      className="h-[100px] w-full md:h-[120px] px-5 md:pl-20 flex justify-between items-center bg-center bg-no-repeat bg-cover"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2">
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

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center text-[16px] font-bold  gap-3">
        {menuItems.map((item, idx) => (
          <motion.li
            key={idx}
            className="relative font-bold cursor-pointer group"
          >
            <span className=" duration-300  group-hover:text-white">
              {item}
            </span>
            {/* Animated underline */}
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
      <div className="md:hidden flex items-center gap-5">
        <li>
          <button className="bg-[#CE1212] text-[10px] border-2 border-black text-white font-bold px-2 py-2 rounded-full transition-all duration-300 hover:bg-black hover:border-[#CE1212]">
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
                <span className="transition-colors duration-300 group-hover:text-[#CE1212]">
                  {item}
                </span>
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
