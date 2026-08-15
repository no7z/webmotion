import React from "react";
import { createRoot } from "react-dom/client";
import initialState from "virtual:webmotion-assets";
import AssetReplacementPage from "./AssetReplacementPage.jsx";
import "./asset-replacement.css";

createRoot(document.getElementById("webmotion-assets-root")).render(
  <React.StrictMode>
    <AssetReplacementPage initialState={initialState} />
  </React.StrictMode>,
);
