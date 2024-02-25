import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const navigate = useNavigate();
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center mt-2">
          <h1 className=" fst-italic text-capitalize">Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex justify-content-around flex-wrap pt-4 pb-4">
            {values?.results.map((p) => (
              <div className="card mt-3" style={{ width: "18rem" }} key={p._id}>
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
      </div>
    </Layout>
  );
};

export default SearchProduct;
