export interface RecipeIngredient {
  foodId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string;
  servings: number;
  prepTime: number; // in minutes
}
