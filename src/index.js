import ReactDOM from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { RouterProvider } from "react-router-dom";
import io from "socket.io-client";

import store from "app/store";
import "./index.css";
import router from "./router";

let persistor = persistStore(store);

const state = store.getState();
const baseUrl = process.env.REACT_APP_BASE_URL;
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("state스테이트", state.auth.token);
const socketClient = io(baseUrl);

socketClient.on("tweets", (socket) => {
  console.log("뭐지뭐지", socket.id);
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
