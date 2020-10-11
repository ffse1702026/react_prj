import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { sku } from './sku.reducer'
import reducer from './event.reducer'

const rootReducer = combineReducers({
  authentication,
  reducer,
  sku
});

export default rootReducer;
