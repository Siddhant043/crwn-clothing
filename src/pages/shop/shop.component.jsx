import React from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

import "./shop.styles.scss";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWihtSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionFetching } = this.props;
    // nestedRouting
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWihtSpinner isLoading={isCollectionFetching} {...props} />}
        />
      </div>
    ); // this makes it more felxible and reuseable
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
