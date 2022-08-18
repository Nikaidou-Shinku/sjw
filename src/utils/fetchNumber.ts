import { ICourseSummary, INumber, IResponse } from "../data/interface";

export const fetchNumber = async (
  courses: ICourseSummary[],
  cookie: string,
) => {
  let url = "https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/std-count?lessonIds=";
  courses.forEach((course) => url += `${course.id},`);

  if (courses.length > 0)
    url = url.substring(0, url.length - 1);

  const resp = await fetch(url, { headers: { Authorization: cookie } });
  const res: IResponse<INumber> = await resp.json();

  let result: { [id: number]: number; } = { };

  for (const key in res.data) {
    const tmp = res.data[key];
    result[key] = parseInt(tmp.substring(0, tmp.length - 2));
  }

  return result;
};
