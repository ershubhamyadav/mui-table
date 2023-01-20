import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  Form
} from "react-bootstrap";
import { deleteClient, fetchClient } from "../firestoreService";

let newArr = [];
export default function ClientList() {
  let _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [deletedTrue, setDeletedTrue] = useState(true);
  const [errors, setErrors] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  useEffect(() => {
    fetchClient().then((res) => setQuoteList(res));
  }, [deletedTrue]);

  const handleDelete = (id) => {
    deleteClient(id).then((res) => setDeletedTrue(!deletedTrue));
  };

  const handleActiveDelete = (item, ind) => {
    let list = [...quoteList];
    list.splice(ind, 1, { ...item, toggleDelete: !item?.toggleDelete });
    setQuoteList(list);
  };

  return (
    <Container className="innerPage">
      <div className="sctionHeading text-white">
        <h2>Client Quote List</h2>

        <ToastContainer />
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

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>School Name</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Contact Number</th>
            <th>School Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quoteList.map((item, key) => {
            console.log({ item });
            return (
              <tr key={item.id}>
                <td>{key + 1}</td>
                <td>{item.school_name}</td>
                <td>{item.client_name}</td>
                <td>{item.client_email}</td>
                <td>{item.contact_number}</td>
                <td>{item.secondary_contact_number}</td>
                <td>
                  <Form.Check
                    inline
                    name="group1"
                    type="checkbox"
                    onClick={() => handleActiveDelete(item, key)}
                  />
                  <Button
                    disabled={!item?.toggleDelete}
                    variant="outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
