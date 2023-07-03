import { RecipesApi } from "../api/Api.js";

class PrincipalFilter {
  constructor(recipeInstance, filterTagInstance) {
    this.allLi = null;
    this.searchTagItems = null;
    this.searchTagContainer = document.querySelector(".search-tag-container");
    this.search = document.querySelector(".search");
    this.input = document.querySelector("#search-input");
    this.recipes = document.querySelector(".recipes");
    this.principalInput = document.querySelector("#search-input");
    this.idIngredientsTitleDescriptionApi = new RecipesApi("/data/recipe.json");
    this.arrayOfIngredientsTitleDescription = null;
    this.filterTag = filterTagInstance;
    this.recipesClass = recipeInstance;
    this.principalArrayCard = [];
    this.allLiArrayId = [];
    this.getData();
    this.clearInput();
    this.snagHover();
  }

  async getData() {
    this.arrayOfIngredientsTitleDescription = await this.idIngredientsTitleDescriptionApi.getRecipes();
  }

  snagHover() {
    const searchButtonImage = document.getElementById("search-button-image");
    this.input.addEventListener("input", (event) => {
      if (event.target.value.length >= 3) {
        searchButtonImage.src = "images/loop-yellow.svg";
        this.checkInput();
      } else {
        searchButtonImage.src = "images/loop-grey.svg";
      }
    });
  }

  clearInput() {
    const inputElement = document.getElementById("search-input");
    const clearIcon = document.querySelector(".clear-icon");
    const searchButtonImage = document.getElementById("search-button-image");

    this.principalInput.addEventListener("input", () => {
      clearIcon.style.display = inputElement.value ? "block" : "none";
    });

    this.search.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.className === "clear-icon") {
        inputElement.value = "";
        clearIcon.style.display = "none";
        inputElement.value = "";
        this.principalArrayCard = [];
        this.recipesClass.principalArrayCard = this.principalArrayCard;
        this.recipesClass.filterTagDisplayRecipes();
      }
    });
  }

  checkInput() {
    console.log("checkInput");
    console.time("c");
    const input = new RegExp("\\b" + this.input.value.toLowerCase() + "\\b");
    const filteredArray = this.arrayOfIngredientsTitleDescription.filter((element) => {
      const hasMatchingIngredient = element.ingredients.some((ingredient) =>
        input.test(ingredient.ingredient.toLowerCase())
      );
      const hasMatchingName = input.test(element.name.toLowerCase());
      const hasMatchingDescription = input.test(element.description.toLowerCase());
      return hasMatchingIngredient || hasMatchingName || hasMatchingDescription;
    });

    this.principalArrayCard = filteredArray.length > 0 ? filteredArray : ["null"];
    this.recipesClass.principalArrayCard = this.principalArrayCard;
    this.recipesClass.commonElements();
    console.timeEnd("c");
  }
}
export { PrincipalFilter };
