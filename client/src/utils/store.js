import { createStore } from 'redux';
import { reducer } from './reducers';

// creates redux store and passes in reducers
const store = createStore(reducer);

export default store;