import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import Slider from "react-slick";
import { fetchSweetList } from "../firestoreService";
// import { sweetList } from "../stringConstant";

export default function Banner() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [sweetList, setSweetList] = useState([]);
  useEffect(() => {
    fetchSweetList().then((res) => setSweetList(res));
  }, []);
  // const addSweet = () => {
  //   addSweetItem({
  //     value: 1,
  //     label: "Sweet Boondi",
  //     description: "",
  //     offerTitle: "Republic Day Offer",
  //     offer: "145.00",
  //     price: "175.00",
  //     img: "assets/images/boondi.jpeg"
  //   });
  //   fetchSweetList().then((res) => setSweetList(res));
  // };
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
                  {i.offer ? (
                    <p className="multiLine_ellipsis text-white">
                      {i.offerTitle} <br />
                      <b>₹{i.offer}</b>
                      <del>M.R.P. ₹{i.price}</del>
                    </p>
                  ) : (
                    <p>
                      <b>M.R.P. ₹{i.price}</b>
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
      {/* <button onClick={() => addSweet()}>clik</button> */}
    </div>
  );
}
