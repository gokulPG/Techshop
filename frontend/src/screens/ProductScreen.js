import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import Rating from "../components/Rating";
import LazyImage from "../common/LazyImage";

const ProductScreen = ({ match, color }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [match]);

  return (
    <div className="product-details-wrapper">
      <Link className="btn btn-light btn-outline-dark btn-sm my-3" to="/">
        <i style={{ color }} class="fas fa-angle-double-left"></i>
        <span className="ml-2 fa-8">Go Back</span>
      </Link>
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
          </ListGroup>
          <Button className="btn btn-light btn-outline-dark btn-md w-100 mt-4">
            <i style={{ color }} class="fas fa-shopping-cart"></i>
            <span className="ml-2">Add To Cart</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

ProductScreen.defaultProps = {
  color: "#198ada",
};

export default ProductScreen;
