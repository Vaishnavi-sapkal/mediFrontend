import { StrictMode } from "react"; // not for production level
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./AuthContex.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </CookiesProvider>
  </StrictMode>
);
