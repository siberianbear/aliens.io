
import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

// const store = createStore(rootReducer, composeWithDevTools());

// const store = createStore(rootReducer);

// for to view store in FF
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;