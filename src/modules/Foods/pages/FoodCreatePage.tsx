import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../components/GUI/PageContainer";
import { foodService } from "../services/foodService";
import Button from "../../../components/GUI/Button";
import { FoodForm } from "../components/FoodForm";
import { Food } from "../types/Food";

const FoodCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSave = (food: Omit<Food, "id">) => {
    setSaving(true);
    const newFood = foodService.create(food);
    setSaving(false);
    navigate(`/foods/${newFood.id}`);
  };

  const handleCancel = () => {
    navigate("/foods");
  };

  return (
    <PageContainer
      title="Add New Food"
      rightButton={<Button onClick={handleCancel}>Back</Button>}
    >
      <FoodForm onSave={handleSave} onCancel={handleCancel} loading={saving} />
    </PageContainer>
  );
};

export default FoodCreatePage;
