import {
  ICourseSummary,
  IResponse,
  ISelected,
  IToken,
} from "../data/interface";

export const fetchSelected = async (
  {
    turnId,
    studentId,
  }: IToken,
  cookie: string,
) => {
  const resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/selected-lessons/${turnId}/${studentId}`,
    { headers: { "Authorization": cookie } },
  );
  const res: IResponse<ISelected[]> = await resp.json();

  let result: ICourseSummary[] = [];
  res.data.forEach((course) => {
    let teachers = "";
    course.teachers.forEach((teacher) => teachers += `${teacher.nameZh}, `);

    if (course.teachers.length > 0)
      teachers = teachers.substring(0, teachers.length - 2);

    result.push({
      id: course.id,
      code: course.code,
      name: course.course.nameZh,
      teacher: teachers,
      dateTimePlace: course.dateTimePlace.textZh,
      cost: course.virtualCost,
      maxNum: course.limitCount,
    });
  });

  return result;
};
