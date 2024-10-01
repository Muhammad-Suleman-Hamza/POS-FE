import Item from "./pages/item";
import Order from "./pages/order";
import Vendor from "./pages/vendor";
import Customer from "./pages/customer";
import Dashboard from "./pages/dashboard";
import Topbar from "./pages/global/Topbar";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/items" element={<Item />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/vendors" element={<Vendor />} />
                <Route path="/customers" element={<Customer />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
