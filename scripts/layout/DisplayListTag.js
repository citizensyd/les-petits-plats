import { IngredientsApi } from "../api/Api.js";
import { AppareilsApi } from "../api/Api.js";
import { UstensilesApi } from "../api/Api.js";
import { apiMotor } from "../api/ApiAdress.js";

//Creation of all li element for one menu
class DisplayListTag {
  constructor(recipeInstance, filterTagInstance) {
    this.index = 0;
    this.menuTag();
    this.apiAdress = null;
    this.inputCross();
    this.apiAdress = apiMotor();
    this.recipesClass = recipeInstance;
    this.filterTagInstance = filterTagInstance;

    this.displayListTag();
    this.activeFilter();
  }

  // Display active tag filter
  displayActiveFilter(menu, selected, nameId) {
    const listIngredients = document.querySelector(menu);
    listIngredients.addEventListener("click", (event) => {
      const searchTagMenuIngredientsSelected = document.querySelector(selected);
      const sectionFilter = document.querySelector(".search-tag-active");
      const searchTagActiveBtn = sectionFilter.querySelectorAll(".search-tag-active-button");
      if (searchTagActiveBtn.length === 0) {
        this.index = 0;
      }
      const target = event.target;
      const searchTagActiveBtntextContents = Array.from(searchTagActiveBtn).map((element) => element.textContent);
      if (!searchTagActiveBtntextContents.includes(target.textContent)) {
        const crossFilterSelected = document.createElement("img");
        crossFilterSelected.src = "images/cross-round.svg";
        crossFilterSelected.alt = "Croix d'annulation du filtre sélectionné";
        crossFilterSelected.classList.add("search-tag-menu-selected-cross");
        searchTagMenuIngredientsSelected.appendChild(target);
        target.appendChild(crossFilterSelected);
        const nouvelElement = document.createElement("div");
        nouvelElement.classList.add("search-tag-active-button");
        nouvelElement.setAttribute("id", this.index++ + nameId + target.id.substring(2));
        const nouvelImage = document.createElement("img");
        nouvelImage.src = "images/cross-filter.svg";
        nouvelImage.alt = "Croix d'annulation du filtre";
        nouvelImage.classList.add("search-tag-active-button-cross");

        nouvelElement.textContent = target.textContent;
        nouvelElement.appendChild(nouvelImage);
        sectionFilter.appendChild(nouvelElement);
      }
      this.recipesClass.filterTagDisplayRecipes();
    });
  }

  activeFilter() {
    this.displayActiveFilter("#ingredients-menu", "#ingredients-selected", "btnIn");
    this.displayActiveFilter("#appareils-menu", "#appareils-selected", "btnAp");
    this.displayActiveFilter("#ustensiles-menu", "#ustensiles-selected", "btnUs");
  }

  // Enlarge button tag with a delegation of event listener to toggle menu tag
  menuTag() {
    let toggleIndex = 0;
    const searchTagItems = document.querySelectorAll(".search-tag-item");
    const btnContainer = document.querySelector(".search-tag-container");
    const btn = document.querySelectorAll(".search-tag-button");
    const btnDrop = btnContainer.querySelectorAll(".search-tag-toggle");

    btnContainer.addEventListener("click", (event) => {
      const target = event.target;

      if (target.matches(".search-tag-toggle")) {
        const index = Array.from(btnDrop).indexOf(target);
        if (toggleIndex === 0) {
          searchTagItems[index].style.height = "fit-content" /* `${searchTagItems[index].scrollHeight}px` */;
          target.style.transform = "rotate(180deg)";
          toggleIndex++;
        } else {
          searchTagItems[index].style.height = `${btn[index].scrollHeight}px`;
          target.style.transform = "rotate(0deg)";
          toggleIndex--;
        }
      }
    });
  }

  // Insert delete cross in menu input
  inputCross() {
    const searchTagContainer = document.querySelector(".search-tag-container");

    searchTagContainer.addEventListener("input", (event) => {
      const clearIconTag = event.target.closest("div").querySelector(".search-tag-clear-icon");
      clearIconTag.style.display = event.target.value ? "block" : "none";
    });

    searchTagContainer.addEventListener("click", (event) => {
      if (event.target.className === "search-tag-clear-icon") {
        const input = event.target.closest("div").querySelector(".search-tag-filter");
        input.value = "";
        event.target.style.display = "none";
        const idMenu = event.target.closest("div").querySelector("[id*=menu]");
        this.filterTag.handleSearchTagInput(event);
      }
    });
  }

  async display(menuSelector, api, idPrefix) {
    const listTag = document.querySelector(menuSelector);
    const data = await api.getData();
    let idTagNumber = 1;
    data.forEach((element) => {
      const liTag = document.createElement("li");
      liTag.setAttribute("id", idPrefix + idTagNumber++);
      liTag.textContent = element;
      listTag.appendChild(liTag);
    });
  }

  // initialization of li element of each menu
  displayListTag() {
    this.display("#ingredients-menu", new IngredientsApi(this.apiAdress), "in");
    this.display("#appareils-menu", new AppareilsApi(this.apiAdress), "ap");
    this.display("#ustensiles-menu", new UstensilesApi(this.apiAdress), "us");
  }
}

export { DisplayListTag };
