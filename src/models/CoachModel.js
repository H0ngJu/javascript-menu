import { SYSTEM_MESSAGES } from "../constants/SystemMessage.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessage.js";
import validators from "../utils/Validator.js";
import { Console } from "@woowacourse/mission-utils";
import { INFO } from "../constants/Info.js";
import OnCallInfo from "./OnCallInfo.js";

class OnCallModel {
  constructor(month) {
    this.month = month;
    this.onCallList = [];
  }

  updateMonth(value) {
    this.month = value;
  }

  getMonth() {
    return this.month;
  }
}

export default OnCallModel;
