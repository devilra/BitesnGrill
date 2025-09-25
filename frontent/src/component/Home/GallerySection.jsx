import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const GallerySection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    "/gallery/g1.jpg",
    "/gallery/g2.jpg",
    "/gallery/g3.jpg",
    "/gallery/g4.jpg",
    "/gallery/g5.jpg",
    "/gallery/g6.jpg",
  ];

  const gallerySettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600, // smooth scroll
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true, // center slide highlight
    // centerPadding: "0px", // no extra padding around
    // beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4, centerMode: true } },
      { breakpoint: 1024, settings: { slidesToShow: 3, centerMode: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, centerMode: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerMode: true } },
    ],
  };

  const gallerySettingsMobile = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal = (index) => {
    console.log(index);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => {
      const result = (prev - 1 + galleryImages.length) % galleryImages.length;
      console.log(result);
      return result;
    });
  };

  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );

  return (
    <div className="md:px-6 py-5 md:py-12 overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block">
        <Slider {...gallerySettings}>
          {galleryImages.map((img, index) => (
            <div key={index} className="px-2">
              <img
                src={img}
                alt={`Gallery ${index}`}
                onClick={() => openModal(index)}
                className={`w-full h-60 object-cover rounded-lg transition-transform duration-500
                     
                  
                `}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Slider {...gallerySettingsMobile}>
          {galleryImages.map((img, index) => (
            <div key={index} className="px-1">
              <img
                src={img}
                alt={`Gallery ${index}`}
                className={`w-full h-60 object-cover rounded-lg `}
              />
            </div>
          ))}
        </Slider>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 bg-opacity-90 flex items-center justify-center z-[9999]">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={closeModal}
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={prevImage}
          >
            <FaArrowLeft />
          </button>
          {/* AnimatePresence + motion.img */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={currentIndex} // important for animation
              src={galleryImages[currentIndex]}
              alt="Modal"
              className="max-w-[90%] max-h-[80%] object-contain rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={nextImage}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
