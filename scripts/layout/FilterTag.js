class FilterTag {
  constructor() {
    this.searchTagContainer = document.querySelector(".search-tag-container");
    this.allLi = null;
    this.allLiArrayId = [];
    this.element = null;
    this.searchTagContainer.addEventListener("input", (event) => {
      this.handleSearchTagInput(event);
    });
  }

  // Unscreen element li in menu tag if no include in input
  filterMenuItems(element, input) {
    const filter = input.toLowerCase();
    element.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(filter)) {
        item.style.display = "block";
      } else if (filter === "") {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Select correct input menu and send to unscreen li
  handleSearchTagInput(event) {
    console.log(event.target);
    let input;
    if (event.target.tagName === "INPUT") {
      input = event.target.value.trim();
    }

    const test = event.target.closest("div");
    this.element = test.querySelectorAll("[id*=menu] li[style*='display: block']");

    this.filterMenuItems(this.element, input);
  }

  // Unscreen element li in menu tag if no include in input
  filterMenuItemsExclude(array) {
    this.allLiArrayId = [];
    this.allLi = this.searchTagContainer.querySelectorAll("li");
    this.allLi.forEach((li) => {
      const text = li.textContent.toLowerCase();
      array.forEach((recipe) => {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().match(text)) {
            if (!this.allLiArrayId.includes(li.id)) {
              this.allLiArrayId.push(li.id);
            }
          }
        }
        for (const ustensil of recipe.ustensils) {
          if (ustensil.toLowerCase().match(text)) {
            if (!this.allLiArrayId.includes(li.id)) {
              this.allLiArrayId.push(li.id);
            }
          }
        }
        if (recipe.appliance.toLowerCase().match(text)) {
          if (!this.allLiArrayId.includes(li.id)) {
            this.allLiArrayId.push(li.id);
          }
        }
      });
    });
    this.allLi.forEach((item) => {
      if (this.allLiArrayId.includes(item.id)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}
export { FilterTag };
