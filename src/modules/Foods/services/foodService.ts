import { Food } from '../types';

const STORAGE_KEY = 'recipe-manager-foods';

export const foodService = {
  getAll(): Food[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getById(id: string): Food | undefined {
    const foods = this.getAll();
    return foods.find(food => food.id === id);
  },

  create(food: Omit<Food, 'id'>): Food {
    const foods = this.getAll();
    const newFood: Food = {
      ...food,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    foods.push(newFood);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
    return newFood;
  },

  update(id: string, updates: Partial<Omit<Food, 'id'>>): Food | null {
    const foods = this.getAll();
    const index = foods.findIndex(food => food.id === id);
    if (index === -1) return null;
    
    foods[index] = { ...foods[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
    return foods[index];
  },

  delete(id: string): boolean {
    const foods = this.getAll();
    const filtered = foods.filter(food => food.id !== id);
    if (filtered.length === foods.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};

