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
  res.data.forEach((course) => result.push({
    id: course.id,
    code: course.code,
    maxNum: course.limitCount,
    name: course.course.nameZh,
  }));

  return result;
};
