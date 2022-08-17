import { IToken } from "../data/interface";

const TOKEN_RE = /https:\/\/jwxt\.nwpu\.edu\.cn\/course-selection\/#\/course-select\/(\d+?)\/turn\/(\d+?)\/select/;

export const getTokens = (): IToken | null => {
  // 懒得配油猴这个 unsafeWindow 了
  // @ts-ignore
  const url: string = unsafeWindow.location.href;
  const tokens = TOKEN_RE.exec(url);

  if (tokens === null)
    return null;

  if (tokens.length < 3)
    return null;
  
  return {
    studentId: parseInt(tokens[1]),
    turnId: parseInt(tokens[2]),
  };
};
