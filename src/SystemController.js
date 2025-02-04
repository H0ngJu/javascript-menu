import { INFO } from "./constants/Info.js";
import CoachModel from "./models/CoachModel.js";
import MenuMdoel from "./models/MenuModel.js";
import InputView from "./views/Inputview.js";
import { Console } from "@woowacourse/mission-utils";
import OutputView from "./views/OutputView.js";

class SystemController {
  #inputView;
  #coachModel;
  #menuModel;
  #outputView;

  constructor() {
    this.#inputView = new InputView();
    this.#coachModel = new CoachModel();
    this.#menuModel = new MenuMdoel();
    this.#outputView = new OutputView();
  }

  async start() {
    this.#menuModel.parseMenu(); // 메뉴 파싱해놓고
    const coachInfo = await this.handleCoachList();
    const coachLength = coachInfo.length;
    await this.handleCoachDont(coachInfo);
    await this.handleCategory();
    await this.handleRecommend(coachLength);
    await this.handleOutput();
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
        //Console.print(this.#coachModel.getAllCoachInfo());
      }
    }
  }

  async handleEachRecommend(idx) {
    while (true) {
      const menu = await this.#menuModel.pickMenuOne(idx); // 카테고리에서 메뉴 하나 뽑음

      // 조건에 부합하지 않으면 루프 반복
      if (
        this.#coachModel.isDontMenu(menu, idx) ||
        this.#coachModel.isSameMenu(menu, idx)
      ) {
        continue;
      }

      return menu; // 조건을 충족하면 메뉴 반환
    }
  }

  async handleOutput() {
    this.#outputView.print_header();
    const coachInfo = this.#coachModel.getAllCoachInfo();
    const categoryList = this.#menuModel.getAllCategoryInfo();
    this.#outputView.print_category(categoryList);
    coachInfo.forEach((person) => {
      this.#outputView.print_menu(person.name, person.recommend);
    });
    // for (let i = 0; i < coachInfo.length; i++) {
    //   this.#outputView.print_menu(coachInfo[i].name, coachInfo[i].recommend);
    // }
    this.#outputView.print_finish();
  }
}

export default SystemController;
