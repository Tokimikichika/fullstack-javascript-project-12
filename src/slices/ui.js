import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../service/channelsApi';

const slice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      isOpened: false,
      type: null,
      extra: null,
    },
    currentChannelId: '1',
    defaultChannelId: '1',
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      return {
        ...state,
        modal: {
          isOpened: true,
          type,
          extra: extra ?? null,
        },
      };
    },
    closeModal: (state) => ({
      ...state,
      modal: {
        isOpened: false,
        type: null,
        extra: null,
      },
    }),
    setCurrentChannel(state, { payload }) {
      const { channelId } = payload;
      return {
        ...state,
        currentChannelId: channelId,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, action) => ({
        ...state,
        currentChannelId: action.payload.id,
      }),
    );
  },
});

export const { actions } = slice;
export default slice.reducer;
