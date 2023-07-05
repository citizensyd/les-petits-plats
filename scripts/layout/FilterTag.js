import { validateInput, escapeHtml } from "../utils/Security.js";

class FilterTag {
  constructor(recipes) {
    this.searchTagContainer = document.querySelector(".search-tag-container");
    this.allLiArrayIdInitial = null;
    this.allLi = null;
    this.allLiArrayId = [];
    this.allElement = [];
    this.element = null;
    this.escapedInput = null;
    this.previousElement = null;
    this.result = recipes;
    this.input = null;
    this.filteredArrayId = null;
    this.handleSearchTagInput();
  }

  // Unscreen element li in menu tag if no include in input
  filterMenuItems(element, input) {
    const filter = input.toLowerCase();
    console.log(element);
    console.log(filter);
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
  
 // Check the input value for security and content
  checkInput(event) {
    this.input = event.target.value.trim();
    console.log(this.input);
    console.log(this.input.length);
    const test = event.target.closest("div");
    const imgLoop = test.querySelector(".search-tag-loop");
    const inputTag = test.querySelector("input");
    if (this.input.length === 0) {
      inputTag.style.borderColor = '';
      imgLoop.src = "images/loop-small.svg";
      return true;
    } else {
      const isValid = validateInput(this.input);
      this.escapedInput = escapeHtml(this.input);
      if (!isValid) {
        inputTag.style.borderColor = "#DD1C1A";
        imgLoop.src = "images/loop-small-red.svg";
        return false;
      }
      return true;
    }
  }

  // Filters an array of items based on a condition
  filterAllLiArrayId(event, array) {
    const test = event.target.closest("div");
    const liId = test.querySelector("li:first-child").id;
    const nameLi = liId.slice(0, 2);
    return array.filter((item) => item.id.includes(nameLi));
  }

  // Select correct input menu and send to unscreen li
  handleSearchTagInput() {
    this.searchTagContainer.addEventListener("input", (event) => {
      if (this.checkInput(event)) {
        if (this.allLiArrayId.length > 0) {
          console.log(this.filteredArrayId);
          this.filteredArrayId = this.filterAllLiArrayId(event, this.allLiArrayId);
        } else {
          this.allLiArrayIdInitial = Array.from(
            this.searchTagContainer.querySelectorAll("#ingredients-menu li, #appareils-menu li, #ustensiles-menu li")
          );
          console.log(this.allLiArrayIdInitial);
          this.filteredArrayId = this.filterAllLiArrayId(event, this.allLiArrayIdInitial);
        }
        this.filterMenuItems(this.filteredArrayId, this.input);
      }
    });
  }

  // Unscreen element li in menu tag if no include in input
  filterMenuItemsExclude(array) {
    this.result = array;
    console.log(this.result);
    this.allLiArrayId = [];
    this.allLi = this.searchTagContainer.querySelectorAll("li");
    this.allLi.forEach((li) => {
      const text = li.textContent.toLowerCase();
      array.forEach((recipe) => {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().match(text)) {
            if (!this.allLiArrayId.includes(li)) {
              this.allLiArrayId.push(li);
            }
          }
        }
        for (const ustensil of recipe.ustensils) {
          if (ustensil.toLowerCase().match(text)) {
            if (!this.allLiArrayId.includes(li)) {
              this.allLiArrayId.push(li);
            }
          }
        }
        if (recipe.appliance.toLowerCase().match(text)) {
          if (!this.allLiArrayId.includes(li)) {
            this.allLiArrayId.push(li);
          }
        }
      });
    });
    this.allLi.forEach((item) => {
      if (this.allLiArrayId.includes(item)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}
export { FilterTag };
