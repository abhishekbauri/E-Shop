import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader.js";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/similar-product/${pid}/${cid}`,
      );
      setRelatedProducts(data?.products);
      setLoader(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // get products
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/get-product/${params.slug}`,
      );
      setProduct(data?.products);
      getSimilarProduct(data?.products._id, data?.products?.category._id);
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="row container-fluid mt-3">
          <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
            <img
              src={`${process.env.REACT_APP_BASEURL}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              height="300"
              width={"300px"}
            />
          </div>
          <div className="col-md-6 ">
            <h1 className="text-center text-capitalize fst-italic">
              product details
            </h1>
            <h4 className="text-capitalize fw-light">
              Name: <span className=" fw-bold"> {product.name} </span>
            </h4>
            <h4 className=" fw-light">Description: {product.description}</h4>
            <h4 className="fw-light">
              Price: <span className=" fw-bold"> ₹ {product.price} </span>
            </h4>
            <h4 className="text-capitalize fw-light">
              Category:
              <span className=" fw-bold"> {product.category?.name} </span>
            </h4>
            <h4 className="fw-light">
              Quantity Available:
              <span className=" fw-bold"> {product.quantity} </span>
            </h4>
            <button
              className="btn btn-outline-primary text-uppercase mt-3"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product]),
                );
                toast.success("Items added to cart");
              }}
            >
              add to cart
            </button>
          </div>
        </div>
      )}

      <hr />
      <div className="row container-fluid">
        <h5 className="text-center text-uppercase fs-2 fst-italic">
          Similar Products
        </h5>

        {loader ? (
          <Loader />
        ) : (
          <>
            {relatedProducts.length < 1 && (
              <p className="text-center text-uppercase">
                No similar products found
              </p>
            )}
            <div className="d-flex justify-content-around pb-4 flex-wrap">
              {relatedProducts?.map((p) => (
                <div
                  className="card mt-3"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`${process.env.REACT_APP_BASEURL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center pt-2 pb-2">
                      <h5 className="card-title text-capitalize fw-light m-0">
                        {p.name}
                      </h5>
                      <p className="card-text fw-bold fs-6 m-0">₹ {p.price}</p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2 pb-2">
                      <button
                        className="btn btn-outline-info text-capitalize"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-outline-primary text-uppercase "
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p]),
                          );
                          toast.success("Items added to cart");
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
