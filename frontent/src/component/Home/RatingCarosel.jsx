import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import AwardRibbon from "../AwardRibbon";

// Review slider settings
const reviewSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const reviews = [
  {
    name: "Haritha Vijay",
    text: "Very good chats, savouries, juices, etc.",
    rating: 5,
  },
  {
    name: "Vijay Senathipathi",
    text: "Good place in the neighborhood for a evening snack/quick bite. Recommended for Repeated visits as the menu is quite varied and longgggg.",
    rating: 5,
  },
  {
    name: "Sarath Kumar",
    text: "Best place to eat chaats in washermanpet... Sandwiches are made with customer's choice.. Hygienic preparation... Very economical....must try open grill sandwich",
    rating: 5,
  },
];

const reviews_2 = [
  {
    name: "Thobias Ainickal",
    text: " Absolutely phenomenal experience at Bites and Grills! Their burger is hands down the best I've ever tasted, juicy and flavorful, truly a five-star delight. The garlic bread is a heavenly combination of crispy outside and soft inside, a perfect appetizer. And let's talk about their Watermelon Punch – refreshing, tangy, and utterly delicious! Highly recommend this place for foodies looking for top-notch flavors and a fantastic dining experience. ",
    rating: 5,
  },
  {
    name: "Gaurang Moralwar",
    text: "My best friend and i came to know about this place recently so we thought let's give it a try then we headed to this place and we totally loved it. They are situated at cubic mall in chembur and they have a cute and elegant decor which is perfect for a date. The staff is very generous here, service is a bit slow but they will improve quickly.Coming to the food we opted for, blue moon, death by chocolate, roasted chicken wrap, bbq chicken and cheese fries and a chicken seekh kebab pizza. Everything was made to perfection we really enjoyed the food. From the above that fries and chocolate milkshake was our favourite. The prices are reasonable and not heavy to pocket so it's a great place for big groups too.Overall it was a great experience over here if you are in a nearby area don't forget to check out this place.",
    rating: 5,
  },
  {
    name: "Rajesh Manjrekar",

    text: "This place has the best cheeze pizza we had so far, the cheezepull is just insane!! Not just that they have a very different taste to their pizzas….Coming to the best thing here the BURGERS 🍔They have the best burgers in town all the patties are made in-house.They hot the huge Burj Khalifa Burger which you can’t find anywhere!!!!The burger is just perfect, each and every element in it will satisfy your tastebuds, right juicy, right crispy, and perfect quantity!!They also have a variety of pasta which is fabulous!And the most unique dish we had so far Zucchini Rolls which is a blend of paneer and cheese.",
    rating: 5,
  },
];

// Star component to show dynamic rating (strict)
const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const fillPercentage = Math.min(Math.max(rating - (i - 1), 0), 1) * 100;
    // e.g. rating=4.1 → for star 5 => 10%

    stars.push(
      <div key={i} className="relative w-6 h-6">
        {/* background star (gray) */}
        <FaStar className="absolute top-0 left-0 px-1 text-gray-300 w-8 h-8" />
        {/* filled star (green) with clip */}
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <FaStar className="text-yellow-500 px-1 w-8 h-8" />
        </div>
      </div>
    );
  }

  return <div className="flex space-x-1">{stars}</div>;
};

const ReviewCard = ({ review }) => {
  return (
    <div className="border border-yellow-400 overflow-y-scroll  p-6 rounded-lg shadow-xl relative h-[300px] flex flex-col justify-between">
      {/* Quote Icon */}
      <div className="absolute left-0 top-6 border-l-4 border-red-600 h-[70%]"></div>

      <div className="text-center px-4">
        <p className="text-gray-800 text-lg italic">
          <FaQuoteLeft className="text-red-500 inline mr-2 text-xl" />
          {review.text}
          <FaQuoteRight className="text-red-500 inline ml-2 text-xl" />
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-lg text-gray-900">{review.name}</h3>
        <div className="flex mt-2">
          {Array.from({ length: review.rating }, (_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

const RatingCarosel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
  };
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-center text-3xl pb-7 md:text-5xl">
        Google<span className="text-[#CE1212]"> Rating</span>
      </h1>

      <div className="flex flex-col px-3 md:flex-row justify-between ">
        <div className="mb-10">
          <div>
            <h1 className="text-[15px] md:text-[34px]  mb-2">
              Google Rating : Mahim : 4.5
            </h1>
            <div className="">
              <StarRating rating={4.7} />
            </div>
            <button className="text-[#CE1212] text- my-2 pb-5 hover:text-black">
              Read More
            </button>
          </div>
          <div>
            <h1 className="text-[15px] md:text-[34px] mb-2">
              Swiggy Rating 4.3
            </h1>
            <StarRating rating={4.6} />
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-[15px] md:text-[34px] mb-2">
              Google Rating : Kurla : 4.8
            </h1>
            <StarRating rating={4.8} />
            <button className="text-[#CE1212] text- my-2 pb-5 hover:text-black">
              Read More
            </button>
          </div>
          <div>
            <h1 className="text-[15px] md:text-[34px] mb-2">
              Zomato Dine in Rating 4.1
            </h1>
            <StarRating rating={4.3} />
          </div>
        </div>
      </div>

      <div className="w-[100px] h-[100px] my-5 flex justify-center items-center max-w-md mx-auto bg-gray-300">
        <AwardRibbon />
      </div>

      {/* <Slider {...reviewSettings}>
        {reviews.map((review, index) => (
          <div key={index} className="p-5 border rounded-lg m-2">
            <p className="mb-2">{review.text}</p>
            <h2 className="font-semibold">{review.name}</h2>
            <StarRating rating={review.rating} />
          </div>
        ))}
      </Slider> */}
      <div className=" py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Carousel 1 */}
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Slider>

          {/* Carousel 2 */}
          <Slider {...settings}>
            {reviews_2.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RatingCarosel;
