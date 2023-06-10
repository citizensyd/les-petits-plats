import { RecipesApi } from "../api/Api.js";
import { RecipeCard } from "../factories/RecipeCard.js";

const DisplayRecipes = async () => {
  const recipesApi = new RecipesApi("/data/recipe.json");
  const recipes = await recipesApi.getRecipes();
  recipes.forEach((element) => {
    new RecipeCard(element);
  });
};

DisplayRecipes();


