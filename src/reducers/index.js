import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import setting from './setting';
import data from './data'
import { loadingBarReducer } from 'react-redux-loading-bar'
export default combineReducers({
  user,
  runtime,
  setting,
  data,
  loadingBar: loadingBarReducer,
});
