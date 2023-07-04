// Generic class for calling a server
class Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .catch((err) => console.log("An error occurred", err));
  }
}

// Call to API to get recipes
class RecipesApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getRecipes() {
    const { recipes } = await this.get();
    return recipes;
  }
}

// Call to API to get ingredients
class IngredientsApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getData() {
    const { recipes } = await this.get();
    const allIngredients = recipes.reduce((accumulator, recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const ingredientName = ingredient.ingredient;
        if (!accumulator.includes(ingredientName)) {
          accumulator.push(ingredientName);
        }
      });
      return accumulator;
    }, []);
    return allIngredients;
  }
}

// Call to API to get appliances
class AppareilsApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getData() {
    const { recipes } = await this.get();
    const allAppareils = recipes.reduce((accumulator, recipe) => {
      const applianceName = recipe.appliance;
      if (!accumulator.includes(applianceName)) {
        accumulator.push(applianceName);
      }
      return accumulator;
    }, []);
    return allAppareils;
  }
}

// Call to API to get utensils
class UstensilesApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getData() {
    const { recipes } = await this.get();
    const allUstensiles = recipes.reduce((accumulator, recipe) => {
      recipe.ustensils.forEach((ustensiles) => {
        const ustensilesName = ustensiles;
        if (!accumulator.includes(ustensilesName)) {
          accumulator.push(ustensilesName);
        }
      });
      return accumulator;
    }, []);
    return allUstensiles;
  }
}

// Call to API to get ID, ingredients, title, and description
class IdIngredientsTitleDescriptionApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getData() {
    const { recipes } = await this.get();
    const all = [];
    recipes.forEach((element) => {
      const id = element.id;
      const title = element.name;
      const ingredients = [];
      element.ingredients.forEach((ingredient) => {
        ingredients.push(ingredient.ingredient);
      });
      const description = element.description;
      all.push({ id, title, ingredients, description });
    });
    return all;
  }
}

export { RecipesApi, IngredientsApi, AppareilsApi, UstensilesApi, IdIngredientsTitleDescriptionApi };
