/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.js";
import AdminMenu from "../../components/layout/AdminMenu.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.js";
import moment from "moment";
import { Select } from "antd";
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

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
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
      console.log(error);
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
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mb-2">
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
                        <td>{o?.buyer?.name}</td>
                        <td className="text-capitalize">
                          {moment(o?.createdAt).fromNow()}
                        </td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            width="100px"
                            height={"80px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
