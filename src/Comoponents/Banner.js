import React from "react";
import Slider from "react-slick";

export default function Banner({ sweetList }) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
                  {i.offerTitle && (
                    <p className="multiLine_ellipsis text-white">
                      {i.offerTitle}
                    </p>
                  )}
                  {i.offer ? (
                    <p className="multiLine_ellipsis text-white">
                      <b>₹{i.offer}</b>
                      <del>M.R.P. ₹{i.price}</del>
                    </p>
                  ) : (
                    <p className="multiLine_ellipsis text-white">
                      {i.price && <b>M.R.P. ₹{i.price}</b>}
                    </p>
                  )}
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
