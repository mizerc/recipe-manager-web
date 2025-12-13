import { useState } from 'react';
import styled from 'styled-components';
import { RecipeList } from '../components/RecipeList';
import { RecipeForm } from '../components/RecipeForm';
import { Recipe } from '../types';

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

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

export const RecipesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const handleAddClick = () => {
    setEditingRecipe(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <Container>
        <RecipeForm
          recipe={editingRecipe || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Recipes</Title>
        <Button onClick={handleAddClick}>+ Add Recipe</Button>
      </Header>
      <RecipeList onEdit={handleEdit} />
    </Container>
  );
};

