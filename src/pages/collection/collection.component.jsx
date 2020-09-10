import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';
import './collection.styles.scss';

const CollectionPage = ({ collection }) => { // collection is our main item returned from the selecto eg. hats jackets
    const {title, items} = collection;
    return (
        <div className='collection-page '>
            <h2 className='title'>{title}</h2>
            <div className='items'>
             {
                 items.map(item => (
                     <CollectionItem key={item.id} item={item} />
                 ))
             }
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({ // ownProps contain all the props which were given to the collection page component
    collection: selectCollection(ownProps.match.params.collectionId)(state),
    // this is nessary because unlike other selectors, this one needs a part of the state depending on the URL parameter.
})

export default connect(mapStateToProps)(CollectionPage);
