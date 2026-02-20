import { useState, useEffect } from "react";
import { Food } from "../../../types";
import { FoodForm } from "./FoodForm";
import { FoodCardItem } from "./FoodCardItem";
import { foodService } from "../services/foodService";
import { FoodListGrid } from "./FoodListGrid";

interface FoodListProps {
  foods: Food[];
  onEdit?: (food: Food) => void;
}

export const FoodList = ({ foods, onEdit }: FoodListProps) => {
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      foodService.delete(id);
      loadFoods();
    }
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    onEdit?.(food);
  };

  // if (editingFood) {
  //   return (
  //     <FoodForm
  //       food={editingFood}
  //       onSave={() => {
  //         setEditingFood(null);
  //       }}
  //       onCancel={() => setEditingFood(null)}
  //     />
  //   );
  // }

  return (
    <FoodListGrid>
      {foods.map((food) => (
        <FoodCardItem
          key={food.id}
          food={food}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {foods.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#7f8c8d" }}>
          No foods found. Add your first food to get started!
        </div>
      )}
    </FoodListGrid>
  );
};
