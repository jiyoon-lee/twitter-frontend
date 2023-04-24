import { apiSlice } from "app/api/apiSlice";

export const tweetApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Tweet"],
  endpoints: (builder) => ({
    getTweets: builder.query({
      query: () => "/tweets",
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Tweet", ...item })),
              { type: "Tweet", id: "LIST" },
            ]
          : [{ type: "Tweet", id: "LIST" }],
    }),
    createTweet: builder.mutation({
      query: (body) => ({
        url: "/tweets",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tweet", id: "LIST" }],
    }),
    deleteTweet: builder.mutation({
      query: (id) => ({
        url: `/tweets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Tweet", id }],
    }),
    updateTweet: builder.mutation({
      query: (body) => ({
        url: `/tweets/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tweet", id }],
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useCreateTweetMutation,
  useDeleteTweetMutation,
  useUpdateTweetMutation,
} = tweetApiSlice;
