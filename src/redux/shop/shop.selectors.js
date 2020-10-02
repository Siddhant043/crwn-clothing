import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//   // we use this object because our url param is string and id is number
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) => collections ? Object.keys(collections).map((key) => collections[key]) : [] //Object.key(object) returns the array of the keys then we map over that array and match them in the object to get a particular item
);

export const selectCollection = (
  // this function eventually takes the state and the param we provide
  collectionUrlParam // find collection.id matching the url param of our collection id map
) =>
  createSelector(
    [selectShopCollections],
    (
      collections // we map over the collections array which is given by SelectShopCollection
    ) => (collections ? collections[collectionUrlParam] : null) // this is the santax if you want to pick a particular object from an object of objects (data normalization)
    // collections.find(
    //   (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]) //eg. hats = 1, it finds the collection with id 1 and returns that
  );


export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)