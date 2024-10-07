import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState();
      headers.set('Authorization', `Bearer ${auth.token}`);
      return headers;
    },
  }),
  tagTypes: ['Channels, Messages'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    updateChannel: builder.mutation({
      query: (channel) => ({
        url: channel.id,
        method: 'PATCH',
        body: channel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
        invalidatesTags: ['Messages', 'Channels'],
      }),
    }),
  }),
});

const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;

export {
  useGetChannelsQuery as useGetChannels,
  useAddChannelMutation as useAddChannel,
  useUpdateChannelMutation as useUpdateChannel,
  useDeleteChannelMutation as useDeleteChannel,
};
