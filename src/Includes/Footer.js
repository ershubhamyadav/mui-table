import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  const [category, setCategory] = useState([]);

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

  return (
    <footer>
      <hr style={{ borderColor: "#ddd" }} />
      <section>
        <Container>
          <Row>
            <Col lg={3}>
              <Link to="/privacy-policy" className="navbar-brand text-white">
                Vande Mishthan
              </Link>
              <p className="text-white my-3">
                What's your favorite dish to cook?
                <br />
                Need a little inspiration? You've come to the right place!
                Explore new flavors, ingredients and recipes that are just
                waiting to be discovered. Register now and get started.⁣⁣
              </p>
            </Col>
            <Col lg={2} className="offset-lg-1">
              <h5 className="text-white fw-bold">Quick Links</h5>
              <Link
                className="d-block text-white py-3 text-decoration-none"
                to="/"
              >
                Home
              </Link>
              <Link
                className="d-block text-white py-3 text-decoration-none"
                to="/about-us"
              >
                About Us
              </Link>
              <Link
                className="d-block text-white py-3 text-decoration-none"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="d-block text-white py-3 text-decoration-none"
                to="/terms_and_conditions"
              >
                Terms & Conditions
              </Link>
            </Col>
            <Col lg={5} className="offset-md-1">
              <h5 className="text-white fw-bold">Categories</h5>
              <Row>
                {category &&
                  category.map((item, index) => {
                    return (
                      <Link
                        className="d-block col-sm-6 text-white py-3 text-decoration-none"
                        to={`/recipes/${item.title
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {" "}
                        {item.title}
                      </Link>
                    );
                  })}
              </Row>
            </Col>
            <Col md={12}>
              <p className="text-white text-center mb-3 mt-5">
                copyright © {new Date().getFullYear()} Vande Mishthan
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}
