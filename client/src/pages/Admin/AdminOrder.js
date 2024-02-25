/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.js";
import AdminMenu from "../../components/layout/AdminMenu.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.js";
import moment from "moment";
import { Select } from "antd";
import Loader from "../../components/loader/Loader.js";
const { Option } = Select;

const AdminOrder = () => {
  const [auth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/auth/all-orders`,
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        },
      );
      getOrders();
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Layout title={"All orders data"}>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-3 mb-4">
            <AdminMenu />
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
                    <div className="border w-100 shadow mb-2">
                      <table className="table">
                        <thead>
                          <tr className="text-center">
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-center">
                            <td>{i + 1}</td>
                            <td>
                              <Select
                                bordered={false}
                                size="large"
                                onChange={(value) => handleChange(o._id, value)}
                                defaultValue={o?.status}
                              >
                                {status.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td className="fw-bold">{o?.buyer?.name}</td>
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
                                height={"80px"}
                              />
                            </div>
                            <div className="col-md-8">
                              <p>{p.name}</p>
                              <p className="fw-bold">Price : {p.price}</p>
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

export default AdminOrder;
