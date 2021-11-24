import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, Grid } from "semantic-ui-react"
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const CartItem = ({ item }) => {
  const [state, dispatch] = [useSelector(state => state), useDispatch()];

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;

    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });

      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });

      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <Segment>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <div>
              <img src={`https:${item.cover}`} alt="" />
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              {item.name}, ${item.price}
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <span
                role="img"
                aria-label="trash"
                onClick={() => removeFromCart(item)}
              >
                🗑️
              </span>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default CartItem;
