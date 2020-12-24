import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import LazyImage from "../common/LazyImage";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history, color }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandle = () => {
    history.push("/auth?redirect=shipping");
  };

  return (
    <>
      <h4 className="border border-dark p-3 d-inline-block gradient-blue-background">
        My Bag
      </h4>
      <Row className="mt-3">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="dark">
              <Link
                className="btn btn-light btn-outline-dark btn-sm my-1 mr-3"
                to="/"
              >
                <i style={{ color }} class="fas fa-angle-double-left"></i>
                <span className="ml-2 fa-8">Go Back</span>
              </Link>
              Your cart is empty{" "}
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="pl-0">
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col md={2} className="pl-0">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        customHeight="5vw"
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        custom={true}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5 className="m-0">Order Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item className="">
                <Row className="mt-3 mb-0 d-flex justify-content-center align-items-center">
                  <Col md={8}>
                    <p className="m-0">Bag Total Items</p>
                  </Col>
                  <Col md={4}>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Col>
                </Row>
                <Row className="mt-3 mb-0 d-flex justify-content-center align-items-center">
                  <Col md={8}>
                    <p className="m-0">Delivery</p>
                  </Col>
                  <Col md={4} style={{ color: "#0f629d", fontWeight: "bold" }}>
                    FREE
                  </Col>
                </Row>
                <Row className="mt-3 mb-0 d-flex justify-content-center align-items-center">
                  <Col md={8}>
                    <p className="m-0">Order Total</p>
                  </Col>
                  <Col md={4}>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block gradient-blue-background"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandle}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

CartScreen.defaultProps = {
  color: "#198ada",
};

export default CartScreen;
