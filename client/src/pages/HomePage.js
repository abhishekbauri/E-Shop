/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/category/categories`,
      );
      if (data?.status === "success") {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error(error.message || "Can not fetch category!");
    }
  };

  // get products
  const getAllProducts = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/product-list/${page}`,
      );
      setLoader(false);
      setProducts(data.products);
    } catch (error) {
      setLoader(false);
      toast.error("Error occured while loading product list!");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filter products
  const filterProduct = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        },
      );
      setLoader(false);
      setProducts(data.products);
    } catch (error) {
      setLoader(false);
      toast.error(error.message || "Something went wrong");
    }
  };

  // getTotal count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/product-count`,
      );
      setTotal(data?.total);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/product-list/${page}`,
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Error in loading product list.");
    }
  };

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="container-fluid mt-3 p3">
        <div className="row">
          <div className="col-md-3 col-lg-2 mb-3 mt-0 mt-md-4 shadow border-end h-100">
            {categories.length > 0 && (
              <>
                <h4 className="text-center mt-2 text-uppercase fs-5">
                  Filter By Category
                </h4>
                <div className="d-flex flex-column">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="text-uppercase"
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </>
            )}

            <h4 className="text-center mt-4 text-uppercase fs-5">
              Filter By Price
            </h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array} className="text-uppercase">
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="d-flex flex-column mt-3 mb-3">
              <button
                className="btn btn-danger text-uppercase"
                onClick={() => window.location.reload()}
              >
                reset filters
              </button>
            </div>
          </div>
          <div className="col-md-9 col-lg-10">
            <h1 className="text-center text-uppercase fst-italic">
              All Products
            </h1>
            {loader ? (
              <Loader />
            ) : (
              <div className="d-flex justify-content-around flex-wrap">
                {products?.map((p) => (
                  <div
                    className="card mt-3 "
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASEURL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className=" d-flex justify-content-between align-items-center pt-2 pb-2">
                        <h5 className="card-title text-capitalize m-0 fw-light">
                          {p.name}
                        </h5>
                        <p className="card-text fw-bold fs-6 m-0">
                          ₹ {p.price}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pt-2 pb-2">
                        <button
                          className="btn btn-outline-info text-capitalize"
                          onClick={() => navigate(`/product/${p?.slug}`)}
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
            )}

            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
