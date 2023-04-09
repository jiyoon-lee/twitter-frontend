import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import socket from "socket.io-client";

import { store } from "./redux/store";
import "./index.css";

const baseURL = "http://localhost:8080";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

const socketIO = socket(baseURL);
socketIO.on("connect_error", (error) => {
  console.log("socket error", error);
});

socketIO.on("dwitter", (msg) => {
  console.log(msg);
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
