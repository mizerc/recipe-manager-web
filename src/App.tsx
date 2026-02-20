import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Layout } from "./components/Layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { RecipesPage } from "./pages/RecipesPage";
import { theme } from "./styles/theme";
import { SettingsPage } from "./pages/SettingsPage";
import FoodListPage from "./modules/Foods/pages/FoodListPage";
import FoodViewPage from "./modules/Foods/pages/FoodViewPage";
import FoodCreatePage from "./modules/Foods/pages/FoodCreatePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/* FOODS */}
            <Route path="/foods" element={<FoodListPage />} />
            <Route path="/foods/create" element={<FoodCreatePage />} />
            <Route path="/foods/:id" element={<FoodViewPage />} />
            {/* RECIPES */}
            <Route path="/recipes" element={<RecipesPage />} />
            {/* <Route path="/recipes/create" element={<RecipeCreatePage />} />
            <Route path="/recipes/:id" element={<RecipeViewPage />} /> */}
            {/* SETTINGS */}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
