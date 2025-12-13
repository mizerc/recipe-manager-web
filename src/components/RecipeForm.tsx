import { useState, useEffect } from "react";
import styled from "styled-components";
import { Recipe, RecipeIngredient } from "../types";
import { recipeService } from "../services/recipeService";
import { foodService } from "../modules/Foods/services/foodService";

const Form = styled.form`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  box-shadow: ${(props) => props.theme.shadows.md};
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
  color: ${(props) => props.theme.colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const IngredientRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const IngredientSelect = styled(Select)`
  flex: 2;
`;

const QuantityInput = styled(Input)`
  flex: 1;
`;

const RemoveButton = styled.button`
  background: ${(props) => props.theme.colors.error};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #c0392b;
  }
`;

const AddButton = styled.button`
  background: ${(props) => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #45b869;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: ${props.theme.colors.primary};
    color: white;
    &:hover {
      background: ${props.theme.colors.primaryDark};
    }
  `
      : `
    background: ${props.theme.colors.background};
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};
    &:hover {
      background: ${props.theme.colors.border};
    }
  `}
`;

interface RecipeFormProps {
  recipe?: Recipe;
  onSave: () => void;
  onCancel: () => void;
}

export const RecipeForm = ({ recipe, onSave, onCancel }: RecipeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    servings: "",
    prepTime: "",
    instructions: "",
  });
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const foods = foodService.getAll();

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings.toString(),
        prepTime: recipe.prepTime.toString(),
        instructions: recipe.instructions,
      });
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  const handleAddIngredient = () => {
    if (foods.length === 0) {
      alert("Please add foods first before creating recipes.");
      return;
    }
    setIngredients([...ingredients, { foodId: foods[0].id, quantity: 1 }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (
    index: number,
    field: "foodId" | "quantity",
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index] = {
      ...updated[index],
      [field]: field === "quantity" ? parseFloat(value) || 0 : value,
    };
    setIngredients(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      name: formData.name,
      description: formData.description,
      ingredients: ingredients,
      instructions: formData.instructions,
      servings: parseInt(formData.servings) || 1,
      prepTime: parseInt(formData.prepTime) || 0,
    };

    if (recipe) {
      recipeService.update(recipe.id, recipeData);
    } else {
      recipeService.create(recipeData);
    }

    onSave();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>{recipe ? "Edit Recipe" : "Add New Recipe"}</Title>

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
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="servings">Servings *</Label>
        <Input
          id="servings"
          type="number"
          min="1"
          value={formData.servings}
          onChange={(e) =>
            setFormData({ ...formData, servings: e.target.value })
          }
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="prepTime">Prep Time (minutes) *</Label>
        <Input
          id="prepTime"
          type="number"
          min="0"
          value={formData.prepTime}
          onChange={(e) =>
            setFormData({ ...formData, prepTime: e.target.value })
          }
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Ingredients</Label>
        {ingredients.map((ingredient, index) => (
          <IngredientRow key={index}>
            <IngredientSelect
              value={ingredient.foodId}
              onChange={(e) =>
                handleIngredientChange(index, "foodId", e.target.value)
              }
            >
              {foods.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name}
                </option>
              ))}
            </IngredientSelect>
            <QuantityInput
              type="number"
              step="0.1"
              min="0"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              placeholder="Quantity"
            />
            <RemoveButton
              type="button"
              onClick={() => handleRemoveIngredient(index)}
            >
              Remove
            </RemoveButton>
          </IngredientRow>
        ))}
        {foods.length > 0 && (
          <AddButton type="button" onClick={handleAddIngredient}>
            + Add Ingredient
          </AddButton>
        )}
        {foods.length === 0 && (
          <p style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>
            No foods available. Please add foods first.
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="instructions">Instructions</Label>
        <TextArea
          id="instructions"
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
          placeholder="Step-by-step instructions..."
        />
      </FormGroup>

      <ButtonGroup>
        <Button type="button" onClick={onCancel} $variant="secondary">
          Cancel
        </Button>
        <Button type="submit" $variant="primary">
          {recipe ? "Update" : "Create"}
        </Button>
      </ButtonGroup>
    </Form>
  );
};
