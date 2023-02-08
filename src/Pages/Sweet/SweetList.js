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
import {
  deleteCart,
  deleteClient,
  fetchCartList,
  fetchClient
} from "../../firestoreService";
import { sweetRow } from "../../Constant";
import { BsTrash } from "../../Icon";
export function SweetList() {
  let _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState);
  const [deletedTrue, setDeletedTrue] = useState(true);
  const [errors, setErrors] = useState([]);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    fetchCartList().then((res) => setCartList(res));
  }, [deletedTrue]);

  const handleDelete = (id) => {
    deleteCart(id).then((res) => setDeletedTrue(!deletedTrue));
  };

  const handleActiveDelete = (item, ind) => {
    let list = [...cartList];
    list.splice(ind, 1, { ...item, toggleDelete: !item?.toggleDelete });
    setCartList(list);
  };

  return (
    <Container className="innerPage">
      <div className="sctionHeading text-white">
        <div className="d-flex justify-content-between">
          <h2>Sweet List</h2>
          <Button
            variant="success"
            //   onClick={() => handleDelete(item.id)}
            className="mx-2"
          >
            Add New
          </Button>
        </div>
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
            {sweetRow.map((row) => (
              <th>{row}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartList.map((item, key) => {
            console.log({ item });
            return (
              <tr key={item.id}>
                <td>{key + 1}</td>
                <td>
                  <img src={item.img} alt="sweet" width="50px" height="50px" />
                </td>
                <td>{item.label}</td>
                <td>₹{item.offer}</td>
                <td>{item.quantity ? item.quantity : 1}</td>
                <td>{1 + "%"}</td>
                <td>{item.quantity ? item.quantity : 1}</td>
                <td>
                  ₹
                  {parseFloat(item.offer) * (item.quantity ? item.quantity : 1)}
                </td>
                <td>
                  <BsTrash
                    onClick={() => handleDelete(item.id)}
                    className="mx-2"
                    color="red"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
