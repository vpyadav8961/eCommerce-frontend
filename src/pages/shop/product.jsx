import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
  const [responseData, setResponseData] = useState(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/add-to-cart', {
        method: 'POST', // or 'GET' depending on your API endpoint
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userId": 1, "productId":2, "quantity": 2, "cartId": 2
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Data:::: ",data);
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="product">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> {price}</p>
      </div>
      <button className="addToCartBttn" onClick={handleButtonClick}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
