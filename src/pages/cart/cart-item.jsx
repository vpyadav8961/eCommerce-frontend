import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, product_name, quantity, price, product_url, product_description } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

    // const removeFromCart = async (id) => {
    //   const saveData = await fetch("http://localhost:3003/api/v1/cartItems/"+id, {
    //         method: "DELETE",
    //     })
    //     const data = await saveData.json();
    // }

    // let updateCartItemCount = quantity++;
    // let removeFromCart = quantity--;

    // const addToCart = async (quantity, id) => {
    //   const payload = {
    //     "userId": 1, "productId": id, "quantity": quantity
    //   }
    //   const updateCart = await fetch("http://localhost:3003/api/v1/add-to-cart", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   })
    // }
  
  return (
    <div className="cartItem">
      <img src={product_url} />
      <div className="description">
        <p>
          <b>{product_name}</b>
        </p>
        <p> Price: {price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={quantity}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
