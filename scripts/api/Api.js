// generic class for calling a server
class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .catch((err) => console.log("an error occurs", err));
  }
}

// call to api to get recipes
class RecipesApi extends Api {
  /**
   *
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

// call to api to get one photographer
class IngredientsApi extends Api {
  /**
   *
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

class AppareilsApi extends Api {
  /**
   *
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
class UstensilesApi extends Api {
  /**
   *
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

export { RecipesApi, IngredientsApi, AppareilsApi, UstensilesApi };
