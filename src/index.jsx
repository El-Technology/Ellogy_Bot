import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { theme } from './utils/theme';
import "./i18n";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
