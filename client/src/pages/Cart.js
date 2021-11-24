import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Auth from "../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import {  ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from '@apollo/client';

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// function that handles cart logic and returns cart componet
const Cart = () => {
  // gets current state and queries for necessary data
  const [state, dispatch] = [useSelector(state => state), useDispatch()];
  console.log(state);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // sets up stripe and gets session data
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);  

  // adds items to cart
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  // generates a total for items in the cart
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // submits items to stripe for checkout
  function submitCheckout(){
    const productIds = [];

    state.cart.forEach((item) =>{
      for (let i = 0; i < item.purchaseQuantity; i++){
        productIds.push(item._id);
      }
    });
    getCheckout({
      variables: { products: productIds }
    });
  }

  // cart componet to be displayed
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;