import React from "react";

const CartItem = ({item}) => {
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