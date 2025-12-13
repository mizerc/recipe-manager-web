import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Food } from '../types';
import { foodService } from '../services/foodService';

const Form = styled.form`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  color: ${props => props.theme.colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.xl};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.$variant === 'primary' ? `
    background: ${props.theme.colors.primary};
    color: white;
    &:hover {
      background: ${props.theme.colors.primaryDark};
    }
  ` : `
    background: ${props.theme.colors.background};
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};
    &:hover {
      background: ${props.theme.colors.border};
    }
  `}
`;

interface FoodFormProps {
  food?: Food;
  onSave: () => void;
  onCancel: () => void;
}

export const FoodForm = ({ food, onSave, onCancel }: FoodFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    servingSize: '',
  });

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        calories: food.calories.toString(),
        protein: food.protein.toString(),
        carbs: food.carbs.toString(),
        fat: food.fat.toString(),
        servingSize: food.servingSize,
      });
    }
  }, [food]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const foodData = {
      name: formData.name,
      calories: parseFloat(formData.calories) || 0,
      protein: parseFloat(formData.protein) || 0,
      carbs: parseFloat(formData.carbs) || 0,
      fat: parseFloat(formData.fat) || 0,
      servingSize: formData.servingSize,
    };

    if (food) {
      foodService.update(food.id, foodData);
    } else {
      foodService.create(foodData);
    }

    onSave();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>{food ? 'Edit Food' : 'Add New Food'}</Title>
      
      <FormGroup>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="servingSize">Serving Size *</Label>
        <Input
          id="servingSize"
          type="text"
          value={formData.servingSize}
          onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
          placeholder="e.g., 100g, 1 cup"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="calories">Calories (kcal) *</Label>
        <Input
          id="calories"
          type="number"
          step="0.1"
          value={formData.calories}
          onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="protein">Protein (g) *</Label>
        <Input
          id="protein"
          type="number"
          step="0.1"
          value={formData.protein}
          onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="carbs">Carbs (g) *</Label>
        <Input
          id="carbs"
          type="number"
          step="0.1"
          value={formData.carbs}
          onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="fat">Fat (g) *</Label>
        <Input
          id="fat"
          type="number"
          step="0.1"
          value={formData.fat}
          onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
          required
        />
      </FormGroup>

      <ButtonGroup>
        <Button type="button" onClick={onCancel} $variant="secondary">
          Cancel
        </Button>
        <Button type="submit" $variant="primary">
          {food ? 'Update' : 'Create'}
        </Button>
      </ButtonGroup>
    </Form>
  );
};

