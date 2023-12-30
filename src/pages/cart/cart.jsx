import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const [cartData, setCartData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3003/api/v1/cartItems/1');
            const cartResult = await response.json();
            console.log("Cart Data::: ", cartResult.data);
            setCartData(cartResult.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
    console.log('react code----', cartData);
}, []);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {
          cartData.map((product) => {
            return <CartItem data = {product}/>
          })
        }
      </div>

      {/* {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: {totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )} */}
    </div>
  );
};
