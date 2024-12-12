export const SYSTEM_MESSAGES = Object.freeze({
  GREETING:
    "점심 메뉴 추천을 시작합니다.\n코치의 이름을 입력해 주세요. (, 로 구분)\n",
  SHOW_RESULT_MESSAGE:
    "메뉴 추천 결과입니다.\n[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]",
  FINISH_MESSAGE: "\n추천을 완료했습니다.",

  get_coach_dont_eat(name) {
    return `\n${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`;
  },

  print_result_category(a, b, c, d, e) {
    return `[ 카테고리 | ${a} | ${b} | ${c} | ${d} | ${e} ]`;
  },

  print_result_menu(name, a, b, c, d, e) {
    return `[ ${name} | ${a} | ${b} | ${c} | ${d} | ${e} ]`;
  },
});
