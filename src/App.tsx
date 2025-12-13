import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Layout } from "./components/Layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { FoodsPage } from "./pages/FoodsPage";
import { RecipesPage } from "./pages/RecipesPage";
import { theme } from "./styles/theme";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/foods" element={<FoodsPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
