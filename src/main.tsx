import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
// import axios from "axios";
import { ConfigProvider, theme } from "antd";

const queryClient = new QueryClient();

// axios.defaults.baseURL = "http://localhost:5000/api/v1";

const themeConfig = {
  token: {
    colorPrimary: "#ff6347", // Green primary color
    colorText: "#ff6347",
    colorIcon: "#1DA57A",
    // colorTextButtonHover: "#52c41a",
    hoverColor: "#fffff",
  },

  // 1. Use dark algorithm
  algorithm: theme.darkAlgorithm,

  // 2. Combine dark algorithm and compact algorithm
  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={themeConfig}>
            <App />
          </ConfigProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
