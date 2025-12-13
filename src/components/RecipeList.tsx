import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Recipe } from '../types';
import { recipeService } from '../services/recipeService';
import { RecipeForm } from './RecipeForm';
import { RecipeCard } from './RecipeCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

interface RecipeListProps {
  onEdit?: (recipe: Recipe) => void;
}

export const RecipeList = ({ onEdit }: RecipeListProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    setRecipes(recipeService.getAll());
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      recipeService.delete(id);
      loadRecipes();
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    onEdit?.(recipe);
  };

  if (editingRecipe) {
    return (
      <RecipeForm
        recipe={editingRecipe}
        onSave={() => {
          setEditingRecipe(null);
          loadRecipes();
        }}
        onCancel={() => setEditingRecipe(null)}
      />
    );
  }

  return (
    <Container>
      <Grid>
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Grid>
      {recipes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
          No recipes found. Add your first recipe to get started!
        </div>
      )}
    </Container>
  );
};

