import Item from "./pages/item";
import Login from "./pages/login";
import Order from "./pages/order";
import Vendor from "./pages/vendor";
import Profile from "./pages/profile";
import Toast from "./components/Toast";
import Customer from "./pages/customer";
import AddOrder from "./pages/order/add";
import Dashboard from "./pages/dashboard";
import Topbar from "./pages/global/Topbar";
import ViewOrder from "./pages/order/edit";
import SingleItem from "./pages/item/single";
import { Route, Routes } from "react-router-dom";
import SingleVendor from "./pages/vendor/single";
import { ColorModeContext, useMode } from "./theme";
import SingleCustomer from "./pages/customer/single";
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
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/items" element={<Item />} />
                  <Route path="/orders" element={<Order />} />
                  <Route path="/vendors" element={<Vendor />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/customers" element={<Customer />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/orders/add" element={<AddOrder />} />
                  <Route path="/items/:id" element={<SingleItem />} />
                  <Route path="/vendors/:id" element={<SingleVendor />} />
                  <Route path="/orders/view/:id" element={<ViewOrder />} />
                  <Route path="/customers/:id" element={<SingleCustomer />} />


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
