import { Console } from "@woowacourse/mission-utils";
import { SYSTEM_MESSAGES } from "../constants/SystemMessage.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessage.js";
import validators from "../utils/Validaor.js";

class InputView {
  #readLine;

  constructor(readLine = Console.readLineAsync) {
    this.#readLine = readLine;
  }

  async getCoachList() {
    const value = await this.#readLine(SYSTEM_MESSAGES.GREETING);
    return value;
  }
}

export default InputView;
