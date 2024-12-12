import SystemController from "./SystemController.js";

class App {
  #systemController;

  constructor() {
    this.#systemController = new SystemController();
  }
  async run() {
    await this.#systemController.start();
  }
}

export default App;
