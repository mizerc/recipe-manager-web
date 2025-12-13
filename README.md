# Recipe Manager Web

A modern recipe management web application built with React, TypeScript, Vite, and styled-components.

## Features

- **Foods CRUD**: Create, read, update, and delete foods with nutritional information (calories, protein, carbs, fat, serving size)
- **Recipes CRUD**: Create, read, update, and delete recipes with ingredients (foods + quantities), instructions, servings, and prep time
- **Dashboard**: Overview statistics showing total foods, total recipes, and recent recipes
- **Local Storage**: All data persists in browser localStorage
- **Responsive Design**: Modern, clean UI that works on mobile and desktop

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Main app component with routing
├── main.tsx                # Entry point
├── types/
│   └── index.ts            # TypeScript type definitions
├── services/
│   ├── foodService.ts      # Food CRUD operations
│   └── recipeService.ts    # Recipe CRUD operations
├── components/
│   ├── Layout/             # Layout components
│   ├── FoodList.tsx        # Food list display
│   ├── FoodForm.tsx        # Food create/edit form
│   ├── RecipeList.tsx      # Recipe list display
│   ├── RecipeCard.tsx      # Individual recipe card
│   └── RecipeForm.tsx      # Recipe create/edit form
├── pages/
│   ├── DashboardPage.tsx   # Dashboard overview
│   ├── FoodsPage.tsx       # Foods management page
│   └── RecipesPage.tsx     # Recipes management page
└── styles/
    └── theme.ts            # Styled-components theme
```

## Usage

1. **Add Foods**: Navigate to the Foods page and click "Add Food" to create food items with nutritional information
2. **Create Recipes**: Navigate to the Recipes page and click "Add Recipe" to create recipes using your foods as ingredients
3. **View Dashboard**: The dashboard shows statistics and recent recipes

## License

MIT