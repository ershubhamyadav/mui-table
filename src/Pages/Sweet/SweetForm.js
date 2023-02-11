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
import { addSweetItem } from "../../firestoreService";

export function SweetForm(props) {
  const { submitEvent, values = {} } = props;
  const [validated, setValidated] = useState(false);
  const [formValue, setFormValue] = useState(values);
  console.log("formValue", formValue);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() !== false) {
      submitEvent(formValue);
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
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter stock.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
