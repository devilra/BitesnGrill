import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { name: "Press Releases HT - Slurrp", src: "/party/p1.png" },
  { name: "Press Releases Times Of india", src: "/party/p2.jpg" },
  { name: "Press Releases Hi celeb", src: "/party/p3.png" },
  { name: "Press Releases Times Of india ", src: "/party/p4.png" },
];

const PartyCarosel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: false,
    arrows: true,
  };

  const settingsMobile = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  };

  const renderSlide = (img) => (
    <div className="px-1">
      {" "}
      {/* Add horizontal padding for gap */}
      <div className="relative">
        <img
          src={img.src}
          alt={img.name}
          className="w-full h-[500px] object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gray-200  p-4 flex flex-col justify-between  rounded-b-lg">
          <span className="text-black text-3xl md:text-3xl font-bold">
            {img.name}
          </span>
          <button className="border-b-3 font-bold hover:text-black cursor-pointer border-b-[#CE1212] text-start text-[#CE1212] py-1">
            Read More
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="slide-container overflow-hidden hidden md:block">
        <Slider {...settings}>
          {images.map((img, index) => renderSlide(img))}
        </Slider>
      </div>
      <div className="slide-container overflow-hidden md:hidden">
        <Slider {...settingsMobile}>
          {images.map((img, index) => renderSlide(img))}
        </Slider>
      </div>
    </>
  );
};

export default PartyCarosel;
