export { type IToken } from "./token";
export { type ISelected } from "./selected";
export { type INumber } from "./number";

export interface IResponse<T> {
  result: number;
  message: string | null;
  data: T;
}

export interface ICourseSummary {
  id: number;
  code: string;
  maxNum: number;
  name: string;
}
