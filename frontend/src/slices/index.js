import { combineReducers } from '@reduxjs/toolkit';
import ui, { actions as uiActions } from './ui.js';
import auth, { actions as authActions } from './auth.js';
import { channelsApi } from '../service/channelsApi.js';
import { messagesApi } from '../service/messagesApi.js';

export const actions = {
  ...uiActions,
  ...authActions,
};

export default combineReducers({
  ui,
  auth,
  [channelsApi.reducerPath]: channelsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});
