import { IngredientsApi } from "../api/Api.js";
import { AppareilsApi } from "../api/Api.js";
import { UstensilesApi } from "../api/Api.js";

const filterMenuItems = (element, input, searchTagItems) => {
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
    searchTagItems.style.height = "fit-content";
  });
};

//
const handleSearchTagInput = (event) => {
  let input;
  if (event.target.tagName === "INPUT") {
    input = event.target.value.trim();
    console.log(input);
  } else {
    input = event.target.closest("div").querySelector("input").value.trim();
  }
  const test = event.target.closest("div");
  const element = test.querySelectorAll("[id*=menu] li");
  const searchTagItems = event.target.closest(".search-tag-item");
  console.log(searchTagItems);
  filterMenuItems(element, input, searchTagItems);
};

const searchTagContainer = document.querySelector(".search-tag-container");
searchTagContainer.addEventListener("input", (event) => {
  handleSearchTagInput(event);
});

/* class filterTag {
  constructor() {
    this.IngredientsApi = new IngredientsApi("/data/recipe.json");
    this.AppareilsApi = new AppareilsApi("/data/recipe.json");
    this.UstensilesApi = new UstensilesApi("/data/recipe.json");
  }

   async arrayTagFilter() {
    this.IngredientsApi.getData
  }



}

new filterTag;

const searchTagContainer2 = document.querySelector(".search-tag-container");
console.log(searchTagContainer2);

const allLitagFilter = searchTagContainer2.querySelectorAll("li");
console.log(allLitagFilter);

const tagArray = [];

allLitagFilter.forEach(li, () => {
  tagArray.push(li);
});

console.log(tagArray); */

export { handleSearchTagInput };
