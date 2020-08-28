import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import "./cart-icon.styles.scss";

const CartIcon = ({toggleCartHidden, itemCount}) => {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = ({cart: {cartItems}}) => ({
  itemCount: cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0) // this is a selector
}); //but like this the mapStateToProps will we called whenever the state change for anything (eg. user login) and rerender the component so we need to cache the value only only pass it to the component when the particular value changes.

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()), //here we create a new togglecartfunction which dispatches the functionality of toggleCartfunction
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
