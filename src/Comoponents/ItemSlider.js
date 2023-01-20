import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function ItemSlider({ data }) {
  const [item, setItem] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }
    ]
  };
  useEffect(() => {
    const url = "/api/v1/recipes";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setItem(json.data.reverse());
      } catch (error) {
        //console.log("error", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Slider {...settings}>
        {item &&
          item
            .filter((j) => j.recipe_categories?.category.title === data[0])
            // .slice(0, 6)
            .map((i, index) => {
              return (
                <div
                  md={4}
                  xs={6}
                  className="px-2 position-relative"
                  key={index}
                >
                  <Link
                    to={`/recipe-details/${i.id}`}
                    className="stretched-link"
                  ></Link>
                  <div className="fancyCard">
                    <img src={i.recipe_images?.image} alt="sweet" />
                    <div className="cardInfo">
                      <h5>{i.name}</h5>
                      <em className="small">
                        {i.recipe_categories?.category?.title}
                      </em>
                      {/* <p className="text-ellipsis">{i.description}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
      </Slider>
    </div>
  );
}
