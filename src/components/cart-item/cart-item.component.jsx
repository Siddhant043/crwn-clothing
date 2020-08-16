import React from "react";

import './cart-item.styles.scss'
const CarItem = ({ item: { imageUrl, price, name, quantity } }) => { // this is a cart item which we get from cartDropdown component
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CarItem;
