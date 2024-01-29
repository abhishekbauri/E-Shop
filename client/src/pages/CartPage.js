import React from "react";
import Layout from "../components/layout/Layout.js";
import { useCart } from "../context/cart.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1 text-capitalize">
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
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    width="150px"
                    height={`150px`}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: $ {p.price}</p>
                  <button
                    className="btn btn-danger"
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
            <h4>Total: ${totalPrice()} </h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
