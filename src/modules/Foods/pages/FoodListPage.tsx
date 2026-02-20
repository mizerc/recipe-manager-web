import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../../components/GUI/PageContainer";
import Button from "../../../components/GUI/Button";
import { foodService } from "../services/foodService";
import { FoodListAsTable } from "../components/FoodListAsTable";
import { Food } from "../types/Food";

const FoodListPage: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFoods(foodService.getAll());
  }, []);

  const handleOnClick = (food: Food) => {
    navigate(`/foods/${food.id}`);
  };

  const handleEdit = (food: Food) => {
    navigate(`/foods/${food.id}`);
  };

  const handleDelete = (id: string) => {
    foodService.delete(id);
  };

  const handleAddClick = () => {
    navigate("/foods/create");
  };

  return (
    <PageContainer
      title="Food List Pageeeeeee"
      rightButton={<Button onClick={handleAddClick}>+ Add Food</Button>}
    >
      {/* <FoodList foods={foods} /> */}
      <FoodListAsTable foods={foods} onEdit={handleEdit} onDelete={handleDelete} onClick={handleOnClick} />
    </PageContainer>
  );
};

export default FoodListPage;
