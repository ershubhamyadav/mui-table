import React from "react";

import { Container, Row, Col, Form } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Container className="innerPage">
      <div className="sctionHeading text-white">
        <h2>About Us</h2>
      </div>
      <Form>
        <Row className="px-2 text-white">
          <Col md={12}>
            <h4 className="mb-4 mt-5">Welcome To www.vandemishthan.com</h4>{" "}
            <p>
              Want a new, healthy dish to try out but not sure where to start?
              We've got you covered! vandemishthan.com is the place to go for
              any type of recipe you're looking for, from quick breakfast
              recipes to tasty vegetarian options. Whether it's a quick, simple
              meal or a more complex dish, we've got plenty of ideas for you.
              Cook smarter with Vande Mishthan!
            </p>
            <p>
              We believe cooking is a magical experience, so we make it easy for
              people to find and share recipes with the vandemishthan.com
              community. With recipes across food categories, we offer the
              largest recipe catalog in existence. Whether you're looking for
              appetizing breakfast recipes or easy dinner ideas, you'll find
              everything you need and more on vandemishthan.com!
            </p>
            <p>
              Everyday healthy cooking has been simplified. With Vande Mishthan,
              you'll find the perfect recipe for your ingredients and style.
              Whether you want to make a vegetarian dish, eat healthy without
              giving up the taste, or impress your date with a homemade dinner,
              Vande Mishthan is here to help!
            </p>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
