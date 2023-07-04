import { RecipeCard } from "../factories/RecipeCard.js";

class Recipe {
  constructor(allRecipes, filterTagInstance) {
    // Recipes data
    this.recipes = allRecipes;
    this.precedentArray = [];
    this.precedentArray.push(this.recipes);
    this.instance = null;

    // DOM element
    this.recipesSection = document.querySelector(".recipes");

    // Array for filtered recipes
    this.principalArrayCard = [];

    // Filter tag instance
    this.filterTagInstance = filterTagInstance;

    // Result array
    this.result = allRecipes;
  }

  // Display recipe cards
  DisplayRecipes(recipes) {
    this.deleteChild();
    recipes.forEach((element) => {
      new RecipeCard(element);
    });
  }

  // Display "No result" message
  displayNoresult() {
    this.deleteChild();
    const messageNoResult = document.createElement("div");
    messageNoResult.classList.add("recipe-message");
    messageNoResult.textContent = `No recipes match your criteria... you can search for "apple pie", "fish", etc.`;
    this.recipesSection.appendChild(messageNoResult);
  }

  // Dispatch the display recipes based on filter tags
  async filterTagDisplayRecipes() {
    const tagFilter = document.querySelector(".search-tag-active-button:last-child");
    let tagfilterArray = [];
    if (tagFilter !== null) {
      const itemText = tagFilter.textContent;
      const itemCategory = tagFilter.id.substring(4, 6);
      tagfilterArray.push({ itemCategory, itemText });
    }

    if (tagFilter === null) {
      this.commonElements();
    } else {
      const divElement = document.querySelector(".recipes");
      while (divElement.firstChild) {
        divElement.firstChild.remove();
      }
      this.allReduceSize(this.recipes, tagfilterArray);
    }
  }

  // Reduce the size of the recipes array based on filter tags
  allReduceSize(table, entryTable) {
    let applianceTable = [];
    let ustensilsTable = [];
    let ingredientsTable = [];

    for (const entry of entryTable) {
      if (entry.itemCategory === "Ap") {
        applianceTable = this.reduceTableSize(table, entryTable, "appliance");
      } else if (entry.itemCategory === "Us") {
        ustensilsTable = this.reduceTableSize(table, entryTable, "ustensils");
      } else if (entry.itemCategory === "In") {
        ingredientsTable = this.reduceTableSize(table, entryTable, "ingredients");
      }
    }
    this.findCommonElements(applianceTable, ustensilsTable, ingredientsTable);
  }

  // Reduce the size of the table based on a specific item key
  reduceTableSize(table, entryTable, itemKey) {
    const reduceTable = [];
    for (const entry of entryTable) {
      for (const element of table) {
        if (itemKey === "ingredients") {
          for (const ingredient of element[itemKey]) {
            const itemText = entry.itemText;
            if (ingredient.ingredient.includes(itemText)) {
              reduceTable.push(element);
            }
          }
        } else {
          const itemText = entry.itemText;
          if (element[itemKey].includes(itemText)) {
            reduceTable.push(element);
          }
        }
      }
    }
    return reduceTable;
  }

  // Delete child elements from the recipes section
  deleteChild() {
    const recipes = document.querySelector(".recipes");
    while (recipes.firstChild) {
      recipes.removeChild(recipes.firstChild);
    }
  }

  // Remove the last filtered selection and display the previous recipes
  slicePrecedentArray() {
    this.precedentArray.splice(this.precedentArray.length - 1, 1);
    this.commonElements();
  }

  // Find common elements in filtered arrays
  findCommonElements(array1, array2, array3) {
    let newArray = null;
    if (array1.length !== 0) {
      newArray = array1;
    } else if (array2.length !== 0) {
      newArray = array2;
    } else if (array3.length !== 0) {
      newArray = array3;
    }
    this.precedentArray.push(newArray);
    if (this.precedentArray.length === 1) {
      return newArray;
    }
    if (this.precedentArray.length > 0) {
      return this.commonElements();
    }
  }

  // Display the common elements based on filters
  commonElements() {
    const referenceArray = this.precedentArray[0];

    if (this.precedentArray.length === 1 && this.principalArrayCard.includes("null")) {
      return this.displayNoresult();
    } else if (
      this.precedentArray.length === 1 &&
      this.principalArrayCard.length === 0 &&
      !this.principalArrayCard.includes("null")
    ) {
      this.filterTagInstance.filterMenuItemsExclude(this.precedentArray[0]);
      this.result = this.precedentArray[0];
      this.DisplayRecipes(this.result);
    } else if (
      this.precedentArray.length > 1 &&
      this.principalArrayCard.length === 0 &&
      !this.principalArrayCard.includes("null")
    ) {
      this.result = referenceArray.filter((element) => {
        return this.precedentArray.every((array) => array.some((item) => item.id === element.id));
      });
      this.filterTagInstance.filterMenuItemsExclude(this.result);
      this.DisplayRecipes(this.result);
    } else if (
      this.precedentArray.length === 1 &&
      this.principalArrayCard.length > 0 &&
      !this.principalArrayCard.includes("null")
    ) {
      this.result = referenceArray.filter((element) => {
        return this.principalArrayCard.some((item) => item.id === element.id);
      });
      this.filterTagInstance.filterMenuItemsExclude(this.result);
      this.DisplayRecipes(this.result);
    } else if (
      this.precedentArray.length > 1 &&
      this.principalArrayCard.length > 0 &&
      !this.principalArrayCard.includes("null")
    ) {
      const result1 = referenceArray.filter((element) => {
        return this.precedentArray.every((array) => array.some((item) => item.id === element.id));
      });
      this.result = result1.filter((element) => {
        return this.principalArrayCard.some((item) => item.id === element.id);
      });
      this.filterTagInstance.filterMenuItemsExclude(this.result);
      this.DisplayRecipes(this.result);
    }
  }
}

export { Recipe };
