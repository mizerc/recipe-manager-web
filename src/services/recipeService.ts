import { Recipe } from "../types";
import { foodService } from "../modules/Foods/services/foodService";

const STORAGE_KEY = "recipe-manager-recipes";

const recipeServiceLocally = {
  getAll(): Recipe[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getById(id: string): Recipe | undefined {
    const recipes = this.getAll();
    return recipes.find((recipe) => recipe.id === id);
  },

  create(recipe: Omit<Recipe, "id">): Recipe {
    const recipes = this.getAll();
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    recipes.push(newRecipe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return newRecipe;
  },

  update(id: string, updates: Partial<Omit<Recipe, "id">>): Recipe | null {
    const recipes = this.getAll();
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return null;

    recipes[index] = { ...recipes[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return recipes[index];
  },

  delete(id: string): boolean {
    const recipes = this.getAll();
    const filtered = recipes.filter((recipe) => recipe.id !== id);
    if (filtered.length === recipes.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  getFoodName(foodId: string): string {
    const food = foodService.getById(foodId);
    return food?.name || "Unknown Food";
  },
};

export const recipeService = recipeServiceLocally;
