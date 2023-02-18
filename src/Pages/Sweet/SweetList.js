import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  deleteSweet,
  fetchSweetList,
  updateSweet
} from "../../firestoreService";
import { sweetRow } from "../../Constant";
import { BsTrash, BsPencil } from "../../Icon";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../Comoponents/ConfirmModal";

export function SweetList() {
  const navigate = useNavigate();
  const [deletedTrue, setDeletedTrue] = useState(true);
  const [errors, setErrors] = useState([]);
  const [datalist, setDatalist] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState({});
  useEffect(() => {
    fetchSweetList().then((res) => setDatalist(res));
  }, [deletedTrue]);

  const handleDelete = () => {
    deleteSweet(showConfirm).then((res) => {
      setDeletedTrue(!deletedTrue);
      toast.success("deleted successfully");
      setShowConfirm(false);
    });
  };

  const handleUpdate = () => {
    console.log("ASdas", showEditModal);
    updateSweet(showEditModal.id, showEditModal).then((res) => {
      setDeletedTrue(!deletedTrue);
      toast.success("update successfully");
      setShowEditModal(false);
    });
  };

  const editTableData = (data, title) => {
    setShowEditModal({ ...data, title });
  };

  return (
    <Container className="innerPage">
      <div className="sctionHeading text-white">
        <div className="d-flex justify-content-between">
          <h2>Sweet List</h2>
          <Button
            variant="success"
            onClick={() => navigate("/add_sweet")}
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
          {datalist.map((item, key) => {
            return (
              <tr key={item.id}>
                <td>{key + 1}</td>
                <td>
                  <img
                    src={item.img ? item.img : item.image}
                    alt="sweet"
                    width="50px"
                    height="50px"
                  />
                </td>
                <td onDoubleClick={() => editTableData(item, "sweet")}>
                  {item.sweet ? item.sweet : item.label}
                </td>
                <td onDoubleClick={() => editTableData(item, "price")}>
                  {item.price} ₹
                </td>
                <td onDoubleClick={() => editTableData(item, "stock")}>
                  {item.stock ? item.stock + " KG" : 1}
                </td>
                <td onDoubleClick={() => editTableData(item, "offer_title")}>
                  {item.offer_title ? item.offer_title : "-"}
                </td>
                <td onDoubleClick={() => editTableData(item, "offer")}>
                  {item?.offer ? item?.offer + " %" : "-"}
                </td>
                <td
                  onDoubleClick={() => editTableData(item, "offer_expiration")}
                >
                  {item?.offer_expiration ? item?.offer_expiration : "-"}
                </td>
                <td>
                  <BsPencil
                    onClick={() => navigate("/edit_sweet", { state: item })}
                    className="mx-2"
                    color="yellow"
                  />
                  <BsTrash
                    onClick={() => setShowConfirm(item.id)}
                    className="mx-2"
                    color="red"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ConfirmModal
        isShow={showConfirm}
        handleClose={() => setShowConfirm(false)}
        handleSubmit={() => handleDelete()}
      />

      <ConfirmModal
        title={showEditModal.title + " Edit confirmation"}
        isShow={Boolean(showEditModal.id)}
        handleClose={() => setShowEditModal(false)}
        handleSubmit={() => handleUpdate()}
        children={
          <>
            <Form.Control
              type={
                isNaN(showEditModal[showEditModal.title]) === true
                  ? "text"
                  : "number"
              }
              value={showEditModal[showEditModal.title]}
              onChange={(e) =>
                setShowEditModal((state) => ({
                  ...state,
                  [showEditModal.title]: e.target.value
                }))
              }
            />
          </>
        }
      />
    </Container>
  );
}
