import { Recipe } from "../layout/Recipe.js";
import { apiMotor } from "../api/ApiAdress.js";
import { RecipesApi } from "../api/Api.js";
import { DisplayListTag } from "../layout/DisplayListTag.js";
import { UnscreenFilterTag } from "../layout/UnscreenFilterTag.js";
import { PrincipalFilter } from "../layout/PrincipalFilter.js";
import { FilterTag } from "../layout/FilterTag.js";

class Index {
  constructor() {
    // Create an instance of API Address
    this.apiAdress = apiMotor();

    // Create an instance of Recipes API
    this.recipesApi = new RecipesApi(this.apiAdress);

    // Create an instance of FilterTag
    this.filterTagInstance = new FilterTag();
  }

  // Display all recipes
  async displayAllRecipes() {
    // Fetch recipes from the API
    this.recipes = await this.recipesApi.getRecipes();

    // Create an instance of Recipe and pass the recipes and filter tag instance
    this.recipeInstance = new Recipe(this.recipes, this.filterTagInstance);

    // Display the recipes
    this.recipeInstance.DisplayRecipes(this.recipes);
  }
}

// Create an instance of Index
const index = new Index();

// Display all recipes and perform other operations when it's done
index.displayAllRecipes().then(() => {
  // Create an instance of DisplayListTag and pass the recipe instance and filter tag instance
  new DisplayListTag(index.recipeInstance, index.filterTagInstance);

  // Create an instance of UnscreenFilterTag and pass the recipe instance
  new UnscreenFilterTag(index.recipeInstance);

   // Create an instance of PrincipalFilter and pass the recipe instance and filter tag instance
  /* new PrincipalFilter(index.recipeInstance, index.filterTagInstance); */
});
