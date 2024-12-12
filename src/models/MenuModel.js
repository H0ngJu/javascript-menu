import { SYSTEM_MESSAGES } from "../constants/SystemMessage.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessage.js";
import validators from "../utils/Validaor.js";
import { Console, MissionUtils } from "@woowacourse/mission-utils";
import CoachInfo from "./CoachInfo.js";
import { INFO } from "../constants/Info.js";

class MenuModel {
  constructor(categoryList) {
    this.categoryList = [];
  }

  makeCategoryList() {
    while (this.categoryList.length < 6) {
      const categoryIdx = this.pickCategory();
      const count = this.categoryList.filter(
        (idx) => idx === categoryIdx
      ).length;
      if (count < 2) {
        //같은 카테고리는 2번만
        this.categoryList.push(categoryIdx);
      }
    }
  }

  pickCategory() {
    const idx = MissionUtils.Random.pickUniqueNumbersInRange(0, 4, 1);
    return Object.keys(INFO)[idx];
  }

  getAllCategoryInfo() {
    return this.categoryList;
  }
}

export default MenuModel;
