import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useBlogs } from "../../context/BlogContext";
import { ImCross } from "react-icons/im";

const BlogCarosel = () => {
  const { blogs, loading, fetchBlogs } = useBlogs();
  const [selectedBlog, setSelectedBlog] = useState(null);

  //console.log(blogs);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (blogs.length === 0) fetchBlogs();
  }, []);

  if (loading) return <p className="text-center">Loading blogs...</p>;
  if (!blogs || blogs.length === 0)
    return <p className="text-center">No blogs available</p>;

  // Desktop carousel
  const settingsDesktop = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: true,
  };

  // Mobile carousel
  const settingsMobile = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false,
  };

  const renderSlide = (blog) => {
    const imageUrl = blog.image ? `${API_URL}${blog.image}` : "/blogs/b2.jpg";
    return (
      <div
        key={blog.id}
        className="px-1 md:px-5 cursor-pointer "
        onClick={() => setSelectedBlog(blog)}
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-[300px] md:h-[350px] object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gray-200 p-4 flex flex-col justify-between rounded-b-lg">
            <span className="text-black text-xl md:text-2xl font-bold">
              {blog.title}
            </span>
            <p
              className="text-gray-700 line-clamp-3 text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
            ></p>
            <button className="border-b-2 font-bold hover:text-black cursor-pointer border-b-[#CE1212] text-start text-[#CE1212] py-1 mt-2">
              Read More
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Carousel */}
      <div className="slide-container overflow-hidden hidden md:block">
        <Slider {...settingsDesktop}>
          {blogs.map((blog) => renderSlide(blog))}
        </Slider>
      </div>

      {/* Mobile Carousel */}
      <div className="slide-container overflow-hidden md:hidden">
        <Slider {...settingsMobile}>
          {blogs.map((blog) => renderSlide(blog))}
        </Slider>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center  justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-0 rounded-full cursor-pointer right-0 bg-red-500/40 p-2 text-xl font-bold"
                onClick={() => setSelectedBlog(null)}
              >
                <ImCross size={10} className="text-red-500" />
              </button>
              <img
                src={
                  selectedBlog.image
                    ? `http://localhost:4000${selectedBlog.image}`
                    : "/blogs/b2.jpg"
                }
                alt={selectedBlog.title}
                className="w-full h-[400px]  object-contain rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedBlog.contentHtml }}
              ></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogCarosel;
