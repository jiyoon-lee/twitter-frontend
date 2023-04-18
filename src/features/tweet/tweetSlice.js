import { apiSlice } from "app/api/apiSlice";

export const tweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: () => "/tweets",
      keepUnusedDataFor: 5,
    }),
    createTweet: builder.mutation({
      query: (body) => ({
        url: "/tweets",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetTweetsQuery, useCreateTweetMutation } = tweetApiSlice;
