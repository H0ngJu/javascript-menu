import { SYSTEM_MESSAGES } from "../constants/SystemMessage.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessage.js";
import validators from "../utils/Validaor.js";
import { Console } from "@woowacourse/mission-utils";
import CoachInfo from "./CoachInfo.js";

class CoachModel {
  constructor(month) {
    this.month = month;
    this.coachList = [];
  }

  updateMenu(menu, idx) {
    //Console.print(`recommend 넣기 전 ${this.coachList[idx].recommend}`);
    this.coachList[idx].recommend.push(menu);
    //Console.print(`recommend 넣은 후 ${this.coachList[idx].recommend}`);
  }

  parseCoachList(arr) {
    try {
      const items = arr.split(","); // ','로 코치 분리
      validators.checkCoachListLength(items); // 명수 확인
      const seenNames = new Set(); // 중복 체크 용 set
      this.coachList = items.map((item) => {
        const name = item;
        const trimmedName = name.trim(); // 이름의 공백 제거

        validators.checkNameLength(name); // 이름 길이 확인
        this.hasDuplicateName(trimmedName, seenNames); // 중복된 이름 있는지 확인

        return new CoachInfo(name, [], []);
      });
    } catch (e) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  }
  parseCoachDontList(arr, coachName) {
    try {
      const items = arr.split(",").map((item) => item.trim()); // ','로 분리하고 공백 제거
      validators.checkCoachDontListLength(items); // 메뉴 수 확인

      const seenNames = new Set(); // 중복 체크 용 set
      items.forEach((item) => {
        if (seenNames.has(item)) {
          throw new Error(`[ERRPR] 중복된 이름이 있습니다.`);
        }
        seenNames.add(item);
      });

      const coach = this.coachList.find((person) => person.name === coachName);

      coach.dont.push(...items); // 배열에 요소를 추가
    } catch (e) {
      throw new Error(e);
    }
  }

  hasDuplicateName(name, seenNames) {
    // 중복된 이름이 있으면 에러 발생
    if (seenNames.has(name)) {
      //Console.print("중복된 이름 있음");
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    seenNames.add(name); // Set에 이름 추가
  }

  isDontMenu(menu, idx) {
    //Console.print(this.coachList[idx]);
    //Console.print(this.coachList[idx].dont);
    if (this.coachList[idx].dont.includes(menu)) {
      return true;
    }
    return false;
  }

  isSameMenu(menu, idx) {
    if (this.coachList[idx].recommend.includes(menu)) {
      return true;
    }
    return false;
  }

  getAllCoachInfo() {
    return this.coachList;
  }
}

export default CoachModel;
