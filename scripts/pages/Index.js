import { Recipe } from "../layout/Recipe.js";
import { apiMotor } from "../api/ApiAdress.js";
import { RecipesApi } from "../api/Api.js";
import { DisplayListTag } from "../layout/DisplayListTag.js";
import { UnscreenFilterTag } from "../layout/UnscreenFilterTag.js";
import { PrincipalFilter } from "../layout/PrincipalFilter.js";
import { FilterTag } from "../layout/FilterTag.js";


class Index {
  constructor() {
    this.apiAdress = apiMotor();
    this.recipesApi = new RecipesApi(this.apiAdress);
    this.filterTagInstance = new FilterTag();

  }
  
  async displayAllRecipes() {
    this.recipes = await this.recipesApi.getRecipes();
    this.recipeInstance = new Recipe(this.recipes, this.filterTagInstance);    
    this.recipeInstance.DisplayRecipes(this.recipes);
  }
}

const index = new Index();

index.displayAllRecipes().then(() => {

  new DisplayListTag(index.recipeInstance, index.filterTagInstance);

  new UnscreenFilterTag(index.recipeInstance,);

  new PrincipalFilter(index.recipeInstance, index.filterTagInstance);
});
