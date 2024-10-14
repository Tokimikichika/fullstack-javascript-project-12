import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState();
      headers.set('Authorization', `Bearer ${auth.token}`);
      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;

export {
  useGetMessagesQuery as useGetMessages,
  useAddMessageMutation as useAddMessage,
};
