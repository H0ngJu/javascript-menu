import InputView from "./views/Inputview.js";
import { Console } from "@woowacourse/mission-utils";

class SystemController {
  #inputView;

  constructor() {
    this.#inputView = new InputView();
  }

  async start() {
    await this.handleMonthDay();
  }

  async handleMonthDay() {
    while (true) {
      try {
        const info = await this.#inputView.getMonthDay();
        this.#onCallModel.parseMonthDate(info);
        return info; // 유효한 경우 반환
      } catch (e) {
        Console.print(e); // 에러 메시지 출력
      }
    }
  }
}

export default SystemController;
