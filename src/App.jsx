"use client";
import Item from "./pages/item";
import Login from "./pages/login";
import Order from "./pages/order";
import Vendor from "./pages/vendor";
import Reports from "./pages/reports";
import Profile from "./pages/profile";
import Toast from "./components/Toast";
import Customer from "./pages/customer";
import Dashboard from "./pages/dashboard";
import Topbar from "./pages/global/Topbar";
import SingleItem from "./pages/item/single";
import SingleOrder from "./pages/order/single";
import SingleVendor from "./pages/vendor/single";
import { ColorModeContext, useMode } from "./theme";
import SingleCustomer from "./pages/customer/single";
import { ErrorBoundary } from "react-error-boundary";
import AddOrEditOrder from "./pages/order/addOrEdit";
import ProtectedRoute from "./helpers/protectedRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from 'react-router-dom';
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

const App = () => {
  const [theme, colorMode] = useMode();

  const logError = (error, info) => {
    console.info(`Info recorded in boundary: ${info}`);
    console.error(`Error recorded in boundary: ${error}`);
    // will add NR v1 logging here for only errors
  };

  const ErrorFallback = ({ error, resetErrorBoundary }) => {
    setTimeout(() => {
      resetErrorBoundary();
    }, 5000);
  
    return (
      <div role="alert">
        <h3>Something went wrong:</h3>
        <h4>This page will be refreshed in 5 seconds.</h4>
        
        <h5>Error</h5>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Toast />
          <CssBaseline />
          <MyProSidebarProvider>
            <div style={{ height: "100%", width: "100%" }}>
              <main>
                <Topbar />
                <Routes>
                  {/* Public route */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected routes */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/" element={<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>} />

                  <Route path="/items" element={<ProtectedRoute><Item /></ProtectedRoute>} />
                  <Route path="/items/:id" element={<ProtectedRoute><SingleItem /></ProtectedRoute>} />

                  <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                  <Route path="/orders/add" element={<ProtectedRoute><AddOrEditOrder /></ProtectedRoute>} />
                  <Route path="/orders/view/:id" element={<ProtectedRoute><SingleOrder /></ProtectedRoute>} />
                  <Route path="/orders/update/:id" element={<ProtectedRoute><AddOrEditOrder /></ProtectedRoute>} />

                  <Route path="/vendors" element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
                  <Route path="/vendors/:id" element={<ProtectedRoute><SingleVendor /></ProtectedRoute>} />

                  <Route path="/customers" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
                  <Route path="/customers/:id" element={<ProtectedRoute><SingleCustomer /></ProtectedRoute>} />

                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />

                  {/* Redirect unmatched routes */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>

              </main>
            </div>
          </MyProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
