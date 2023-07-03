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
    console.time("c");
    this.principalArrayCard = [];

    if (this.input.value.length >= 3) {
      const input = new RegExp("\\b" + this.input.value.toLowerCase() + "\\b");

      for (let i = 0; i < this.arrayOfIngredientsTitleDescription.length; i++) {
        const element = this.arrayOfIngredientsTitleDescription[i];

        for (let j = 0; j < element.ingredients.length; j++) {
          const ingredient = element.ingredients[j];

          if (ingredient.ingredient.toLowerCase().match(input)) {
            this.principalArrayCard.push(element);
          }
        }
        if (element.name.toLowerCase().match(input) || element.description.toLowerCase().match(input)) {
          this.principalArrayCard.push(element);
        }
      }

      if (this.principalArrayCard.length === 0) {
        this.principalArrayCard.push("null");
      }

      this.recipesClass.principalArrayCard = this.principalArrayCard;
      this.recipesClass.commonElements();
    }

    console.timeEnd("c");
  }
}
export { PrincipalFilter };
