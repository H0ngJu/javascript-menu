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
    this.#menuModel.parseMenu(); // 메뉴 파싱해놓고
    const coachInfo = await this.handleCoachList();
    const coachLength = coachInfo.length;
    await this.handleCoachDont(coachInfo);
    await this.handleCategory();
    await this.handleRecommend(coachLength);
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

  async handleRecommend(coachLength) {
    for (let i = 0; i < 5; i++) {
      // 일단 5번 시행함
      for (let j = 0; j < coachLength; j++) {
        const menu = await this.handleEachRecommend(j); // 해당 요일 일자에 대해서
        // 메뉴를 코치에게 전달한다.
        //Console.print(`==========${menu}`);
        this.#coachModel.updateMenu(menu, j);
        Console.print(this.#coachModel.getAllCoachInfo());
      }
    }
  }

  async handleEachRecommend(idx) {
    const menu = await this.#menuModel.pickMenuOne(idx); // 카테고리에서 메뉴 하나 뽑음
    // 중복되지도 않고, 못먹는 메뉴가 아니라면 메뉴를 반환한다.
    if (this.#coachModel.isDontMenu(menu, idx)) {
      this.handleEachRecommend(idx); // 다시 요청한다.
    }

    if (this.#coachModel.isSameMenu(menu, idx)) {
      this.handleEachRecommend(idx); // 다시 요청한다.
    }

    return menu;
  }
}

export default SystemController;
