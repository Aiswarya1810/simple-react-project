import { Provider } from "@/components/ui/provider";
import React from "react";
import App from './App.jsx';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
 import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider>
      <App />
      <Toaster />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,

);
