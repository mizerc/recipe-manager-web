import React from "react";
import styled from "styled-components";
import { Food } from "../types/Food";

interface FoodListAsTableProps {
  foods: Food[];
  onEdit?: (food: Food) => void;
  onDelete?: (id: string) => void;
  onClick?: (food: Food) => void;
}

const TableButton = styled.button`
  padding: 0.3rem 0.7rem;
  background: #aaa;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #888;
  }
`;
const TableButtonView = styled(TableButton)`
  background: #aaa;
`;

const StyledTableRow = styled.tr`
  padding: 0.7rem;
  border-bottom: 1px solid #eee;

  &:hover {
    background: #f8f8f8;
  }
`;

const TableRow = ({
  food,
  onClick,
  onEdit,
  onDelete,
}: {
  food: Food;
  onEdit?: (food: Food) => void;
  onDelete?: (id: string) => void;
  onClick?: (food: Food) => void;
}) => {
  return (
    <StyledTableRow key={food.id}>
      <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>
        {food.id}
      </td>
      <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>
        <img
          src={food.image || ""}
          alt={food.name}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>
        {food.name}
      </td>
      <td
        style={{
          padding: "0.7rem",
          borderBottom: "1px solid #eee",
          textAlign: "right",
        }}
      >
        {food.calories}
      </td>
      <td
        style={{
          padding: "0.7rem",
          borderBottom: "1px solid #eee",
          textAlign: "right",
        }}
      >
        {food.protein}
      </td>
      <td
        style={{
          padding: "0.7rem",
          borderBottom: "1px solid #eee",
          textAlign: "right",
        }}
      >
        {food.carbs}
      </td>
      <td
        style={{
          padding: "0.7rem",
          borderBottom: "1px solid #eee",
          textAlign: "right",
        }}
      >
        {food.fat}
      </td>
      <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>
        {food.servingSize}
      </td>
      {onClick && (
        <td
          style={{
            padding: "0.7rem",
            borderBottom: "1px solid #eee",
            whiteSpace: "nowrap",
          }}
        >
          <TableButtonView onClick={() => onClick(food)}>View</TableButtonView>
        </td>
      )}
      {(onEdit || onDelete) && (
        <td
          style={{
            padding: "0.7rem",
            borderBottom: "1px solid #eee",
            whiteSpace: "nowrap",
          }}
        >
          {onEdit && (
            <button
              style={{
                marginRight: onDelete ? "0.5rem" : 0,
                padding: "0.3rem 0.7rem",
                background: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => onEdit(food)}
              title="Edit"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              style={{
                padding: "0.3rem 0.7rem",
                background: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() =>
                window.confirm("Are you sure you want to delete this food?")
                  ? onDelete(food.id)
                  : undefined
              }
              title="Delete"
            >
              Delete
            </button>
          )}
        </td>
      )}
    </StyledTableRow>
  );
};

export const FoodListAsTable: React.FC<FoodListAsTableProps> = ({
  foods,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f8f8f8" }}>
            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              ID
            </th>

            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              Image
            </th>

            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              Name
            </th>
            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              Calories (kcal)
            </th>
            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              Protein (g)
            </th>
            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              Carbs (g)
            </th>
            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              Fat (g)
            </th>
            <th style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
              Serving Size
            </th>
            {(onEdit || onDelete || onClick) && (
              <th
                style={{
                  padding: "0.75rem",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #eee",
                }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {foods.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "#7f8c8d",
                }}
              >
                No foods found. Add your first food to get started!
              </td>
            </tr>
          ) : (
            foods.map((food) => (
              <TableRow
                key={food.id}
                food={food}
                onClick={onClick}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
