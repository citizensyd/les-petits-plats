import { IngredientsApi } from "../api/Api.js";
import { AppareilsApi } from "../api/Api.js";
import { UstensilesApi } from "../api/Api.js";
import { handleSearchTagInput } from "./FilterTag.js";

// unscreen filter tag
const unscreenFilterTag = (
  identifiantSelected,
  identifiantMenu,
  idActive,
  idLi
) => {
  const listMenuSelected = document.querySelector(identifiantSelected);
  const listMenu = document.querySelector(identifiantMenu);
  const searchTagActive = document.querySelector(".search-tag-active");

  const removeFilterFromLi = (target) => {
    const idNumber = target.closest("li").id.substring(2);
    console.log(idNumber);
    console.log(idActive);
    console.log(`${idActive}${idNumber}`);
    const btnIn = searchTagActive.querySelector(`${idActive}${idNumber}`);
    btnIn.remove();
    listMenu.appendChild(target.closest("li"));
    target.remove();
  };

  const removeFilterFromActive = (target) => {
    const idNumber = target.closest("div").id.substring(5);
    console.log(idNumber);

    const btnIn = listMenuSelected.querySelector(`${idLi}${idNumber}`);
    btnIn.querySelector(".search-tag-menu-selected-cross").click();
  };

  const handleFilterRemoval = (event) => {
    const target = event.target;
    if (target.matches(".search-tag-menu-selected-cross")) {
      removeFilterFromLi(target);
    } else if (target.matches("img")) {
      removeFilterFromActive(target);
    }
  };

  listMenuSelected.addEventListener("click", handleFilterRemoval);
  searchTagActive.addEventListener("click", handleFilterRemoval);
};
unscreenFilterTag(
  "#ingredients-selected",
  "#ingredients-menu",
  "#btnIn",
  "#in"
);
unscreenFilterTag("#appareils-selected", "#appareils-menu", "#btnAp", "#ap");
unscreenFilterTag("#ustensiles-selected", "#ustensiles-menu", "#btnUs", "#us");

// Display active tag filter
const displayActiveFilter = (menu, selected, nameId) => {
  const listIngredients = document.querySelector(menu);
  listIngredients.addEventListener("click", (event) => {
    const searchTagMenuIngredientsSelected = document.querySelector(selected);
    const sectionFilter = document.querySelector(".search-tag-active");
    const searchTagActiveBtn = sectionFilter.querySelectorAll(
      ".search-tag-active-button"
    );
    const target = event.target;
    const searchTagActiveBtntextContents = Array.from(searchTagActiveBtn).map(
      (element) => element.textContent
    );
    if (!searchTagActiveBtntextContents.includes(target.textContent)) {
      const crossFilterSelected = document.createElement("img");
      crossFilterSelected.src = "../images/cross-round.svg";
      crossFilterSelected.alt = "Croix d'annulation du filtre sélectionné";
      crossFilterSelected.classList.add("search-tag-menu-selected-cross");
      searchTagMenuIngredientsSelected.appendChild(target);
      target.appendChild(crossFilterSelected);
      const nouvelElement = document.createElement("div");
      nouvelElement.classList.add("search-tag-active-button");
      nouvelElement.setAttribute("id", nameId + target.id.substring(2));
      const nouvelImage = document.createElement("img");
      nouvelImage.src = "../images/cross-filter.svg";
      nouvelImage.alt = "Croix d'annulation du filtre";
      nouvelElement.textContent = target.textContent;
      nouvelElement.appendChild(nouvelImage);
      sectionFilter.appendChild(nouvelElement);
    }
  });
};
displayActiveFilter("#ingredients-menu", "#ingredients-selected", "btnIn");
displayActiveFilter("#appareils-menu", "#appareils-selected", "btnAp");
displayActiveFilter("#ustensiles-menu", "#ustensiles-selected", "btnUs");

// Enlarge button tag with a delegation of event listener to toggle menu tag
const menuTag = () => {
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
        searchTagItems[
          index
        ].style.height = `${searchTagItems[index].scrollHeight}px`;
        target.style.transform = "rotate(180deg)";
        toggleIndex++;
      } else {
        searchTagItems[index].style.height = `${btn[index].scrollHeight}px`;
        target.style.transform = "rotate(0deg)";
        toggleIndex--;
      }
    }
  });
};
menuTag();

const inputCross = () => {
  const searchTagContainer = document.querySelector(".search-tag-container");

  searchTagContainer.addEventListener("input", (event) => {
    const clearIconTag = event.target
      .closest("div")
      .querySelector(".search-tag-clear-icon");
    clearIconTag.style.display = event.target.value ? "block" : "none";
  });

  searchTagContainer.addEventListener("click", (event) => {
    if (event.target.className === "search-tag-clear-icon") {
      const input = event.target
        .closest("div")
        .querySelector(".search-tag-filter");
      input.value = "";
      event.target.style.display = "none";
      console.log(event.target.closest("div"));
      const idMenu = event.target
        .closest("div")
        .querySelector("[id*=menu]");
      console.log(idMenu);
      handleSearchTagInput(event);
    }
  });
};
inputCross();

class DisplayListTag {
  constructor(menuSelector, api, idPrefix) {
    this.menuSelector = menuSelector;
    this.api = api;
    this.idPrefix = idPrefix;
  }

  async display() {
    const listTag = document.querySelector(this.menuSelector);
    const data = await this.api.getData();
    let idTagNumber = 1;
    data.forEach((element) => {
      const liTag = document.createElement("li");
      liTag.setAttribute("id", this.idPrefix + idTagNumber++);
      liTag.textContent = element;
      listTag.appendChild(liTag);
    });
  }
}

const displayListTagIngredient = new DisplayListTag(
  "#ingredients-menu",
  new IngredientsApi("/data/recipe.json"),
  "in"
);
displayListTagIngredient.display();

const displayListTagAppareils = new DisplayListTag(
  "#appareils-menu",
  new AppareilsApi("/data/recipe.json"),
  "ap"
);
displayListTagAppareils.display();

const displayListTagUstensiles = new DisplayListTag(
  "#ustensiles-menu",
  new UstensilesApi("/data/recipe.json"),
  "us"
);
displayListTagUstensiles.display();
