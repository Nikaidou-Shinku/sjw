import { IBaseData } from "../data/interface";
import { getTokens } from "./getTokens";
import { getCookie } from "./getCookie";
import { fetchMeta } from "./fetchMeta";

export const init = async (): Promise<string | IBaseData> => {
  const tokens = getTokens();
  if (tokens === null) {
    return "获取 Tokens 失败，请检查 URL 或刷新重试！";
  }

  const cookie = getCookie();
  if (cookie === null) {
    return "获取 Cookie 失败，请刷新重试！";
  }

  const meta = await fetchMeta(tokens, cookie);
  if (typeof meta === "string") {
    return meta;
  }

  return {
    tokens,
    cookie,
    semeId: meta.semester.id,
    title: meta.turn.name,
  };
};

export { fetchStatus } from "./fetchStatus";
export { fetchSelected } from "./fetchSelected";
export { fetchNumber } from "./fetchNumber";
export { changeCost } from "./changeCost";
export { dropCourse } from "./dropCourse";
export { fetchCourses } from "./fetchCourses";
export { searchCourse } from "./searchCourse";
export { addCourse } from "./addCourse";
