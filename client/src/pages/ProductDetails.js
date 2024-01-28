import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.js";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`,
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  return (
    <Layout>
      <div className="row container-fluid mt-3">
        <div className="col-md-6 text-center">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            height="300"
            width={"300px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h4>Name: {product.name}</h4>
          <h4>Description: {product.description}</h4>
          <h4>Price: $ {product.price}</h4>
          <h4>Category: {product.category?.name}</h4>
          <h4>Quantity Available: {product.quantity}</h4>
          <button className="btn btn-secondary mt-2">ADD TO CART</button>
        </div>
      </div>
      <div className="row container-fluid"> Similar products</div>
    </Layout>
  );
};

export default ProductDetails;
