import { combineReducers } from 'redux';
import tableReducer from './tableReducer';

export const reducers = {
    tableReducer
};

const rootReducer = combineReducers({
    ...reducers
})

export default rootReducer;