import { Console } from "@woowacourse/mission-utils";
import { SYSTEM_MESSAGES } from "../constants/SystemMessage.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessages.js";
import validators from "../utils/Validator.js";

class OutputView {
  printOrderList(orderList, date) {
    Console.print(SYSTEM_MESSAGES.pirntDateMessage(date));
    Console.print(SYSTEM_MESSAGES.ORDER_LIST_MESSAGE);
    // 각 주문 항목 출력
    orderList.forEach((order) => {
      const message = SYSTEM_MESSAGES.printOrderMessage(
        order.name,
        order.quantity
      );
      Console.print(message);
    });
  }

  printBeforeBenefit(value) {
    Console.print(SYSTEM_MESSAGES.BEFORE_BENEFIT_PRICE_MESSAGE);
    Console.print(SYSTEM_MESSAGES.printBeforeBenefitPrice(value));
  }
}

export default OutputView;
