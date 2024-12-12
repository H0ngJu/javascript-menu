import { ERROR_MESSAGES } from "../constants/ErrorMessage.js";
import { Console } from "@woowacourse/mission-utils";

const validators = {
  checkMonthInput(input) {
    const month = parseInt(input, 10);
    if (isNaN(parseFloat(input)) || month < 1 || month > 12) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT); // 유효하지 않은 월
    }
  },

  checkDateInput(input) {
    const arr = ["월", "화", "수", "목", "금", "토", "일"];
    if (!arr.includes(input)) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT); // 유효하지 않은 요일
    }
  },

  checkNameLength(name) {
    if (name.length > 5) {
      //Console.print("이름 수 이상");
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  },

  checkListLength(arr) {
    if (arr.length < 5 || arr.length > 35) {
      //Console.print(arr.length);
      //Console.print("명 수 이상");
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  },
};

export default validators;
