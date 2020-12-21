import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";
import LazyImage from "../common/LazyImage";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const ProductScreen = ({ history, match, color }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <div className="product-details-wrapper">
      <Link className="btn btn-light btn-outline-dark btn-sm my-3" to="/">
        <i style={{ color }} class="fas fa-angle-double-left"></i>
        <span className="ml-2 fa-8">Go Back</span>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={7}>
            <LazyImage
              src={product.image}
              alt={product.name}
              customHeight="35vw"
            />
          </Col>
          <Col md={5}>
            <ListGroup className="text-center" variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  isCentered={true}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 style={{ color }}>Price</h5>{" "}
                <span className="font-weight-bold">${product.price}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 style={{ color }}>Product Details</h5>
                {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 style={{ color }}>Status</h5>
                <span className="font-weight-bold">
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <div className="mt-3">
                  <h5 style={{ color }}>Quantity</h5>
                  <Row>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        custom={true}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </div>
              )}
            </ListGroup>
            <Button
              className="btn btn-light btn-outline-dark btn-md w-100 mt-4"
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              <i style={{ color }} class="fas fa-shopping-cart"></i>
              <span className="ml-2">Add To Cart</span>
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

ProductScreen.defaultProps = {
  color: "#198ada",
};

export default ProductScreen;
