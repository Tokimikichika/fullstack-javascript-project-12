// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const userFromLocalStorage = localStorage.getItem('user');
const initialState = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      localStorage.setItem('user', JSON.stringify(payload));
      state.username = payload.username;
      state.token = payload.token;
    },
    logout(state) {
      localStorage.removeItem('user');
      state.username = null;
      state.token = null;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
