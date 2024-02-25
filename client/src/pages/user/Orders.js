import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/auth/orders`,
        {
          headers: {
            Authorization: auth?.token,
          },
        },
      );
      setOrders(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 mt-3 dashboard">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center text-capitalize text-bg-dark text-light pt-2 pb-2">
              all orders
            </h1>
            {loading ? (
              <Loader />
            ) : (
              <>
                {orders?.map((o, i) => {
                  return (
                    <div className="border shadow">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col"> Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td className="text-capitalize">
                              {moment(o?.createdAt).fromNow()}
                            </td>
                            <td className="fw-bold">
                              {o?.payment.success ? "Success" : "Failed"}
                            </td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="container">
                        {o?.products?.map((p, i) => (
                          <div
                            className="row mb-2 p-3 card flex-row"
                            key={p._id}
                          >
                            <div className="col-md-4">
                              <img
                                src={`${process.env.REACT_APP_BASEURL}/api/v1/product/product-photo/${p._id}`}
                                alt={p.name}
                                width="100px"
                                height={"100px"}
                              />
                            </div>
                            <div className="col-md-8">
                              <p className="text-capitalize">{p.name}</p>
                              <p className="fw-bold">Price : ₹ {p.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
