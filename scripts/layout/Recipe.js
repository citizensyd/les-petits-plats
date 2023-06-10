import { RecipesApi } from "../api/Api.js";
import { RecipeCard } from "../factories/RecipeCard.js";
import { apiMotor } from "./SearchByTag.js";

const DisplayRecipes = async () => {
  const apiAdress = apiMotor();
  console.log(apiAdress);
  const recipesApi = new RecipesApi(apiAdress);
  const recipes = await recipesApi.getRecipes();
  recipes.forEach((element) => {
    new RecipeCard(element);
  });
};

DisplayRecipes();


