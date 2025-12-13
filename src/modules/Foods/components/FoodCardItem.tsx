import styled from "styled-components";
import { Food } from "../../../types";

const Card = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.textLight};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.xs} 0;
  color: ${(props) => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const Label = styled.span`
  font-weight: 500;
`;

export {
  FoodCardItem,
  CardHeader,
  CardTitle,
  ButtonGroup,
  IconButton,
  InfoRow,
  Label,
};

interface FoodCardItemProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: string) => void;
}

const FoodCardItem = ({ food, onEdit, onDelete }: FoodCardItemProps) => {
  return (
    <Card key={food.id}>
      <CardHeader>
        <CardTitle>{food.name}</CardTitle>
        <ButtonGroup>
          <IconButton onClick={() => onEdit(food)}>✏️</IconButton>
          <IconButton onClick={() => onDelete(food.id)}>🗑️</IconButton>
        </ButtonGroup>
      </CardHeader>
      <InfoRow>
        <Label>Serving Size:</Label>
        <span>{food.servingSize}</span>
      </InfoRow>
      <InfoRow>
        <Label>Calories:</Label>
        <span>{food.calories} kcal</span>
      </InfoRow>
      <InfoRow>
        <Label>Protein:</Label>
        <span>{food.protein}g</span>
      </InfoRow>
      <InfoRow>
        <Label>Carbs:</Label>
        <span>{food.carbs}g</span>
      </InfoRow>
      <InfoRow>
        <Label>Fat:</Label>
        <span>{food.fat}g</span>
      </InfoRow>
    </Card>
  );
};

export default FoodCardItem;
