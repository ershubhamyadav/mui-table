import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banner from "../Comoponents/Banner";
import DynamicMeta from "../Comoponents/DynamicMeta";
import ItemSlider from "../Comoponents/ItemSlider";
export default function Home() {
  const [item, setItem] = useState([]);
  const [category, setCategory] = useState([]);

  // const params = useParams();
  // console.log(params.userId, "===============");
  useEffect(() => {
    const url = "/api/v1/recipes";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET"
          }
        });
        const json = await response.json();
        setItem(json.data);
      } catch (error) {
        //console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const url = "/api/v1/category";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCategory(json.data);
      } catch (error) {
        //console.log("error", error);
      }
    };
    fetchData();
  }, []);
  // console.log(item);
  return (
    <>
      <DynamicMeta
        description={`What's your favorite dish to cook?
    Need a little inspiration? You've come to the right place! Explore new flavors, ingredients and recipes that are just waiting to be discovered. Register now and get started.`}
        title={"Vande Mishthan"}
        image={"/storage/app/public/recipees/6377c2075c313.jpeg"}
        url={"https://www.vandemishthan.co.in"}
        tags={" food,food and drink,food industry"}
      />
      <Banner />
      <section className="submitRecipe">
        <Container>
          <div className="sctionHeading text-white">
            <Row className="px-2">
              <Col md={8} className="px-2 ">
                <a
                  href="www.vandemishthan.com"
                  className="navbar-brand d-block mb-4 text-white"
                >
                  Vande Mishthan
                </a>
                <div className="sctionHeading">
                  <h2>Check-out your Sweet orders &nbsp; </h2>
                  <p>
                    onClick "Get Quote" you can enquiry your sweets order. you
                    will get estimate price and delivery availability.
                    <br />
                    no need to travel no need to visit at shop, get fresh sweets
                    at your home on order.
                    <br />
                    <b>
                      Make whole day sweetness with vande-mishthan sweets,
                      <br />
                      Eat sweets being sweet.
                    </b>
                  </p>
                </div>
                <div className="mt-5">
                  <Link to="/get-quote" className="themeBtn">
                    Get Quote
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className="sctionHeading text-white">
            <h2>Latest Recipes</h2>
            <p>
              If you've been craving some time in the kitchen, we're here to
              help! Check out these trending recipes from our community members
              and get cooking!
              <br />
              You're in the kitchen with us! Find the latest recipes and food
              ideas on our vandemishthan.co.in.⁣
            </p>
          </div>
          <Row className="px-2">
            {item &&
              item
                .sort((a, b) => b.id - a.id)
                .slice(0, 6)
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
                          <em className="small">{i.category}</em>
                          {/* <p className="text-ellipsis">{i.description}</p> */}
                        </div>
                      </div>
                    </Col>
                  );
                })}
          </Row>
        </Container>
      </section>

      <section className="thaliBg">
        <Container>
          <div className="sctionHeading text-white">
            <p>
              <h2>Most Delicious Sweets</h2>
              You don’t need fancy ingredients to make delicious food!🍜
              <br />
              Just take a Phone and order now, you will get fresh sweets at your
              door.
            </p>
          </div>
          <Row className="px-2">
            {item &&
              item
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
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
                              ? i.recipe_categories?.category?.title
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
      </section>
      {category &&
        category.map((x, i) => {
          return (
            <section className={i % 2 === 1 ? "thaliBg" : ""} key={i}>
              <Container>
                <div className="sctionHeading">
                  <h2 className="text-white">{x.title}</h2>
                </div>
                {/* {
                 JSON.stringify(x)
                } */}
                <ItemSlider data={[x.title]} />
              </Container>
            </section>
          );
        })}
    </>
  );
}
