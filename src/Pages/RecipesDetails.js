import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Markup } from "interweave";
// import { Helmet } from "react-helmet";
// import DynamicMeta from "../Comoponents/DynamicMeta";
// import AdSense from "react-adsense";
import GoogleAds from "../Comoponents/GoogleAds";

export default function RecipesDetails() {
  const [item] = useState({});
  const [allItems, setAllItems] = useState([]);
  let params = parseInt(useParams().userId);

  const url = "/api/v1/recipes";

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(url + "/" + params);
  //     const json = await response.json();
  //     console.log(json);
  //     // setAllItems(json.data);
  //     setItem(json.data);
  //   } catch (error) {
  //     //console.log("error", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [params]);

  const fetchData_all = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setAllItems(json.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData_all();
  }, []);

  return (
    <>
      {/* <DynamicMeta description={item.description} title={item?.name} image={item.recipe_images?.image} url={window.location.href} tags={item?.recipe_tags.map(j=>j.tag)} /> */}

      <Container fluid className="innerPage detailspage px-0 pt-0">
        <div className="position-relative">
          <div className="contentWrapper">
            <div className="slideContent">
              <div className="sctionHeading text-white">
                <h2>{item?.name}</h2>
              </div>
              <p className="text-white">
                By {allItems.filter((i) => i.id === params)[0]?.author_name}{" "}
                Updated on &nbsp;
                {new Date(item?.created_at).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </p>
              <div
                className="my-3 text-center"
                style={{ position: "sticky", top: 20 }}
              >
                {item?.recipe_tags &&
                  item?.recipe_tags.map((i, index) => {
                    return (
                      <Badge key={index} className="themeBadge">
                        {i.tag}
                      </Badge>
                    );
                  })}
              </div>
            </div>
          </div>
          <img src={item.recipe_images?.image} alt="sweet" className="w-100" />
        </div>
      </Container>

      <Container>
        <Row className="px-2">
          {/* <AdSense.Google
            client='ca-pub-8996876763511706'
            slot='7806394673'
          /> */}
          <Col md={8} className="px-2 mx-auto mb-3">
            <div className="sctionHeading text-white">
              <h2>Ingredients</h2>
            </div>
            <ul className="ingredients">
              {item.recipe_ingredients &&
                item.recipe_ingredients.map((i, index) => {
                  return (
                    <li key={index} className="themeBadge">
                      {i.ingredients_name}
                    </li>
                  );
                })}
            </ul>
            <GoogleAds />
            <div className="sctionHeading text-white">
              <h2>Steps</h2>
            </div>
            <Markup className="text-white" content={item.description} />
          </Col>
          <Col md={4} className="px-2 mx-auto mb-3">
            <Row className="px-2" style={{ position: "sticky", top: 50 }}>
              <h4 className="mb-3 text-white fw-bold">Latest Recipes</h4>
              {allItems &&
                allItems
                  .sort((a, b) => b.id - a.id)
                  .slice(0, 6)
                  .map((i, index) => {
                    return (
                      <Col
                        md={12}
                        className="px-2 mb-3 position-relative"
                        key={index}
                      >
                        <Link
                          to={`/recipe-details/${i.id}`}
                          className="stretched-link"
                        ></Link>
                        <div className="mb thaliBg px-2 py-3 rounded-3 d-flex">
                          <div className="rounded">
                            <img
                              height={70}
                              width={70}
                              src={i.recipe_images?.image}
                              className="rounded-3"
                              style={{ objectFit: "cover" }}
                              alt="sweet"
                            />
                          </div>
                          <div className="cardInfo ps-3 text-white">
                            <h5>{i.name}</h5>
                            <em className="small">
                              {i.recipe_categories?.category?.title}
                            </em>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
            </Row>
          </Col>
        </Row>

        {/* <a href={`/share.html?name=${item?.name}&image=${item.recipe_images?.image}&auther=${allItems.filter(i => i.id === params)[0]?.author_name}&description=${item?.description}&keywords=${item?.recipe_tags&&item?.recipe_tags.map(i =>i.tag).join(',')}`}>share</a> */}
      </Container>
    </>
  );
}
