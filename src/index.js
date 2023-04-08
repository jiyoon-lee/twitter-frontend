import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';

import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      {/* <Dashboard /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
