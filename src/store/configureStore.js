import { createStore, combineReducers } from 'redux';
import StarsReducer from '../reducers/stars';
import filtersReducer from '../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            stars: StarsReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     );

     return store;
}