import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
