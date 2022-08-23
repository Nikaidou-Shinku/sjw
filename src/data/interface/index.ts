import { IToken } from "./token";
import { ISchedule } from "./selected";

export { type IToken } from "./token";
export { type IStatus } from "./status";
export { type IScheduleGroup, type ISelected } from "./selected";
export { type INumber } from "./number";
export { type ICourse, type ITinyCourse } from "./course";

export interface IBaseData {
  tokens: IToken;
  cookie: string;
  semeId: number;
  title: string;
}

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
  pinned: boolean;
  schedules: ISchedule[];
}
