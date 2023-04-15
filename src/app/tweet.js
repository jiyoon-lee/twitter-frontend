import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tweetApi = createApi({
  reducerPath: "tweetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ["Tweet"],
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: () => "/tweets",
      providesTags: () => {
        return [{ type: "Tweet", id: "tweet" }];
      },
    }),
    createTweet: builder.mutation({
      query: (body) => ({
        url: "/tweets",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Tweet", id: "tweet" }],
    }),
    updateTweet: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tweets/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: () => [{ type: "Tweet", id: "tweet" }],
    }),
  }),
});
