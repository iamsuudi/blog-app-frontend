import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import "./index.css";
import Router from "./Router.jsx";
import store from "./app/store.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Theme appearance="dark">
                    <Router />
                </Theme>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>,
);
