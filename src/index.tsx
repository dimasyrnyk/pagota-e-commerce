import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./styles/cssReset.css";
import App from "./App";
import { store, persistor } from "./store";
import ErrorFallback from "@components/ErrorFallback/ErrorFallback";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <Router>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
