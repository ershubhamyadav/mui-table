import React, { useState } from "react";
import {
  Card,
  Container,
  Button,
  Form,
  InputGroup,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardGrid from "../../Comoponents/CardGrid";
import { ConfirmModal } from "../../Comoponents/ConfirmModal";
import { addSweetItem } from "../../firestoreService";

export function SweetForm(props) {
  const { submitEvent, values = {} } = props;
  const Navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formValue, setFormValue] = useState(values);
  const [showConfirm, setShowConfirm] = useState(false);
  console.log("formValue", formValue);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() !== false) {
      const postData = { ...formValue };
      if (formValue?.offer) {
        let net_offer = parseFloat(
          (formValue?.price * formValue?.offer) / 100
        ).toFixed(2);
        let sell_offer = parseFloat(formValue?.price - net_offer);
        postData["net_offer"] = net_offer;
        postData["sell_price"] = sell_offer;
      }
      console.log({ postData });
      setFormValue(postData);
      setShowConfirm(true);
    }
    setValidated(true);
  };

  const onChangeImage = (e) => {
    const { name, files } = e.target;
    const [imageFile] = files;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFormValue((state) => ({
        ...state,
        [name]: fileReader.result
      }));
    };
    fileReader.readAsDataURL(imageFile);
  };

  return (
    <Container className="innerPage">
      <Card className="bg-dark text-white mb-3">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="my-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Sweet name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Sweet"
                  name="sweet_name"
                  value={formValue?.sweet_name}
                  onChange={(e) =>
                    setFormValue((state) => ({
                      ...state,
                      [e.target.name]: e.target.value
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                <Form.Label>Price</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    aria-describedby="inputGroupPrepend"
                    name="price"
                    value={formValue?.price}
                    onChange={(e) =>
                      setFormValue((state) => ({
                        ...state,
                        [e.target.name]: e.target.value
                      }))
                    }
                    required
                  />
                  <InputGroup.Text id="inputGroupPrepend">₹</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter price.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                <Form.Label>Stock</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Stock"
                    aria-describedby="inputGroupPrepend"
                    name="stock"
                    value={formValue?.stock}
                    onChange={(e) =>
                      setFormValue((state) => ({
                        ...state,
                        [e.target.name]: e.target.value
                      }))
                    }
                    required
                  />
                  <InputGroup.Text id="inputGroupPrepend">KG</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter stock.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="my-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Offer Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Offer Title"
                  name="offer_title"
                  value={formValue?.offer_title}
                  onChange={(e) =>
                    setFormValue((state) => ({
                      ...state,
                      [e.target.name]: e.target.value
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom01">
                <Form.Label>Offer %</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="offer %"
                  name="offer"
                  value={formValue?.offer}
                  onChange={(e) =>
                    e.target.value < 60 &&
                    setFormValue((state) => ({
                      ...state,
                      [e.target.name]: e.target.value
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom01">
                <Form.Label>Offer Expiration</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="offer %"
                  name="offer_expiration"
                  value={formValue?.offer_expiration}
                  onChange={(e) =>
                    setFormValue((state) => ({
                      ...state,
                      [e.target.name]: e.target.value
                    }))
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Looks good!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="my-3">
              <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                <Form.Label>Image</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="image"
                    // value={formValue?.image}
                    onChange={(e) => onChangeImage(e)}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter stock.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-between">
              <div md="6">
                <Button type="submit">Submit form</Button>
              </div>
              <div md="6">
                <Button type="button" onClick={() => Navigate(-1)}>
                  Back
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
      {showConfirm && (
        <ConfirmModal
          isShow={showConfirm}
          handleClose={() => setShowConfirm(false)}
          handleSubmit={() => submitEvent(formValue)}
          children={
            <Card.Body className="p-0">
              <Card.Img variant="top" src={formValue.image} height={"200px"} />
              <hr className="mt-0" />
              <div className=" px-2 m-0">
                <p className="multiLine_ellipsis ">
                  Name : {formValue.sweet_name}
                </p>
                <p className="multiLine_ellipsis ">
                  Price : {formValue.price} ₹
                </p>
                <p className="multiLine_ellipsis ">
                  Offer Title : {formValue.offer_title}
                </p>
                <p className="multiLine_ellipsis ">
                  Offer : {formValue.offer} %
                </p>
                <p className="multiLine_ellipsis ">
                  Offer : {formValue.net_offer} ₹
                </p>
                <p className="multiLine_ellipsis ">
                  Sell Price : {formValue.sell_price} ₹
                </p>
              </div>
            </Card.Body>
          }
        />
      )}
    </Container>
  );
}
