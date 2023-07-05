 import { RecipesApi } from "../api/Api.js";
 import { validateInput, escapeHtml } from "../utils/Security.js"

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
    this.searchButtonImage = document.getElementById("search-button-image");

    // Class instances
    this.idIngredientsTitleDescriptionApi = new RecipesApi("/data/recipe.json");
    this.filterTag = filterTagInstance;
    this.recipesClass = recipeInstance;

    // Data
    this.arrayOfIngredientsTitleDescription = null;
    this.principalArrayCard = [];
    this.allLiArrayId = [];
    this.escapedInput = null;

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
    this.input.addEventListener("input", (event) => {
      if (event.target.value.length >= 3) {
        const input = this.principalInput.value;
        const isValid = validateInput(input);
        this.escapedInput = escapeHtml(input);
        this.searchButtonImage.src = "images/loop-yellow.svg";
        if (!isValid) {
          return this.searchButtonImage.src = "images/loop-red.svg";
        }
        this.checkInput();
      } else if (event.target.value.length === 0){
        this.recipesClass.DisplayRecipes(this.arrayOfIngredientsTitleDescription);
      } else {
        this.searchButtonImage.src = "images/loop-grey.svg";
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
        clearIcon.style.display = "none";
        inputElement.value = "";
        this.principalArrayCard = [];
        this.recipesClass.principalArrayCard = this.principalArrayCard;
        this.searchButtonImage.src = "images/loop-grey.svg";
        this.recipesClass.filterTagDisplayRecipes();
      }
    });
  }

  // Check the input value and filter recipes based on it
  checkInput() {
    console.time("c");
    const inputTest = new RegExp("\\b" + this.input.value.toLowerCase() + "\\b");
  
    this.principalArrayCard = this.arrayOfIngredientsTitleDescription.filter((element) => {
      if (element.ingredients.length > 0) {
        return element.ingredients.some((ingredient) => {
          return ingredient.ingredient.toLowerCase().match(inputTest);
        });
      } else {
        return (
          element.name.toLowerCase().match(inputTest) ||
          element.description.toLowerCase().match(inputTest)
        );
      }
    });
  
    if (this.principalArrayCard.length === 0) {
      this.principalArrayCard.push("null");
    }
  
    this.recipesClass.principalArrayCard = this.principalArrayCard;
    this.recipesClass.commonElements();
  
    console.timeEnd("c");
  }
  
}

export { PrincipalFilter };
