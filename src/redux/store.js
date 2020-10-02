import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'; // allows the browser to cache our store 
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development'){ // NODE_ENV contains all the running build type
    middlewares.push(logger);
}

export const  store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };