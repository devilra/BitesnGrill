import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
  { name: "Birthday Parties", rupee: "₹ 250", src: "/book/b1.jpg" },
  { name: "Kitty Parties", rupee: "₹ 349", src: "/book/b2.jpg" },
  { name: "Private Parties", rupee: "₹ 349", src: "/book/b3.jpg" },
];

const GroupBook = () => {
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
        <div className="absolute bottom-4 flex flex-col space-y-4 ">
          <span className="text-white font-bold text-5xl">{img.name}</span>
          <div className="inline-block space-y-5">
            <p className="text-white font-bold text-5xl">{img.rupee}</p>
            <div className=" h-[4px] w-[150px] bg-[#CE1212]"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* desktop........ */}

      <div className=" relative hidden md:hidden lg:flex">
        <div>
          <img
            src="/book/b1.jpg"
            alt="b1"
            className="lg:h-[600px] lg:w-[500px] object-cover object-left"
          />
          <div className="absolute bottom-4 space-y-4">
            <h1 className="text-white font-bold text-3xl">Birthday Parties</h1>
            <div className="inline-block space-y-5">
              <p className="text-white font-bold text-5xl">₹ 250</p>
              <div className=" h-[2px] w-full bg-[#CE1212]"></div>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src="/book/b2.jpg"
            alt="b1"
            className="lg:h-[600px] lg:w-[400px] object-top object-cover"
          />
          <div className="absolute bottom-4 space-y-4">
            <h1 className="text-white font-bold text-3xl">Kitty Parties</h1>
            <div className="inline-block space-y-5">
              <p className="text-white font-bold text-5xl">₹ 349</p>
              <div className=" h-[2px] w-full bg-[#CE1212]"></div>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/book/b3.jpg"
            alt="b1"
            className="lg:h-[600px] lg:w-[400px] object-top object-cover"
          />
          <div className="absolute bottom-4 space-y-4">
            <h1 className="text-white font-bold text-3xl">Private Parties</h1>
            <div className="inline-block space-y-5">
              <p className="text-white font-bold text-5xl">₹ 349</p>
              <div className=" h-[2px] w-full bg-[#CE1212]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="slide-container overflow-hidden md:hidden">
          <Slider {...settingsMobile}>
            {images.map((img, index) => renderSlide(img))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default GroupBook;
