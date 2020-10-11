import thunk from 'redux-thunk';
import reducer from '../_reducers';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;