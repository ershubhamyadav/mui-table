import React, { useState } from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import { addContactQuery } from "../firestoreService";

export default function ContactUs() {
  const [formValue, setFormValue] = useState({});
  const submit = async () => {
    try {
      const res = await addContactQuery(formValue);
      console.log("Res", res);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container className="innerPage">
      <div className="sctionHeading text-white">
        <h2>Contact Us</h2>
      </div>
      <Form>
        <Row className="px-2 justify-content-start">
          <Col md={5} lg={4} className="px-2  mb-3">
            <label className="text-white mb-2">First Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name*"
              value={formValue?.firstName}
              onChange={(e) =>
                setFormValue((s) => ({ ...s, firstName: e.target.value }))
              }
            />
          </Col>
          <Col md={5} lg={4} className="px-2  mb-3">
            <label className="text-white mb-2">Last Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name*"
              value={formValue?.lastName}
              onChange={(e) =>
                setFormValue((s) => ({ ...s, lastName: e.target.value }))
              }
            />
          </Col>
          <Col md={5} lg={4} className="px-2  mb-3">
            <label className="text-white mb-2">Email *</label>
            <input
              type="email"
              className="form-control"
              placeholder="Last Name*"
              value={formValue?.email}
              onChange={(e) =>
                setFormValue((s) => ({ ...s, email: e.target.value }))
              }
            />
          </Col>
          <Col md={10} lg={8} className="px-2  mb-3">
            <label className="text-white mb-2">Phone Number *</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number *"
              value={formValue?.number}
              onChange={(e) =>
                setFormValue((s) => ({ ...s, number: e.target.value }))
              }
            />
          </Col>
          <Col md={10} lg={8} className="px-2 mb-3">
            <label className="text-white mb-2">Message</label>
            <textarea
              className="form-control"
              placeholder="Message"
              rows={6}
              value={formValue?.Message}
              onChange={(e) =>
                setFormValue((s) => ({ ...s, Message: e.target.value }))
              }
            ></textarea>
          </Col>
          <Col md={12} className="text-start">
            <button className="themeBtn" type="button" onClick={() => submit()}>
              Submit Now
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
