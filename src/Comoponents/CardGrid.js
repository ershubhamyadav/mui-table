import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { addCart } from "../firestoreService/";
import { appLogID } from "../stringConstant";

function CardGrid({ sweetList }) {
  const navigate = useNavigate();
  const addToCart = (item) => {
    addCart({
      ...item,
      item_id: item.label + item.id,
      appLogID: localStorage.getItem(appLogID)
    });
    navigate("/cart_list");
  };
  return (
    <Row xs={2} md={4} className="g-4">
      {sweetList
        .filter((i) => i?.price)
        .map((item) => (
          <Col className={item.id}>
            <Card style={{ backgroundColor: "#ff9b00" }}>
              <Card.Title className="text-white p-2 py-3 m-0">
                {item.label}
              </Card.Title>
              <Card.Img variant="top" src={item.img} height={"200px"} />
              <Card.Body className="p-0">
                <hr className="mt-0" />
                <div className="text-white px-2 m-0">
                  {item.offer_title && (
                    <p className="multiLine_ellipsis ">{item.offer_title}</p>
                  )}
                  {item.offer ? (
                    <p className="multiLine_ellipsis m-0">
                      <b>₹{item.offer}</b>
                      <br />
                      M.r.p. <del>₹{item.price}</del>
                    </p>
                  ) : (
                    <p className="multiLine_ellipsis ">
                      {item.price && <b>M.R.P. ₹{item.price}</b>}
                    </p>
                  )}
                  <p className="multiLine_ellipsis ">{item.description}</p>
                </div>
              </Card.Body>
              <div className="d-flex">
                <Button
                  style={{
                    width: "100%",
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: 0
                  }}
                  variant="outline-primary"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
                <Button
                  style={{
                    width: "100%",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 0
                  }}
                  variant="outline-primary"
                  disabled
                >
                  Buy Now{" "}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
    </Row>
  );
}

export default CardGrid;
