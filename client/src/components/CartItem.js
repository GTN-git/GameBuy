import React from "react";

// function that takes items and returns componet
const CartItem = ({item}) => {

    // returns cart items componet
    return (
        <>
            <h2>Cart Items!</h2>
            <h4>{item.name}</h4>
            <img src={item.image} alt="" />
            <p>{item.price}</p>
            <p>{item.purchaseQuantity}</p>
        </>
    )
}

export default CartItem