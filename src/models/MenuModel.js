import { SYSTEM_MESSAGES } from "../constants/SystemMessage.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessage.js";
import validators from "../utils/Validaor.js";
import { Console, MissionUtils } from "@woowacourse/mission-utils";
import CoachInfo from "./CoachInfo.js";
import { INFO } from "../constants/Info.js";

class MenuModel {
  constructor(categoryList) {
    this.categoryList = [];
    this.menuList = [];
  }

  parseMenu() {
    for (let i = 0; i < 5; i++) {
      // 일단 5번 시행함
      const items = INFO[Object.keys(INFO)[i]].split(",");

      const trimmedItems = items.map((item) => item.trim());

      this.menuList.push(trimmedItems);
    }
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

  pickMenuOne(categoryIdx) {
    const menuLength = this.menuList[categoryIdx].length;
    const menuIdx = MissionUtils.Random.pickUniqueNumbersInRange(
      0,
      menuLength - 1,
      1
    );
    const menu = this.menuList[categoryIdx][menuIdx];
    return menu;
  }

  pickCategory() {
    const idx = MissionUtils.Random.pickUniqueNumbersInRange(0, 4, 1);
    return Object.keys(INFO)[idx];
  }

  getAllCategoryInfo() {
    return this.categoryList;
  }

  getAllMenuInfo() {
    return this.menuList;
  }
}

export default MenuModel;
