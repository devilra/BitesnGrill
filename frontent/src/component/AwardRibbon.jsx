// src/components/AwardRibbon.js
const AwardRibbon = () => {
  const handleClick = (e) => {
    if (e.target.nodeName.toLowerCase() !== "a") {
      window.open("https://restaurant-guru.in/Bites-n-Grill-Mumbai");
    }
  };

  return (
    <div className="text-center" id="circle-r-ribbon" onClick={handleClick}>
      {/* Top Circle */}
      <div className="r-ribbon_ahead">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160px"
          height="160px"
          viewBox="0 0 160 160"
        >
          <defs>
            <path id="heading-arc" d="M 30 80 a 50 50 0 1 1 100 0"></path>
          </defs>
          <text
            className="r-ribbon_ahead-heading"
            fill="#000"
            textAnchor="middle"
          >
            <textPath startOffset="50%" xlinkHref="#heading-arc">
              Recommended
            </textPath>
          </text>
        </svg>
      </div>

      <p className="r-ribbon_year">2024</p>
      <a
        href="https://restaurant-guru.in/Bites-n-Grill-Mumbai"
        className="r-ribbon_title"
        target="_blank"
        rel="noreferrer"
      >
        Bites n Grill
      </a>

      {/* Bottom Circle */}
      <div className="r-ribbon_ahead r-ribbon_ahead-bottom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120px"
          height="120px"
          viewBox="0 0 120 120"
        >
          <defs>
            <path id="subheading-arc" d="M 12 60 a 48 48 0 0 0 96 0"></path>
          </defs>
          <text className="r-ribbon_ahead-subh" fill="#000" textAnchor="middle">
            <textPath startOffset="50%" xlinkHref="#subheading-arc">
              <a
                href="https://restaurantguru.com"
                target="_blank"
                rel="noreferrer"
              >
                Restaurant Guru
              </a>
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default AwardRibbon;
