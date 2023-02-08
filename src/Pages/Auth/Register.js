import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { BsGoogle, BsFacebook, BsInstagram } from "../../Icon";

export function Register() {
  return (
    <>
      <Row className=" my-4 mx-5">
        <Card className="mx-5" style={{ width: "400px" }}>
          <Card.Body className="pt-2">
            <div className="d-flex justify-content-center ">
              <h4 className="fw-bold mb-2">Register</h4>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">Mobile number</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confrim Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-grid mb-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              <p className="d-flex justify-content-around p-0">~ OR ~</p>
              <div className="d-flex justify-content-around">
                <BsGoogle />
                <BsFacebook />
                <BsInstagram />
              </div>
            </Form>
            <div className="mt-3">
              <p className="mb-0  text-center">
                Already have an account
                <a href="{''}" className="text-primary fw-bold">
                  Login
                </a>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}
