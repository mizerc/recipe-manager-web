import styled from 'styled-components';
import { Recipe } from '../types';
import { recipeService } from '../services/recipeService';

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

const Description = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  line-height: 1.5;
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

const IngredientsList = styled.ul`
  margin: ${props => props.theme.spacing.md} 0;
  padding-left: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const IngredientItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.xs};
`;

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export const RecipeCard = ({ recipe, onEdit, onDelete }: RecipeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <ButtonGroup>
          <IconButton onClick={() => onEdit(recipe)}>✏️</IconButton>
          <IconButton onClick={() => onDelete(recipe.id)}>🗑️</IconButton>
        </ButtonGroup>
      </CardHeader>
      
      {recipe.description && <Description>{recipe.description}</Description>}
      
      <InfoRow>
        <Label>Servings:</Label>
        <span>{recipe.servings}</span>
      </InfoRow>
      
      <InfoRow>
        <Label>Prep Time:</Label>
        <span>{recipe.prepTime} minutes</span>
      </InfoRow>

      {recipe.ingredients.length > 0 && (
        <>
          <Label style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }}>
            Ingredients:
          </Label>
          <IngredientsList>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>
                {recipeService.getFoodName(ingredient.foodId)} - {ingredient.quantity}
              </IngredientItem>
            ))}
          </IngredientsList>
        </>
      )}

      {recipe.instructions && (
        <>
          <Label style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }}>
            Instructions:
          </Label>
          <p style={{ color: '#7f8c8d', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
            {recipe.instructions}
          </p>
        </>
      )}
    </Card>
  );
};

