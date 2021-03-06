import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import LazyImage from "../common/LazyImage";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded card-box">
      <Link to={`/product/${product._id}`}>
        <LazyImage src={product.image} alt={product.name} customHeight="13vw" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <hr></hr>
        <Card.Text as="h3" className="mt-3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
