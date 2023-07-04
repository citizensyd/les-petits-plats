class RecipeCard {
  constructor(recipe) {
    // Recipe properties
    this.image = recipe.image;
    this.title = recipe.name;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.unit = recipe.unit;
    this.id = recipe.id;
    
    // DOM element
    this.sectionRecipe = document.querySelector(".recipes");

    // Display the recipe card
    this.displayCard();
  }

  // Display the recipe card in the DOM
  displayCard() {
    const htmlContentCard = `
      <article class="recipe-card" id="${this.id}">
        <img src="images/photo/${this.image}" alt="${this.title}">
        <div class="recipe-card-time">${this.time}min</div>
        <section>
          <h2>${this.title}</h2>
          <h3>RECETTE</h3>
          <p class="recipe-card-recette">${this.description}</p>
          <h3>INGRÉDIENTS</h3>
          <div class="recipe-card-ingredients">${this.generateIngredientsHtml()}</div>
        </section>
      </article>`;

    this.sectionRecipe.innerHTML += htmlContentCard;
  }

  // Generate HTML for the ingredients list
  generateIngredientsHtml() {
    let html = "";
    this.ingredients.forEach((element) => {
      element.quantity = element.quantity || "";
      element.unit = element.unit || "";      
      html += `<div><p>${element.ingredient}</p><span>${element.quantity}${element.unit}</span></div>`;
    });
    return html;
  }
}

export { RecipeCard };
