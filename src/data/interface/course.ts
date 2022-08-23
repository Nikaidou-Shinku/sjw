import { IScheduleGroup } from "./selected";

export interface ICourse {
  id: number;
  nameZh: string;
  nameEn: string | null;
  code: string;
  teachers: {
    id: number;
    nameZh: string;
    nameEn: string | null;
  }[];
  course: {
    id: number;
    nameZh: string;
    nameEn: string;
    code: string;
    credits: number;
    flag: string | null;
    department: {
      id: number;
      nameZh: string;
      nameEn: string;
      code: string;
      telephone: string | null;
    };
  };
  minorCourse: string | null;
  courseType: {
    id: number;
    nameZh: string;
    nameEn: string | null;
    code: string;
  };
  examMode: {
    id: number;
    nameZh: string;
    nameEn: string | null;
    code: string;
  };
  courseProperty: {
    id: number;
    nameZh: string;
    nameEn: string;
    code: string;
  };
  campus: {
    id: number;
    nameZh: string;
    nameEn: string;
  };
  limitCount: number;
  dateTimePlace: {
    textZh: string;
    textEn: string;
    text: string;
  };
  lessonKind: {
    id: number;
    nameZh: string;
    nameEn: string;
    code: string;
  };
  coursePackAssoc: string | null;
  selectionRemark: string | null;
  openDepartment: {
    id: number;
    nameZh: string;
    nameEn: string;
    code: string;
    telephone: string | null;
  };
  teachLang: string | null;
  totalPeriod: number;
  midtermRetake: boolean;
  compulsorys: string[];
  scheduleGroups: IScheduleGroup[];
  scheduleStartWeek: number;
  scheduleEndWeek: number;
  weekDays: number[];
}

export interface ITinyCourse {
  courseCode: string;
  courseId: number;
  courseName: string;
  id: number;
  lessonCode: string;
  lessonName: string;
  mcCodeName: string | null;
  openDepartment: string;
  teacherName: string;
}
