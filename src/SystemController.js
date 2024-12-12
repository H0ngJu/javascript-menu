import { INFO } from "./constants/Info.js";
import CoachModel from "./models/CoachModel.js";
import MenuMdoel from "./models/MenuModel.js";
import InputView from "./views/Inputview.js";
import { Console } from "@woowacourse/mission-utils";

class SystemController {
  #inputView;
  #coachModel;
  #menuModel;

  constructor() {
    this.#inputView = new InputView();
    this.#coachModel = new CoachModel();
    this.#menuModel = new MenuMdoel();
  }

  async start() {
    const coachInfo = await this.handleCoachList();
    await this.handleCoachDont(coachInfo);
    await this.handleCategory();
  }

  async handleCoachList() {
    try {
      const coachList = await this.#inputView.getCoachList();
      this.#coachModel.parseCoachList(coachList);
      //Console.print(this.#coachModel.getAllCoachInfo());
      return this.#coachModel.getAllCoachInfo();
    } catch (e) {
      Console.print(e.message); // 에러 메시지 출력
    }
  }

  // 이부분 주의 !!!!!!!!!!!!!!!!!!!!!!!!
  async handleCoachDont(coachInfo) {
    try {
      for (const person of coachInfo) {
        const coachDontList = await this.handleEachDont(person.name);
        this.#coachModel.parseCoachDontList(coachDontList, person.name);
      }
      //Console.print(this.#coachModel.getAllCoachInfo());
    } catch (e) {
      Console.print(e.message);
    }
  }

  async handleEachDont(name) {
    try {
      return await this.#inputView.getCoachDont(name);
    } catch (e) {
      Console.print(e.message);
    }
  }

  async handleCategory() {
    this.#menuModel.makeCategoryList();
    //Console.print(this.#menuModel.getAllCategoryInfo());
  }
}

export default SystemController;
