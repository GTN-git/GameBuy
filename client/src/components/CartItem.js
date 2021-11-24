import React from "react";
import { useDispatch } from "react-redux";
import { Segment, Grid } from "semantic-ui-react"
import { REMOVE_FROM_CART } from "../utils/actions";

const CartItem = ({ item }) => {
  const [dispatch] = [useDispatch()];

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
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
