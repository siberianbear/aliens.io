import { combineReducers } from 'redux';
import alienreducer from './alienfarm.reducer';

const rootReducer = combineReducers({
    alienfarm: alienreducer,
});

export default rootReducer;