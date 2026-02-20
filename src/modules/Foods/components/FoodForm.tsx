import { useState, useEffect } from "react";
import styled from "styled-components";
import { foodService } from "../services/foodService";
import { Food } from "../types/Food";

const Form = styled.form`
  padding: ${(props) => props.theme.spacing.sm};
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
  padding: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 1.25rem;
  font-weight: 600;
  font-family: courier new, monospace;
  transition: border-color 0.2s ease;

  // &:focus {
  //   outline: none;
  //   border-color: ${(props) => props.theme.colors.primary};
  // }
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

interface FoodFormProps {
  food?: Food;
  onSave: () => void;
  onCancel: () => void;
}

export const FoodForm = ({ food, onSave, onCancel }: FoodFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    servingSize: "",
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
      setImageFile(food.image ? new File([], food.image) : null);
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
      {/* <Title>{food ? 'Edit Food Component' : 'Add New Food'}</Title> */}

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

      {/* Image Picker Field (optional, does not handle storage) */}
      <FormGroup>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Optionally handle image preview or state, not persisted
              setImageFile(file);
            }
          }}
        />
        {/* Optionally show preview if desired */}
        {imageFile && (
          <div style={{ marginTop: "0.5rem" }}>
            <p>Filename: {imageFile.name}</p>
            <p>Size: {imageFile.size} bytes</p>
            <p>Type: {imageFile.type}</p>
            <p>URL: {URL.createObjectURL(imageFile)}</p>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="servingSize">Serving Size *</Label>
        <Input
          id="servingSize"
          type="text"
          value={formData.servingSize}
          onChange={(e) =>
            setFormData({ ...formData, servingSize: e.target.value })
          }
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
          onChange={(e) =>
            setFormData({ ...formData, calories: e.target.value })
          }
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
          onChange={(e) =>
            setFormData({ ...formData, protein: e.target.value })
          }
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
          {food ? "Update" : "Create"}
        </Button>
      </ButtonGroup>
    </Form>
  );
};
