import React from "react";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { connect } from "react-redux";
import "./cart-dropdown.styles.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
const CartDropdown = ({ cartItems, history, dispatch }) => {
  // for using a single dispatchable function connect providess dispatch in the props
  // this is the cartItems array we get from aur state
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStatetoProps = createStructuredSelector({
  cartItems: selectCartItems, // using select will make sure the component is not getting rerendered
  //state.cart.cartItems // this is the cartItems array
});

export default withRouter(connect(mapStatetoProps)(CartDropdown));
