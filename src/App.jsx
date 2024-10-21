import Item from "./pages/item";
import Login from "./pages/login";
import Order from "./pages/order";
import Vendor from "./pages/vendor";
import Toast from "./components/Toast";
import Customer from "./pages/customer";
import Dashboard from "./pages/dashboard";
import Topbar from "./pages/global/Topbar";
import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import ProtectedRoute from "./helpers/protectedRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Toast />
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route>
                  {/* <Route element={<ProtectedRoute />}> */}
                  <Route path="/items" element={<Item />} />
                  <Route path="/orders" element={<Order />} />
                  <Route path="/vendors" element={<Vendor />} />
                  <Route path="/customers" element={<Customer />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
