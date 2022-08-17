import { getTokens } from "./utils/getToken";
import { getCookie } from "./utils/getCookie";
import { fetchSelected } from "./utils/fetchSelected";
import { sleep } from "./utils/sleep";
import { getDOM } from "./utils/getDOM";
import { fetchNumber } from "./utils/fetchNumber";
import { ICourseSummary } from "./data/interface";

const main = async () => {
  const tokens = getTokens();
  if (tokens === null) {
    alert("脚本运行失败，请检查 URL 或尝试刷新重试！");
    return;
  }

  const cookie = getCookie();
  if (cookie === null) {
    alert("获取 Cookie 失败，请尝试刷新重试！");
    return;
  }

  const courses = await fetchSelected(tokens, cookie);

  let codeMap: { [code: string]: ICourseSummary } = { };
  courses.forEach((item) => codeMap[item.code] = item);

  await sleep(1000);
  const DOM = getDOM();

  setInterval(async () => {
    const numbers = await fetchNumber(courses, cookie);

    for (let i = 0; i < DOM.children.length; ++ i) {
      const child = DOM.children[i];

      const codeDOM = child.children[1].firstChild?.firstChild?.firstChild;
      if (codeDOM === null || typeof codeDOM === "undefined")
        continue;

      const code = codeDOM.textContent;
      if (code === null)
        continue;

      const nameDOM = child.firstChild?.firstChild?.childNodes[1].firstChild;
      if (nameDOM === null || typeof nameDOM === "undefined")
        continue;

      const course = codeMap[code.trim()];

      const num = numbers[course.id];
      const maxNum = course.maxNum;

      nameDOM.textContent = `(${num} / ${maxNum}) ${course.name}`;
    }
  }, 1000);
};

main();
