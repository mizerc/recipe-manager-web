import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { foodService } from '../modules/Foods/services/foodService';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../types';
import { RecipeCard } from '../components/RecipeCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const Section = styled.section`
  margin-top: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  color: ${props => props.theme.colors.text};
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardPage = () => {
  const [foodCount, setFoodCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(0);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const foods = foodService.getAll();
    const recipes = recipeService.getAll();
    
    setFoodCount(foods.length);
    setRecipeCount(recipes.length);
    
    // Get 3 most recent recipes (by id, which includes timestamp)
    const sorted = [...recipes].sort((a, b) => 
      parseInt(b.id) - parseInt(a.id)
    );
    setRecentRecipes(sorted.slice(0, 3));
  };

  const handleDeleteRecipe = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      recipeService.delete(id);
      loadStats();
    }
  };

  const handleEditRecipe = () => {
    // Navigation will be handled by clicking the recipe card
    window.location.href = `/recipes`;
  };

  return (
    <Container>
      <Title>Dashboard</Title>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{foodCount}</StatValue>
          <StatLabel>Total Foods</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{recipeCount}</StatValue>
          <StatLabel>Total Recipes</StatLabel>
        </StatCard>
      </StatsGrid>

      {recentRecipes.length > 0 && (
        <Section>
          <SectionTitle>Recent Recipes</SectionTitle>
          <RecipesGrid>
            {recentRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </RecipesGrid>
        </Section>
      )}

      {foodCount === 0 && recipeCount === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            Welcome to Recipe Manager!
          </p>
          <p>Get started by adding your first food item, then create a recipe.</p>
        </div>
      )}
    </Container>
  );
};

