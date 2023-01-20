import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DynamicMeta from "../Comoponents/DynamicMeta";
export default function Recipes() {
  const [item, setItem] = useState([]);
  let params = useParams().categoryTitle;

  // console.log(params.userId, "===============");
  useEffect(() => {
    const url = "/api/v1/recipes";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setItem(json.data);
      } catch (error) {}
    };

    fetchData();
  }, []);
  // function capitalizeFirstLetter(str) {
  //   return str[0].toUpperCase() + str.slice(1);
  // }
  return (
    <>
      <DynamicMeta
        description={`What's your favorite dish to cook?
    Need a little inspiration? You've come to the right place! Explore new flavors, ingredients and recipes that are just waiting to be discovered. Register now and get started.`}
        title={"Vande Mishthan"}
        image={"/storage/app/public/recipees/6377c2075c313.jpeg"}
        url={"https://www.vandemishthan.co.in/recipes/" + params}
        tags={" food,food and drink,food industry"}
      />

      <Container className="innerPage">
        <div className="sctionHeading text-white">
          <h2>{params.replace("-", " ")}</h2>
        </div>
        <Row className="px-2">
          {item &&
            item
              .filter(
                (j) =>
                  j.recipe_categories?.category?.title
                    .toLowerCase()
                    .replace(" ", "-") === params
              )
              .map((i, index) => {
                // console.log(i);
                return (
                  <Col
                    md={4}
                    xs={6}
                    className="px-2 mb-3 position-relative"
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
                          {i.recipe_categories !== undefined
                            ? i.recipe_categories?.title
                            : ""}
                        </em>
                        {/* <p className="text-ellipsis">{i.description}</p> */}
                      </div>
                    </div>
                  </Col>
                );
              })}
        </Row>
      </Container>
    </>
  );
}
