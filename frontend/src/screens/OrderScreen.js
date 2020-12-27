import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import LazyImage from "../common/LazyImage";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import * as types from "../constants/orderConstants";
import "../css/shipping.css";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  //Calculate prices
  if (!loading && order !== undefined) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: types.ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h2
        style={{
          color: "gray",
          borderBottom: "2px solid",
          width: "fit-content",
        }}
      >{`ORDER ${order._id}`}</h2>
      <Row className="mt-4">
        <Col md={8} style={{ border: "1px solid lightgray" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>

              <p className="mt-4">
                <strong className="order-sub-title">
                  Name <i className="fas fa-angle-double-right"></i>
                </strong>{" "}
                {order.user.name}
              </p>
              <p>
                <strong className="order-sub-title">
                  Email <i className="fas fa-angle-double-right"></i>
                </strong>
                <a href={`mailTo: ${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className="mt-3">
                <strong className="order-sub-title">
                  Address <i className="fas fa-angle-double-right"></i>
                </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p className="mt-4">
                <strong className="order-sub-title">
                  Method <i className="fas fa-angle-double-right"></i>
                </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="d-flex justify-content-center align-items-center">
                        <Col md={2}>
                          <LazyImage
                            src={item.image}
                            alt={item.name}
                            customHeight="5vw"
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className="m-0 p-0">
                          {item.qty} x ${item.price}{" "}
                          <i className="fas fa-angle-double-right"></i>{" "}
                          <span className="order-sub-title">
                            ${addDecimals(item.qty * item.price)}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} className="mt-3">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice * 74}
                    currency="INR"
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
