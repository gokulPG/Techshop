import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { listProductDetails, updateProduct } from "../actions/productActions";
import * as types from "../constants/productConstants";

const ProductEditScreen = ({ match, history, color }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: types.PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        image,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link
        className="btn btn-light btn-outline-dark btn-sm my-3"
        to="/admin/productlist"
      >
        <i style={{ color }} class="fas fa-angle-double-left"></i>
        <span className="ml-2 fa-8">Go Back</span>
      </Link>
      <h2 className="text-center">Edit Product</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading && <Loader /> ? (
        error && <Message variant="danger">{error}</Message>
      ) : (
        <form action="#" onSubmit={submitHandler}>
          <div
            className="profile-input d-flex flex-column"
            style={{ margin: "0px 25%" }}
          >
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              name="image"
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              name="brand"
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <input
              name="countInStock"
              type="number"
              placeholder="Enter count In stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />

            <input
              name="category"
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              name="description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className="mt-3 update-profile-btn">
              Update
            </button>
          </div>
        </form>
      )}
    </>
  );
};

ProductEditScreen.defaultProps = {
  color: "#198ada",
};

export default ProductEditScreen;
