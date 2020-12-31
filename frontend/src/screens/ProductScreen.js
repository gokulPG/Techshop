import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Rating from "../components/Rating";
import LazyImage from "../common/LazyImage";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import Meta from "../components/meta.js";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match, color }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;


  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  useEffect(() => {
    window.scrollTo(0, 20)
  }, [])
  

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
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
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={7}>
              <LazyImage
                src={product.image}
                alt={product.name}
                customHeight="36.6vw"
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
          <Row className="mt-4">
            <Col md={8}>
              <h2 className='Blue-underline'>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className='pl-0'>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    {/* <p>{review.createdAt && review.createdAt.substring(0, 10)}</p> */}
                    <p className='my-1'>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className='pl-0'>
                  <h4>Write a customer review</h4>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler} className='mt-4'>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/auth">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

ProductScreen.defaultProps = {
  color: "#198ada",
};

export default ProductScreen;
