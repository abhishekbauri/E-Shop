import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.js";
import { useCart } from "../context/cart.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total;
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // delete items
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/braintree/token`,
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      toast.error(
        error.response?.data?.msg || error.message || "Server Error!",
      );
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.user]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        },
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1 text-capitalize fst-italic">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart! ${
                    auth?.token ? "" : "Please login to checkout"
                  } `
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>

        <div className="row p-4">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row p-3" key={p._id}>
                <div className="col-md-4 ">
                  <img
                    src={`${process.env.REACT_APP_BASEURL}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    width="150px"
                    height={`150px`}
                  />
                </div>
                <div className="col-md-8">
                  <p className="text-capitalize">{p.name}</p>
                  <p className="fw-bold">Price: ₹ {p.price}</p>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4> Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: ₹ {totalPrice()} </h4>
            <hr />
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4 className="text-capitalize">current address</h4>
                  <h5 className="text-capitalize">{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning text-uppercase"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    update address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning text-uppercase"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    update address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning text-uppercase"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
