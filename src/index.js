import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripe_public } from "./Helpers/constants";

const stripePromise = loadStripe(stripe_public);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReactNotifications />
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
