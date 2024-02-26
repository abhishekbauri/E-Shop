import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const getProductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/product-category/${params.slug}`,
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "An error occurred!");
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-center text-capitalize mt-2 fst-italic">
              {category?.name}
            </h1>

            <div className="row">
              <div className="d-flex justify-content-around flex-wrap pb-3">
                {products?.map((p) => (
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
                        <h5 className="card-title text-capitalize">{p.name}</h5>
                        <p className="card-text fw-bold fs-5">₹ {p.price}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pt-2 pb-2">
                        <button
                          className="btn btn-outline-info text-capitalize"
                          onClick={() => navigate(`/product/${p?.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-outline-primary text-uppercase"
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
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
