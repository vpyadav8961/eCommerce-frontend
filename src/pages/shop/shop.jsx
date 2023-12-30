// import React, {useState, useEffect} from "react";
import { async } from "q";
import React, { createElement, useState, useEffect, useReducer } from "react";

// import axios from "axios";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log('inside useeffect---', products);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3003/api/v1/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        console.log('react code----', products);
    }, []);

    const [user, setUser] = useState({ name: '', email: '' });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        //addUser(user);
        console.log('user----', user);
        const saveData = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify({
                title: "test product",
                price: 13.5,
                description: "lorem ipsum set",
                image: "https://i.pravatar.cc",
                category: "electronic",
            }),
        })
        const data = await saveData.json();
            // .then((res) => res.json())
            // .then((json) => console.log('json--------',json));

        setUser({ name: '', email: '' });
    };


    const addToCart = async (id) => {
      const payload = {
        "userId": 1, "productId": id, "quantity": 1
    }
      const saveData = await fetch("http://localhost:3003/api/v1/add-to-cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        const data = await saveData.json();
        console.log("Data:::::::lll ", data);
    }
    
    return (
      <>
        <div>
          <h1 className="shopTitle">Product List</h1>
          <div className="cardContainer">
            {products.map(product => (
              <div className="card" key={product.id}>
                <img src={product.product_url === null ? PRODUCTS[0].productImage : product.product_url} alt="Avatar" style={{ width: '100%' }} />
                <div className="container">
                  <h4>{product.product_name}</h4>
                  <p>{product.product_description}</p>
                  <button className="cartButton" onClick={() => addToCart(product.id)}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
    
}

// export default shop;