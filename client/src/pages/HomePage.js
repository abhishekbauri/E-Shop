import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoadiing] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.status === "success") {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get products
  const getAllProducts = async () => {
    try {
      setLoadiing(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoadiing(false);
      setProducts(data.products);
    } catch (error) {
      setLoadiing(false);
      console.log(error);
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
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // getTotal count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoadiing(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoadiing(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoadiing(false);
    }
  };

  useEffect(() => {
    if (page > 1) loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="container-fluid mt-3 p3">
        <div className="row">
          <div className="col-md-2 mb-3 shadow border-end">
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
          <div className="col-md-10">
            <h1 className="text-center text-uppercase">All Products</h1>
            <div className="d-flex justify-content-around flex-wrap">
              {products?.map((p) => (
                <div
                  className="card mt-3"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className=" d-flex justify-content-between align-items-center pt-2 pb-2">
                      <h5 className="card-title text-capitalize">{p.name}</h5>
                      <p className="card-text fw-bold fs-5">$ {p.price}</p>
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
