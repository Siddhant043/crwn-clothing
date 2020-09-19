import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { firestore, converCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions'; 

import "./shop.styles.scss";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() { // getting shop (all 5 collections) data from firestore
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = converCollectionSnapshotToMap(snapshot);
      updateCollections(collectionsMap); // passing collections to our component
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

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
