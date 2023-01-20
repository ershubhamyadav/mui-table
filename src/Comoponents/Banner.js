import React from "react";
// import { Link } from "react-router-dom";

import Slider from "react-slick";
import { sweetList } from "../stringConstant";

export default function Banner() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div>
      <Slider className="mainSlider" {...settings}>
        {sweetList.map((i) => {
          return (
            <div className="position-relative" key={i.value}>
              <div className="contentWrapper">
                <div className="slideContent">
                  <h3 className="fw-bold text-white">
                    {i.label !== undefined ? i.label : "No Name"}
                  </h3>
                  <p className="multiLine_ellipsis text-white">
                    {i.description}
                  </p>
                  {/* <Link
                    to={`/recipe-details/${i.id}`}
                    className="d-block h5 fw-bold text-white text-center"
                  >
                    Read More
                  </Link> */}
                </div>
              </div>
              <img src={i.img} alt="sweet" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
