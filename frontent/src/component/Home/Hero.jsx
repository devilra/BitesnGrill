import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import HomeCarosel from "./HomeCarosel";
import ReactPlayer from "react-player/youtube";
import { FaArrowLeft, FaArrowRight, FaTimes, FaPlay } from "react-icons/fa";
import PartyCarosel from "./PartyCarosel";
import BlogCarosel from "./BlogCarosel";
import GallerySection from "./GallerySection";
import RatingCarosel from "./RatingCarosel";
import GroupBook from "./GroupBook";
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";

const Hero = () => {
  const images = ["/banner/b2.jpg", "/banner/b4.jpg", "/banner/b5.jpg"];
  const [index, setIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const videos = [
    "https://youtu.be/ZsfWMSjAYFY",
    "/about/a2.jpg",
    "/about/a3.jpg",
    "/about/a4.jpg",
    "/about/a5.jpg",
    "/about/a6.jpg",
    "/about/a7.jpg",
  ];

  const nextItem = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const currentItem = videos[currentIndex];
  const isVideo =
    currentItem.includes("youtube") || currentItem.includes("youtu.be");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-20">
      <div className="w-full h-[25vh]  md:h-[83vh] flex items-center md:items-end justify-center md:justify-start relative overflow-hidden">
        {/* Background fade change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index} // React-ku ithu replace panna solluthu
            className="absolute inset-0 bg-contain md:bg-cover bg-no-repeat "
            style={{ backgroundImage: `url(${images[index]}?v=${index})` }}
          />
        </AnimatePresence>

        <div className="md:hidden absolute top-[5px]  right-[4px]">
          <ul className="flex flex-col space-y-[1px] items-center justify-center w-[100px]">
            <li className="text-center px-2 bg-black/25 text-[10px] py-1  text-white flex flex-col items-center">
              <img src="/banner/m1.png" className="h-7 " /> FRANCHISEE ENQUIRY
            </li>
            <li className="text-center px-7 bg-black/25 text-[10px] py-1  text-white flex flex-col items-center">
              <img src="/banner/m2.png" className="h-7 " /> ABOUT US
            </li>
            <li className="text-center px-7 bg-black/25 text-[10px] py-1  text-white flex flex-col items-center">
              <img src="/banner/m3.png" className="h-7 " /> GALLERY
            </li>
            <li className="text-center px-6 bg-black/25 text-[10px] py-1  text-white flex flex-col items-center">
              <img src="/banner/m4.png" className="h-7 " /> PARTY BOOKING
            </li>
          </ul>
        </div>

        {/* Button on top */}
        <div className="relative md:ml-36 md:mb-20">
          <button
            style={{ fontSize: "20px" }}
            className="bg-[#CE1212]  text-center mt-5 px-10 py-4 text-2xl md:text-[20px] border-3 border-black rounded-2xl shadow-md text-white font-bold hover:bg-black transition"
          >
            Order Now
          </button>
        </div>
      </div>
      {/* section----2 */}
      <section className="px-2 ">
        <h1 className="text-center text-3xl md:text-5xl font-semibold py-7">
          Our <span className="text-[#CE1212]">Popular Deals</span>
        </h1>
        <div className=" flex gap-3 md:gap-7 mt-5 justify-center ">
          <div>
            <img
              src="/deals/d1.jpg"
              alt="deals"
              className="h-[200px] md:h-[300px] w-[300px] md:w-full "
            />
          </div>
          <div>
            <img
              src="/deals/d2.jpg"
              alt="deals"
              className="h-[200px] md:h-[300px] w-[300px] md:w-full"
            />
          </div>
        </div>
      </section>
      {/* section-------3 */}
      <section>
        <h1 className="text-3xl md:text-5xl font-semibold text-center py-5">
          Our <span className="text-[#CE1212]">Store</span>
        </h1>
        <HomeCarosel />

        <div id="menu" className="bg-gray-200 mt-10 pb-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-center py-5">
            Our <span className="text-[#CE1212]">Menu</span>
          </h1>
          <div className=" flex flex-col md:flex-row gap-3 md:gap-7 mt-5 justify-center ">
            <div>
              <img
                src="/menu/m1.jpg"
                alt="deals"
                className="h-[400px] md:h-[350px] w-full md:w-[550px] "
              />
            </div>
            <div>
              <img
                src="/menu/m2.jpg"
                alt="deals"
                className="h-[400px] md:h-[350px] w-full md:w-[550px]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* section-----------4 */}
      <div className="md:px-8" id="about">
        <h2 className=" text-[#CE1212] text-3xl md:text-5xl font-semibold text-center py-5">
          About Us
        </h2>
        <section className="px-6 grid md:-mt-10 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Media Preview */}

          <div className="pt-16">
            <p className="md:text-lg  mb-3">
              Welcome to Bites n Grill, a culinary hotspot nestled in the heart
              of Mumbai. We are more than just a pizza and burger joint; we are
              a haven for food lovers who crave for a variety of delicious
              dishes.
            </p>
            <p className="md:text-lg mb-3">
              Bites n Grill is a bustling hub of flavors and aromas. Our menu
              boasts a wide range of mouth-watering dishes, including the
              freshest and most delicious Burgers, Pizzas, Pastas, Tacos,
              Frankies, Sandwiches, and much more.
            </p>
            <p className="md:text-lg mb-3">
              Our pizzas, baked to perfection with a blend of fresh ingredients,
              authentic Italian flavours and an Indian touch to it. Our burgers,
              made with the juiciest inhouse patties and freshest veggies, are
              sure to tantalize your taste buds. But that's not all! We also
              offer a variety of pastas, tacos, frankies, and sandwiches, each
              dish crafted with love and served with a side of warmth.
            </p>

            <p className="md:text-lg mb-3">
              We are open 7 days a week, ready to serve you a feast of flavours
              at any time of the day.
            </p>
            <p className="md:text-lg mb-3">
              So, whether you're looking for a quick bite on a busy day or a
              relaxed meal - Bites n Grill is the place to be.
            </p>
            <p className="md:text-lg mb-3">
              Come, join us at Bites n Grill, and embark on a gastronomic
              journey that you'll remember
            </p>

            {/* Preview (first video or image) */}
            <div
              className="relative w-full hover:shadow-lg transition  overflow-hidden cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {isVideo ? (
                <ReactPlayer
                  url={currentItem}
                  width="100%"
                  height="250px"
                  light={true} // always show thumbnail
                />
              ) : (
                <img
                  src={currentItem}
                  alt="Preview"
                  className="w-full h-[250px] object-cover"
                />
              )}

              {/* 🔥 Always visible play icon overlay */}
              {isVideo && (
                <div className="absolute inset-0 flex  items-center justify-center bg-black bg-opacity-30">
                  <FaPlay className="text-white text-5xl cursor-pointer" />
                </div>
              )}
            </div>

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
                <div className="relative w-[95%] md:w-[80%] h-[85%] bg-black flex items-center justify-center rounded-lg overflow-hidden">
                  {isVideo ? (
                    <ReactPlayer
                      url={currentItem}
                      width="100%"
                      height="100%"
                      controls
                      playing
                    />
                  ) : (
                    <img
                      src={currentItem}
                      alt="Slide"
                      className="w-full h-full object-contain"
                    />
                  )}

                  {/* Prev Button */}
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 cursor-pointer p-3 rounded-full shadow-lg"
                    onClick={prevItem}
                  >
                    <FaArrowLeft className="text-black text-xl" />
                  </button>

                  {/* Next Button */}
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 cursor-pointer p-3 rounded-full shadow-lg"
                    onClick={nextItem}
                  >
                    <FaArrowRight className="text-black text-xl" />
                  </button>

                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 bg-white/40 cursor-pointer p-3 rounded-full shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaTimes className="text-black text-xl" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Static Image */}
          <div className=" ">
            <img
              src="/about/a1.jpg"
              alt="Burger with Fries"
              className=" h-[700px] w-full md:-mt-16 shadow-xl object-cover"
            />
          </div>
        </section>
      </div>

      {/* section--------------5 */}

      <section id="party">
        <div className="mt-10 px-4 md:px-8">
          <h1 className="text-center text-3xl md:text-5xl pb-5 md:pb-12 ">
            Why <span className="text-[#CE1212]">Choose Bites' n Grill</span>
          </h1>
          <p className="font-bold py-1 text-[18px]">
            Quality Ingredients:{" "}
            <span className="font-normal">
              At Bites n Grill, we use only the highest quality ingredients in
              our Burgers and pizzas, this ensures that every bite is as
              delicious as possible.
            </span>
          </p>
          <p className="font-bold py-1 text-[18px]">
            Variety of Options:
            <span className="font-normal">
              Our menu offers a wide range of options, from sides to Burgers,
              Pizzas, Pasta, Taco’s to Milkshakes and Mojitos. Whether you’re a
              vegetarian, a meat lover or Jain, there’s something for everyone
              at Bites n Grill.
            </span>
          </p>
          <p className="font-bold py-1 text-[18px]">
            Friendly Service:
            <span className="font-normal">
              Our staff is dedicated to providing the best service possible. We
              strive to make every customer feel welcomed and appreciated.
            </span>
          </p>
        </div>

        <div className="mt-10">
          <PartyCarosel />
        </div>
        <div className="flex justify-center pt-10">
          <button className="bg-[#CE1212] text-white px-10 py-3 font-semibold rounded-full">
            Call Us
          </button>
        </div>
      </section>

      {/* section----------------6 */}

      <section className="mt-10">
        <h1 className="text-center text-3xl md:text-5xl font-semibold text-[#CE1212]">
          Blogs
        </h1>
        <div className="mt-10">
          <BlogCarosel />
        </div>
      </section>

      {/* section-----------------7 */}

      <section id="gallery" className="mt-10 bg-gray-200 py-5 md:py-10">
        <h1 className="text-center text-3xl md:text-5xl font-semibold ">
          Check <span className="text-[#CE1212]">Our Gallery</span>
        </h1>
        <div className="mt-10">
          <GallerySection />
        </div>
        <div className="pt-5">
          <RatingCarosel />
        </div>
      </section>

      {/* section------------------8 */}

      <section>
        <div>
          <h1 className="text-center text-3xl md:text-5xl pt-5">
            Group<span className="text-[#CE1212]">Booking</span>
          </h1>
          <div className="mt-10">
            <GroupBook />
          </div>
          <div className="flex justify-center pt-10">
            <button className="bg-[#CE1212] text-white px-10 py-3 font-semibold rounded-full">
              Call Us
            </button>
          </div>
        </div>
      </section>

      {/* section-------------------9 */}

      <section className="mt-10">
        <div className="bg-gray-200 pb-20 group transform transition-transform duration-500 group-hover:scale-110 ">
          <h1 className="text-center text-3xl md:text-5xl py-7">
            Franchise <span className="text-[#CE1212]">Enquiry</span>
          </h1>

          <div className="max-w-6xl flex relative flex-col gap-10  lg:flex-row mx-auto">
            <div className="p-1 border border-yellow-600 bg-white rounded transform transition-transform duration-500 hover:scale-110">
              <img
                src="/enquiry/e1.jpg"
                alt="e1"
                className="w-full md:w-[400px] lg:w-[350px] object-cover rounded  "
              />
              <div
                className="absolute bottom-0 w-full md:w-[400px] lg:w-[350px]  h-[150px] lg:h-[250px] bg-no-repeat bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url("https://bitesngrill.com/assets/img/team-shape.svg")`,
                  // zoom aagama correct fit aagum
                }}
              >
                <div className=" font-bold w-full mt-32 ">
                  <div className=" bg-white w-full">
                    <h1 className="text-black text-xl w-full text-center py-10 bg-white  lg:pt-10 ">
                      Dine-in Cafe or Restaurant
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1 border border-yellow-600 bg-white rounded transform transition-transform duration-500 hover:scale-110">
              <img
                src="/enquiry/e2.jpg"
                alt="e1"
                className="w-full md:w-[400px] lg:w-[350px] object-cover rounded"
              />
              <div
                className="absolute bottom-0 w-full md:w-[400px] lg:w-[350px]  h-[150px] lg:h-[250px] bg-no-repeat bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url("https://bitesngrill.com/assets/img/team-shape.svg")`,
                  // zoom aagama correct fit aagum
                }}
              >
                <div className="font-bold w-full mt-32 ">
                  <div className=" bg-white w-full">
                    <h1 className="text-black text-xl w-full text-center py-12 bg-white  lg:pt-10 ">
                      Food Court
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1 border border-yellow-600 bg-white rounded transform transition-transform duration-500 hover:scale-110">
              <img
                src="/enquiry/e3.jpg"
                alt="e1"
                className="w-full md:w-[400px] lg:w-[350px]  rounded"
              />
              <div
                className="absolute bottom-0 w-full md:w-[400px] lg:w-[350px]  h-[150px] lg:h-[250px] bg-no-repeat bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url("https://bitesngrill.com/assets/img/team-shape.svg")`,
                  // zoom aagama correct fit aagum
                }}
              >
                <div className=" font-bold w-full mt-32 ">
                  <div className=" bg-white w-full">
                    <h1 className="text-black text-xl w-full text-center py-10 bg-white  lg:pt-10 ">
                      Take Away joint
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-10">
            <button className="bg-[#CE1212] cursor-pointer hover:text-black text-white px-10 py-3 font-semibold rounded-full">
              Franchise Booking
            </button>
          </div>
        </div>
      </section>

      {/* section----------------------------------10 */}

      <section className="mt-10 max-w-6xl mx-auto">
        <div>
          <h1 className="text-center text-3xl md:text-5xl pb-5 md:pb-12 ">
            Table <span className="text-[#CE1212]">Booking</span>
          </h1>
          <div className="bg-gray-200 flex flex-col md:gap-10 lg:gap-20 md:flex-row lg:flex-row ">
            <div>
              <img
                src="/booking/b1.jpg"
                alt="booking"
                className="h-[400px] md:h-[500px] lg:h-[520px]"
              />
            </div>
            <div>
              <img
                src="/booking/b2.jpg"
                alt="booking"
                className="h-[400px] md:h-[400px] lg:h-[420px]"
              />
              <div className="flex justify-center items-end mt-3 pt-10">
                <button className="bg-[#CE1212] cursor-pointer hover:text-black text-white px-10 py-3 font-semibold rounded-full">
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl  mb-10">
          Need Help? <span className="text-[#CE1212]">Contact Us</span>
        </h2>

        {/* Google Maps */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-14 px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4769199087004!2d72.83800047444353!3d19.0427577530168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92e17100001%3A0x8ba96c0925b39f32!2sSt.%20Michael&#39;s%20Church%2C%20Mahim!5e0!3m2!1sen!2sin!4v1758801351182!5m2!1sen!2sin"
            className="w-full md:w-1/2 h-72 border-0 rounded shadow"
            allowfullscreen=""
            loading="lazy"
          ></iframe>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7541.945576469112!2d72.881287!3d19.064934!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9bf40c4ed19%3A0xa25d3b05259a616c!2sBites&#39;%20n%20Grill!5e0!3m2!1sen!2sin!4v1758801464198!5m2!1sen!2sin"
            className="w-full md:w-1/2 h-72 border-0 rounded shadow"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Address Heading */}
        <h2 className="text-center text-3xl md:text-5xl  mb-10">
          Our <span className="text-[#CE1212]">Address</span>
        </h2>

        {/* Address & Contact Boxes */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {/* Mahim */}
          <div className="border border-yellow-400 flex flex-col justify-center items-center p-6 rounded  shadow-2xl transition">
            <h3 className="text-3xl font-bold mb-3 text-center">Mahim</h3>
            <img
              src="/address/a1.png"
              alt="location"
              className="w-[70px] h-[70px] md:w-[80px] md:h-[80px]"
            />
            <p className="text-center text-[18px] py-5">
              <span className="font-bold">Shop No: 4</span>, Karam Bhoomi Bldg,
              Mori Rd, Nr Mahim Bus Depot, Mahim West-400016
            </p>
          </div>

          {/* Kurla */}
          <div className="border border-yellow-400 flex flex-col justify-center items-center p-6 rounded  shadow-2xl transition">
            <h3 className="text-3xl font-bold mb-3 text-center">Mahim</h3>
            <img
              src="/address/a1.png"
              alt="location"
              className="w-[70px] h-[70px] md:w-[80px] md:h-[80px]"
            />
            <p className="text-center text-[18px] py-5">
              <span className="font-bold">Shop No: 25</span>, 3rd Floor, East
              Point Mall, SG Barve Marg, opposite Kurla West Station Road,
              Jagruti Nagar, East, Kurla, Mumbai, Maharashtra 400024
            </p>
          </div>

          {/* Email */}
          <div className="border border-yellow-400 flex flex-col justify-center items-center p-6 rounded shadow-2xl transition">
            <h3 className="text-3xl font-bold mb-3 text-center">Email Us</h3>
            <FiMail size={120} className="py-5" />

            <p className="font-bold">bitesngrill@gmail.com</p>
          </div>

          {/* Call */}
          <div className="border border-yellow-400 flex flex-col justify-center items-center p-6 rounded shadow-2xl transition">
            <h3 className="text-3xl font-bold mb-3 text-center">Call Us</h3>
            <IoCallOutline size={120} className="py-5" />
            <p>
              Mahim:{" "}
              <a className="text-[#CE1212]" href="tel:+919504902902">
                +91 95049 02902
              </a>{" "}
              <br />
              Kurla:{" "}
              <a className="text-[#CE1212]" href="tel:+919987859229">
                +91 99878 59229
              </a>
            </p>
          </div>
        </div>

        {/* Bottom button */}
        <div className="flex justify-center mt-10">
          <button className="bg-[#CE1212] text-white px-6 py-3 rounded-full shadow hover:text-black  cursor-pointer transition">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
