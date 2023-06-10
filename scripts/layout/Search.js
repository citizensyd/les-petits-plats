
const clearInput = () => {
const inputElement = document.getElementById("search-input");
const clearIcon = document.querySelector(".clear-icon");
const searchButtonImage = document.getElementById("search-button-image");

inputElement.addEventListener("input", () => {
  clearIcon.style.display = inputElement.value ? "inline-block" : "none";
});

clearIcon.addEventListener("click", () => {
  inputElement.value = "";
  clearIcon.style.display = "none";
});
}
clearInput();