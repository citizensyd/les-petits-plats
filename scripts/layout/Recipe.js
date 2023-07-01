import { RecipeCard } from "../factories/RecipeCard.js";

class Recipe {
  constructor(allRecipes, filterTagInstance) {
    this.recipes = allRecipes;
    this.precedentArray = [];
    this.precedentArray.push(this.recipes);
    this.instance = null;
    this.recipesSection = document.querySelector(".recipes");
    this.principalArrayCard = [];
    this.filterTagInstance = filterTagInstance;
  }

  static setInstance(instance) {
    this.instance = instance;
  }

  // Display recipe card
  DisplayRecipes(recipes) {
    this.deleteChild();
    recipes.forEach((element) => {
      new RecipeCard(element);
    });
  }

  displayNoresult() {
    this.deleteChild();
    const messageNoResult = document.createElement("div");
    messageNoResult.classList.add("recipe-message");
    messageNoResult.textContent = `Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    this.recipesSection.appendChild(messageNoResult);
  }

  // Dispatch the display recipes
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

  deleteChild() {
    const recipes = document.querySelector(".recipes");
    while (recipes.firstChild) {
      recipes.removeChild(recipes.firstChild);
    }
  }

  slicePrecedentArray() {
    this.precedentArray.splice(this.precedentArray.length - 1, 1);
    this.commonElements();
  }

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

  commonElements() {
    /*     console.log(this.precedentArray); */
    const referenceArray = this.precedentArray[0];
    /*     console.log(this.precedentArray.length);
    console.log(this.precedentArray.length === 1);
    console.log(this.precedentArray.length > 1);
    console.log(this.principalArrayCard);
    console.log(this.principalArrayCard.length);
    console.log(this.principalArrayCard.length > 0);
    console.log(this.principalArrayCard.length === 0); 
    console.log(!this.principalArrayCard.includes("null"));*/
    if (this.precedentArray.length === 1) {
      this.filterTagInstance.filterMenuItemsExclude(this.precedentArray[0]);
      this.DisplayRecipes(this.precedentArray[0]);
    } else if (this.precedentArray.length > 1) {
      const result = referenceArray.filter((element) => {
        return this.precedentArray.every((array) => array.some((item) => item.id === element.id));
      });
      this.filterTagInstance.filterMenuItemsExclude(result);
      this.DisplayRecipes(result);
    }
  }
}

export { Recipe };
