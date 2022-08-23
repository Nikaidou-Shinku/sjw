interface ICampus {
  id: number;
  nameEn: string;
  nameZh: string;
}

interface IDepartment {
  code: string;
  id: number;
  nameEn: string;
  nameZh: string;
  telephone: string | null;
}

interface ICourse {
  code: string;
  credits: number;
  department: IDepartment;
  flag: string | null;
  id: number;
  nameEn: string;
  nameZh: string;
}

interface IExam {
  code: string;
  id: number;
  nameEn: string | null;
  nameZh: string;
}

interface IDateTimePlace {
  text: string;
  textEn: string;
  textZh: string;
}

export interface ISchedule {
  endUnit: number;
  entTime: number;
  lessonId: number;
  scheduleGroupId: number;
  startTime: number;
  startUnit: number;
  weekday: number;
}

interface IScheduleGroup {
  dateTimePlace: IDateTimePlace;
  default: boolean;
  id: number;
  limitCount: number;
  no: number;
  schedules: ISchedule[];
}

interface ITeacher {
  id: number;
  nameEn: string | null;
  nameZh: string;
}

export interface ISelected {
  campus: ICampus;
  code: string;
  compulsorys: string[];
  course: ICourse;
  coursePackAssoc: string | null;
  coursePackLessonAssocs: string[];
  courseProperty: string | null;
  courseType: {
    code: string;
    id: number;
    nameEn: string | null;
    nameZh: string;
  };
  dateTimePlace: IDateTimePlace;
  examMode: IExam;
  id: number;
  lessonKind: {
    code: string;
    id: number;
    nameEn: string;
    nameZh: string;
  };
  limitCount: number;
  midtermRetake: boolean;
  minorCourse: string | null;
  nameEn: string | null;
  nameZh: string;
  needAttend: boolean;
  openDepartment: IDepartment;
  pinned: boolean;
  retake: boolean;
  scheduleGroupAssoc: string | null;
  scheduleGroups: IScheduleGroup[];
  selectionRemark: string | null;
  setup: boolean;
  substituteBuild: boolean;
  substituteCourseAssoc: string | null;
  teachLang: string | null;
  teachers: ITeacher[];
  totalPeriod: number;
  virtualCost: number;
}
