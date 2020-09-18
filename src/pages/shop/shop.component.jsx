import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { firestore, converCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import "./shop.styles.scss";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() { // getting shop (all 5 collections) data from firestore
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      converCollectionSnapshotToMap(snapshot);
    })
  }
  

  render() {
    const { match } = this.props;
    // nestedRouting
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    ); // this makes it more felxible and reuseable
  }
}

export default ShopPage;
