import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { BsGoogle, BsFacebook, BsInstagram } from "../../Icon";

export default function Login() {
  return (
    <>
      <Card style={{ width: "300px" }} className="m-0">
        <Card.Body className="pt-2">
          <div className="d-flex justify-content-center ">
            <h4 className="fw-bold mb-2">Login</h4>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <a className="small text-primary" href="#!">
                Forgot password?
              </a>
            </Form.Group>
            <div className="d-grid mb-2">
              <Button variant="primary" type="submit">
                Login
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
              Don't have an account?{" "}
              <a href="{''}" className="text-primary fw-bold">
                Sign Up
              </a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
