import { ICourseSummary, IResponse, ISelected, IToken } from "../data/interface";
import { ISchedule } from "../data/interface/selected";

export const fetchSelected = async (tokens: IToken, cookie: string) => {
  const resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/selected-lessons/${tokens.turnId}/${tokens.studentId}`,
    { headers: { Authorization: cookie } },
  );
  const res: IResponse<ISelected[]> = await resp.json();

  let result: ICourseSummary[] = [];
  res.data.forEach((course) => {
    let teachers = "";
    course.teachers.forEach((teacher) => teachers += `${teacher.nameZh}, `);

    if (course.teachers.length > 0)
      teachers = teachers.substring(0, teachers.length - 2);

    let schedules: ISchedule[] = [];
    course.scheduleGroups.forEach((item) => {
      schedules = schedules.concat(item.schedules);
    });

    result.push({
      id: course.id,
      code: course.code,
      name: course.course.nameZh,
      teacher: teachers,
      dateTimePlace: course.dateTimePlace.textZh,
      cost: course.virtualCost,
      maxNum: course.limitCount,
      pinned: course.pinned,
      schedules,
    });
  });

  return result;
};
