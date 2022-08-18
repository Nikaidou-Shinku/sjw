export { type IToken } from "./token";
export { type ISelected } from "./selected";
export { type INumber } from "./number";
export { type IStatus } from "./status";

export interface IResponse<T> {
  result: number;
  message: string | null;
  data: T;
}

export interface ICourseSummary {
  id: number;
  code: string;
  name: string;
  teacher: string;
  dateTimePlace: string;
  cost: number;
  maxNum: number;
}
