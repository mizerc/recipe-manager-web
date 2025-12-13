import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Food } from '../types';
import { foodService } from '../services/foodService';
import { FoodForm } from './FoodForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textLight};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.xs} 0;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const Label = styled.span`
  font-weight: 500;
`;

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
    if (window.confirm('Are you sure you want to delete this food?')) {
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
    <Container>
      <Grid>
        {foods.map(food => (
          <Card key={food.id}>
            <CardHeader>
              <CardTitle>{food.name}</CardTitle>
              <ButtonGroup>
                <IconButton onClick={() => handleEdit(food)}>✏️</IconButton>
                <IconButton onClick={() => handleDelete(food.id)}>🗑️</IconButton>
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
        ))}
      </Grid>
      {foods.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
          No foods found. Add your first food to get started!
        </div>
      )}
    </Container>
  );
};

