import React, { Suspense, lazy } from "react";
import { Row, Col } from "react-bootstrap";
import products from "../../src/products";
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
      <h2 className="Blue-underline">Latest Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
