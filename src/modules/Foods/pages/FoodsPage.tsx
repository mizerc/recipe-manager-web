import { useState } from "react";
import { FoodList } from "../components/FoodList";
import { FoodForm } from "../components/FoodForm";
import { Food } from "../../../types";
import PageContainer from "../../../components/GUI/PageContainer";

export const FoodsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const handleAddClick = () => {
    setEditingFood(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingFood(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFood(null);
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <PageContainer title="Edit Food">
        <FoodForm
          food={editingFood || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Foods Pageeeee">
      <FoodList onEdit={handleEdit} />
    </PageContainer>
  );
};
