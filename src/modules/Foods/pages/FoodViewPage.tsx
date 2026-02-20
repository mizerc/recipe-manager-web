import { useParams } from "react-router-dom";
import PageContainer from "../../../components/GUI/PageContainer";
import { foodService } from "../services/foodService";
import FoodCardItem from "../components/FoodCardItem";

const FoodViewPage = () => {
  const { id } = useParams<{ id: string }>();

  const food = id ? foodService.getById(id) : null;

  return (
    <PageContainer title="Food View Details">
      <FoodCardItem food={food} onEdit={() => {}} onDelete={() => {}} />
    </PageContainer>
  );
};

export default FoodViewPage;
