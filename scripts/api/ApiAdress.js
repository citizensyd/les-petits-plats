  // Redirect to correct address data
  const apiMotor = () => {
    const url = window.location.href;
    if (url.includes("citizensyd")) {
      return ("/les-petits-plats/data/recipe.json");
    } else {
      return ("/data/recipe.json");
    }
  }

  export { apiMotor }