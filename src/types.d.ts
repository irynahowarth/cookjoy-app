// This file contains types for the database layer.

interface RecipeProps{
    id: string;
    title: string;
    image?: string;
    servings: number;
    readyInMinutes: number;
    cookingMinutes: number;
    preparationMinutes: number;
    dishTypes: string[];
    instructions: string;
    ingredients: [];
    createId: string;
  }