
import Toast from "./components/Toast";
import Topbar from "./pages/global/Topbar";
import { routes } from "./constants/generic";
import { ColorModeContext, useMode } from "./theme";
import ProtectedRoute from "./helpers/protectedRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from 'react-router-dom';
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
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} element={<ProtectedRoute>{route.component}</ProtectedRoute>} />
                ))}
                {/* Redirect to login if no route matches */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
