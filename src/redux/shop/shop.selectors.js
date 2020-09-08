import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
  // we use this object because our url param is string and id is number
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = ( // this function eventually takes the state and the param we provide
  collectionUrlParam // find collection.id matching the url param of our collection id map
) =>
  createSelector([selectShopCollections], (collections) => // we map over the collections array which is given by SelectShopCollection
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam] //eg. hats = 1, it finds the collection with id 1 and returns that
    )
  );
