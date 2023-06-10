
class App {
  constructor() {
    this.PhotographerDataProvider = new PhotographerDataProvider();
  }

  async main() {
    console.log(window.location.href);
    const photographersData = await this.PhotographerDataProvider.photographers();
    displayPhotographerIndex(photographersData);
  }
}

const app = new App();
app.main();