import { Console } from "@woowacourse/mission-utils";
import { SYSTEM_MESSAGES } from "../constants/SystemMessage.js";

class OutputView {
  print_header() {
    Console.print(SYSTEM_MESSAGES.SHOW_RESULT_MESSAGE);
  }

  print_finish() {
    Console.print(SYSTEM_MESSAGES.FINISH_MESSAGE);
  }

  // 이거 체크하기 !!!!!!!!!!!!!!!!!!!
  print_category(arr) {
    Console.print(
      SYSTEM_MESSAGES.print_result_category(
        arr[0],
        arr[1],
        arr[2],
        arr[3],
        arr[4]
      )
    );
  }

  print_menu(name, arr) {
    Console.print(
      SYSTEM_MESSAGES.print_result_menu(
        name,
        arr[0],
        arr[1],
        arr[2],
        arr[3],
        arr[4]
      )
    );
  }
}

export default OutputView;
