import { routes } from "./routes";
import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageLoading from "./components/PageLoading";
import NotFound from "./components/NotFound";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <RenderRoutes data={routes} />
      </Suspense>
    </Router>
  );
}

function RenderRoutes({ data }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {data.map((route, i) => {
              const Component = route.component;
              const Layout = route.layout || Fragment;
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    <Layout>
                      <Component />
                    </Layout>
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
