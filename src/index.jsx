import "./index.css";
import App from "./App";
import { StrictMode } from "react";
import { store } from './store/store'
import { Provider } from 'react-redux'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </StrictMode>
);
