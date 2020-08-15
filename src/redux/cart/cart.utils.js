export const addItemToCart = (cartItems, cartItemToAdd) => {
  //here we are checking that if the item which we are going to add in our cart already exists, if yes then we will get that item
  const existingCartItem = cartItems.find(
    // it will return the 1st item found based on the conditions given
    (cartItem) => cartItem.id === cartItemToAdd.id //if it matches it will set the cartItem to the existingCartItem
  ); // if it doesn't finds anything after looping then it will set undefined

  // if the cartItem exists then we will return an array with added quantity
  if (existingCartItem) {
    //then we will check if existingCartItem exists
    return cartItems.map((
      cartItem // this will return a new array
    ) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //if the item if being 1st time added to the cart the we return this
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};