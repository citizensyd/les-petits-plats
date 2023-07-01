class UnscreenFilterTag {
  constructor(recipeInstance) {
    this.idActive = null;
    this.idLi = null;
    this.listMenuSelected = null;
    this.listMenuSelectedElement = null;
    this.listMenu = null;
    this.listMenuElement = null;
    this.target = null;
    this.liSelected = null;
    this.idNumber = null;
    this.index = null;
    this.searchTagActive = document.querySelector(".search-tag-active");
    this.searchTagContainer = document.querySelector(".search-tag-container");
    this.handleFilterRemoval = this.handleFilterRemoval.bind(this);
    this.searchTagContainer.addEventListener("click", this.handleFilterRemoval);
    this.searchTagActive.addEventListener("click", this.handleFilterRemoval);
    this.recipesClass = recipeInstance;
  }

  renameFilterTagButton() {
    const searchTagActiveBtn = this.searchTagActive.querySelectorAll(".search-tag-active-button");
    if (searchTagActiveBtn.length === 0) {
      this.recipesClass.slicePrecedentArray();
    } else {
      if (searchTagActiveBtn.length === 1) {
        const indexButtonOne = 0;
        searchTagActiveBtn[0].setAttribute("id", indexButtonOne + searchTagActiveBtn[0].id.substring(1));
        this.recipesClass.slicePrecedentArray();
      } else {
        searchTagActiveBtn.forEach((element, index) => {
          element.id = index + element.id.substring(1);
        });
        this.recipesClass.slicePrecedentArray();
      }
    }
  }

  removeFilterFromLi() {
    this.idNumber = this.target.closest("li").id.substring(2);
    const allButtonFilter = Array.from(this.searchTagActive.querySelectorAll(".search-tag-active-button"));
    const filteredButton = allButtonFilter.find((button) => button.id.includes(`${this.idActive}${this.idNumber}`));
    this.index = filteredButton.id.substring(0, 1);
    filteredButton.remove();
    this.listMenu.appendChild(this.target.closest("li"));
    this.target.remove();
    this.renameFilterTagButton();
  }

  removeFilterFromActive() {
    this.liSelected.querySelector(".search-tag-menu-selected-cross").click();
  }

  definedIdActiveIdLi() {
    if (this.listMenu.id === "ingredients-menu") {
      this.idActive = "btnIn";
      this.idLi = "in";
    } else if (this.listMenu.id === "appareils-menu") {
      this.idActive = "btnAp";
      this.idLi = "ap";
    } else if (this.listMenu.id === "ustensiles-menu") {
      this.idActive = "btnUs";
      this.idLi = "us";
    }
    this.removeFilterFromLi();
  }

  definedLi() {
    const menu = this.target.closest("div").id.substring(4, 6);
    this.idNumber = this.target.closest("div").id.substring(6);
    const menuLiNumber = (menu + this.idNumber).toLowerCase();
    this.liSelected = this.searchTagContainer.querySelector(`#${menuLiNumber}`);
    this.removeFilterFromActive();
  }

  handleFilterRemoval(event) {
    this.target = event.target;
    if (this.target.matches(".search-tag-menu-selected-cross")) {
      this.listMenuSelected = this.target.closest("div").querySelector(".search-tag-menu-selected");
      this.listMenu = this.target.closest("div").querySelector(".search-tag-menu");
      this.definedIdActiveIdLi();
    } else if (this.target.matches(".search-tag-active-button-cross")) {
      this.definedLi();
    }
  }
}
export { UnscreenFilterTag };