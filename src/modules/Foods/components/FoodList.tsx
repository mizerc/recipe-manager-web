import { useState, useEffect } from "react";
import { Food } from "../../../types";
import { FoodForm } from "./FoodForm";
import { FoodCardItem } from "./FoodCardItem";
import { foodService } from "../services/foodService";
import PageContainer from "../../../components/GUI/PageContainer";
import { FoodListGrid } from "./FoodListGrid";

interface FoodListProps {
  onEdit?: (food: Food) => void;
}

export const FoodList = ({ onEdit }: FoodListProps) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = () => {
    setFoods(foodService.getAll());
  };

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

  if (editingFood) {
    return (
      <FoodForm
        food={editingFood}
        onSave={() => {
          setEditingFood(null);
          loadFoods();
        }}
        onCancel={() => setEditingFood(null)}
      />
    );
  }

  return (
    <PageContainer>
      <FoodListGrid>
        {foods.map((food) => (
          <FoodCardItem
            key={food.id}
            food={food}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </FoodListGrid>

      {foods.length === 0 && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#7f8c8d" }}>
          No foods found. Add your first food to get started!
        </div>
      )}
    </PageContainer>
  );
};
