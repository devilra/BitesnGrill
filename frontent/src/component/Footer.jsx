import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { MdAccessAlarms } from "react-icons/md";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#F0BC04] text-black px-6 md:px-10  py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Address */}
        <div>
          <div className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>
              <SlLocationPin className="" size={20} />
            </span>
            Address
          </div>
          <div>
            {" "}
            <span></span>
            <p className="text-sm leading-relaxed">
              Shop No : 4, Karam Bhoomi Bldg, Mori Rd, Nr Mahim Bus Depot, Mahim
              West- 400016 <br />
              Shop No: 25, 3rd Floor, East Point Mall, SG Barve Marg, opposite
              Kurla West Station Road, Jagruti Nagar, East, Kurla, Mumbai,
              Maharashtra 400024
            </p>
          </div>
        </div>

        {/* Reservations */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>
              <IoCallOutline size={20} />
            </span>{" "}
            Reservations
          </h3>
          <p className="text-sm">
            Mahim: <span className="text-red-600">+91 95049 02902</span> <br />
            Kurla: <span className="text-red-600">+91 99878 59229</span> <br />
            <span className="font-bold text-md">Email:</span>{" "}
            bitesngrill@gmail.com
          </p>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>
              <MdAccessAlarms size={20} />
            </span>{" "}
            Opening Hours
          </h3>
          <p className="text-sm">
            <span className="font-bold">Mahim</span> <br />
            Mon-Sat: 1200 - 2400; <br />
            Sunday: Closed <br />
            <br />
            <span className="font-bold">Kurla</span> <br />
            Mon-Sat: 1100 - 2300; <br />
            Sunday: Closed
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 rounded-full border border-gray-200/45 hover:border-black duration-300 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 rounded-full border border-gray-200/45 hover:border-black duration-300 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 rounded-full border border-gray-200/45 hover:border-black duration-300 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm mt-10 border-t border-black/20 pt-4">
        © Copyright <span className="font-bold">BitesnGrill.</span> All Rights
        Reserved <br />
        Designed by <span className="font-semibold">Amigowebster</span>
      </div>

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <IoIosArrowUp size={22} />
        </button>
      )}
    </footer>
  );
}
