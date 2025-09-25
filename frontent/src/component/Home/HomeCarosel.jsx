import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/carosel/c1.jpg",
  "/carosel/c2.jpg",
  "/carosel/c3.jpg",
  "/carosel/c4.jpg",
  "/carosel/c5.jpg",
  "/carosel/c6.jpg",
  "/carosel/c7.jpg",
  "/carosel/c8.jpg",
  "/carosel/c9.jpg",
  "/carosel/c10.jpg",
];

const HomeCarosel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3, // Number of images visible at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const settingsMobile = {
    dots: true,
    infinite: true,
    slidesToShow: 1, // Number of images visible at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <>
      <div className="slide-container overflow-hidden hidden md:block">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[500px]"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="slide-container overflow-hidden  md:hidden">
        <Slider {...settingsMobile}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[500px]"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HomeCarosel;
