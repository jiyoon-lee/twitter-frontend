import { configureStore } from "@reduxjs/toolkit";
import { tweetApi } from "app/tweet";

export const store = configureStore({
  reducer: {
    [tweetApi.reducerPath]: tweetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tweetApi.middleware),
});
