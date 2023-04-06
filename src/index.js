import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';

import Dashboard from "pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <Dashboard />
    </QueryClientProvider>
  </React.StrictMode>
);
