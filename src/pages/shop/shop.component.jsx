import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CategoryPage from "../category/category.component";

import "./shop.styles.scss";

export const ShopPage = ({ match }) => {
  // nestedRouting
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route
        exact
        path={`${match.path}/:categoryId`}
        component={CategoryPage}
      />
    </div>
  ); // this makes it more felxible and reuseable
};

export default ShopPage;
