import { createSelector } from "reselect";
// two types of selectors - 1) input selectors(does not use createSelectors)
//                          2)outputSelectors(does use input selectors and output selectors)
// input selector
const selectCart = (state) => state.cart; //takes the whole state and returns a slice of it.

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);
