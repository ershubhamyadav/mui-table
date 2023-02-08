import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Markup } from "interweave";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Container, Row, Col, Form, Card, InputGroup } from "react-bootstrap";
import { addClient, fetchSweetList } from "../firestoreService";
// import Select from "react-select";
// import TextEditor from "../Comoponents/TextEditor";
// import Toastify from "../Comoponents/Toastify";

let newArr = [];
export default function GetQuote() {
  let _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [contentState] = useState(raw);
  const [sweetList, setSweetList] = useState([]);
  useEffect(() => {
    fetchSweetList().then((res) => {
      let data = res.map((item) => ({
        ...item,
        label: item.price
          ? item.label + " ₹" + item.price + " per KG"
          : item.label
      }));
      setSweetList(data);
    });
  }, []);
  // const [getDescription] = useState();
  const [errors, setErrors] = useState([]);
  const [payload, setPayload] = useState({
    school_name: "",
    email: "",
    category_id: [],
    takenTime: "",
    images: "",
    selectedSweet: []
  });
  const notify = (notification) => toast(notification);
  // console.log(contentState.blocks, "contentState");

  const getDes = () => {
    contentState.blocks.map((i) => newArr.push(i.text));
  };
  getDes();

  const options = [];
  const [selectedOption] = useState(null);

  const handelChange_ingredients = (option) => {
    setPayload((prevState) => ({
      ...prevState,
      selectedSweet: option
    }));
  };

  const onChangeSweet = (ind, obj) => {
    const list = payload.selectedSweet;
    list.splice(ind, 1, { ...list[ind], ...obj });
    setPayload((state) => ({
      ...state,
      selectedSweet: list
    }));
  };

  const submit = async () => {
    try {
      const res = await addClient(payload);
      notify("Recipe added successfully");
      setPayload({});
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onChange = (e) => {
    setPayload((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const minDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  return (
    <Container className="innerPage">
      <div className="sctionHeading text-white">
        <h2>Get Order Quote</h2>
        CartList
      </div>
      {errors.length !== 0 ? (
        <Card className="bg-dark text-white mb-3">
          <Card.Body>
            <Row>
              <Col lg={3} md={4} className="text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1603/1603859.png"
                  className="mw-100"
                  alt="sweet"
                  style={{ height: 200 }}
                />
              </Col>
              <Col>
                {" "}
                <h4>Validations -</h4>
                {errors &&
                  errors.map((i, index) => (
                    <p className="mb-2">
                      <span className="mb-0 h4 text-danger">*</span> &nbsp;{" "}
                      {i[1]}
                    </p>
                  ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}

      <Form>
        <Row className="px-2">
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">School Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="School Name*"
              name="school_name"
              value={payload.school_name}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">School Email</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder="Email*"
              name="email"
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Client Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Client Name*"
              name="client_name"
              value={payload.client_name}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Client Email</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder="Client Email*"
              name="client_email"
              value={payload.client_email}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Contact Number*</label>
            <input
              type="numeber"
              className="form-control"
              required
              name="contact_number"
              placeholder="Contact Number*"
              value={payload.contact_number}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Secondary Number*</label>
            <input
              type="number"
              className="form-control"
              required
              name="secondary_contact_number"
              placeholder="Secondary Contact Number*"
              value={payload.secondary_contact_number}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Order Delivery Date</label>
            <input
              type="date"
              className="form-control"
              required
              placeholder="Delivery Date*"
              name="delivery_date"
              min={minDate}
              onChange={onChange}
            />
          </Col>
          <Col md={6} xs={12} className="px-2 mb-3">
            <label className="text-white mb-2">Select Sweets</label>
            <CreatableSelect
              className="creatableSelect"
              defaultValue={selectedOption}
              required
              onChange={(option) => handelChange_ingredients(option)}
              options={sweetList}
              isClearable
              isMulti
            />
          </Col>
          {payload.selectedSweet.map((item, i) => {
            return (
              <React.Fragment key={item.value}>
                <Col md={6} xs={12} className="px-2 mb-3">
                  <label className="text-white mb-2">
                    Select quantity ( KG )
                  </label>
                  <InputGroup>
                    <Form.Control
                      type="numeber"
                      className="form-control"
                      required
                      name="quantity"
                      placeholder="Quantity*"
                      value={item.quantity}
                      maxlength="3"
                      onChange={(e) => {
                        e.target.value
                          ? parseFloat(e.target.value) >= 0 &&
                            onChangeSweet(i, { quantity: e.target.value })
                          : onChangeSweet(i, { quantity: e.target.value });
                      }}
                    />
                    {item.price && item.quantity && (
                      <>
                        <InputGroup.Text>
                          {parseFloat(item.price) * parseFloat(item.quantity)}
                        </InputGroup.Text>
                        <InputGroup.Text>₹</InputGroup.Text>
                      </>
                    )}
                  </InputGroup>
                  <p>
                    *please use point (.) to gram quality should greater than
                    500 g{" "}
                  </p>
                </Col>
                <Col md={6} xs={12} className="px-2 mb-3">
                  <label className="text-white mb-2">
                    Per Packet quantity (KG)
                  </label>
                  <input
                    type="numeber"
                    className="form-control"
                    required
                    name="pack_quantity"
                    placeholder="Packet Quantity*"
                    value={item.pack_quantity}
                    maxlength="3"
                    onChange={(e) =>
                      e.target.value
                        ? parseFloat(e.target.value) >= 0 &&
                          onChangeSweet(i, { pack_quantity: e.target.value })
                        : onChangeSweet(i, { pack_quantity: e.target.value })
                    }
                  />
                  <p>
                    *please use point (.) to gram quality should greater than
                    500 g{" "}
                  </p>
                </Col>
              </React.Fragment>
            );
          })}
          <Col md={12} className="text-end">
            <button type="button" onClick={() => submit()} className="themeBtn">
              Submit Now
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
