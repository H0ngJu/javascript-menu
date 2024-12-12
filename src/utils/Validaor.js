import { ERROR_MESSAGES } from "../constants/ErrorMessage.js";
import { Console } from "@woowacourse/mission-utils";

const validators = {
  checkMonthInput(input) {
    const month = parseInt(input, 10);
    if (isNaN(parseFloat(input)) || month < 1 || month > 12) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT); // 유효하지 않은 월
    }
  },

  checkNameLength(name) {
    if (name.length > 4 || name.length < 2) {
      //Console.print("이름 수 이상");
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  },

  checkCoachListLength(arr) {
    if (arr.length < 2) {
      //Console.print(arr.length);
      //Console.print("명 수 이상");
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  },

  checkCoachDontListLength(arr) {
    if (arr.length > 2) {
      //Console.print(arr.length);
      Console.print("메뉴 수 이상");
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  },
};

export default validators;
