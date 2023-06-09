 import { RecipesApi } from "../api/Api.js";

class PrincipalFilter {
  constructor(recipeInstance, filterTagInstance) {
    // DOM elements
    this.allLi = null;
    this.searchTagItems = null;
    this.searchTagContainer = document.querySelector(".search-tag-container");
    this.search = document.querySelector(".search");
    this.input = document.querySelector("#search-input");
    this.recipes = document.querySelector(".recipes");
    this.principalInput = document.querySelector("#search-input");

    // Class instances
    this.idIngredientsTitleDescriptionApi = new RecipesApi("/data/recipe.json");
    this.filterTag = filterTagInstance;
    this.recipesClass = recipeInstance;

    // Data
    this.arrayOfIngredientsTitleDescription = null;
    this.principalArrayCard = [];
    this.allLiArrayId = [];

    // Methods called on startup
    this.getData();
    this.clearInput();
    this.snagHover();
  }

  // Fetch data from the API
  async getData() {
    this.arrayOfIngredientsTitleDescription = await this.idIngredientsTitleDescriptionApi.getRecipes();
  }

  // Handle hover effect on search input field
  snagHover() {
    const searchButtonImage = document.getElementById("search-button-image");
    this.input.addEventListener("input", (event) => {
      if (event.target.value.length >= 3) {
        searchButtonImage.src = "images/loop-yellow.svg";
        searchButtonImage.addEventListener("click", () => {
          this.checkInput();
        });
      } else {
        searchButtonImage.src = "images/loop-grey.svg";
      }
    });
  }

  // Clear the search input field and reset filtered recipes
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

  // Check the input value and filter recipes based on it
  checkInput() {
    this.principalArrayCard = [];
    if (this.input.value.length >= 3) {
      const input = new RegExp("\\b" + this.input.value.toLowerCase() + "\\b");
      for (const element of this.arrayOfIngredientsTitleDescription) {
        if (element.ingredients.length > 0) {
          for (const ingredient of element.ingredients) {
            if (ingredient.ingredient.toLowerCase().match(input)) {
              this.principalArrayCard.push(element);
            }
          }
        } else if (element.name.toLowerCase().match(input)) {
          this.principalArrayCard.push(element);
        } else if (element.description.toLowerCase().match(input)) {
          this.principalArrayCard.push(element);
        }
      }
      if (this.principalArrayCard.length === 0) {
        this.principalArrayCard.push("null");
      }
      this.recipesClass.principalArrayCard = this.principalArrayCard;
      this.recipesClass.commonElements();
    }
  }
}

export { PrincipalFilter };
