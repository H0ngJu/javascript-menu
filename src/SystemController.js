import CoachModel from "./models/CoachModel.js";
import InputView from "./views/Inputview.js";
import { Console } from "@woowacourse/mission-utils";

class SystemController {
  #inputView;
  #coachModel;

  constructor() {
    this.#inputView = new InputView();
    this.#coachModel = new CoachModel();
  }

  async start() {
    await this.handleCoachList();
  }

  async handleCoachList() {
    try {
      const coachList = await this.#inputView.getCoachList();
      this.#coachModel.parseCoachList(coachList);
      Console.print(this.#coachModel.getAllCoachInfo());
    } catch (e) {
      Console.print(e.message); // 에러 메시지 출력
    }
  }
}

export default SystemController;
