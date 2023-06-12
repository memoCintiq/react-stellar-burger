import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import App from "./components/app/app.jsx";
import { rootReducer } from "./services/reducers/root";
import "./index.css";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
