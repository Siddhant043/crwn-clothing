import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'; // allows the browser to cache our store 
import { fetchCollectionsStart } from './shop/shop.sagas'; 
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

//const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development'){ // NODE_ENV contains all the running build type
    middlewares.push(logger);
}



export const  store = createStore(rootReducer, applyMiddleware(...middlewares));

//sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);

export default { store, persistor };