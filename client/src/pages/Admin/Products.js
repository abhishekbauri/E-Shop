import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/get-product`,
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center text-capitalize text-bg-dark text-light pt-2 pb-2">
              all product list
            </h1>
            <div className="d-flex justify-content-around gap-1 flex-wrap">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {products?.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-link"
                    >
                      <div className="card mt-3" style={{ width: "18rem" }}>
                        <img
                          src={`${process.env.REACT_APP_BASEURL}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title text-capitalize">
                            {p.name}
                          </h5>
                          <p className="card-text">
                            {p.description.substring(0, 50)}...
                          </p>
                          <p className="card-text fw-bold fs-4">₹ {p.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
