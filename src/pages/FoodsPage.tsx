import { useState } from 'react';
import styled from 'styled-components';
import { FoodList } from '../components/FoodList';
import { FoodForm } from '../components/FoodForm';
import { Food } from '../types';
import Button from '../components/GUI/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

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
      <Container>
        <FoodForm
          food={editingFood || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Foods</Title>
        <Button onClick={handleAddClick}>+ Add Food</Button>
      </Header>
      <FoodList onEdit={handleEdit} />
    </Container>
  );
};

