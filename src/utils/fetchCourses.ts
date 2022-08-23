import { ICourse, IResponse, IToken } from "../data/interface";

interface ICoursesResp {
  lessons: ICourse[];
  pageInfo: {
    currentPage: string;
    rowsInPage: string;
    rowsPerPage: string;
    totalPages: string;
    totalRows: string;
  };
  sort__: {
    field: string;
    type: string;
  };
}

export const fetchCourses = async (
  tokens: IToken,
  cookie: string,
  semesterId: number,
  courseName: string,
  lessonName: string,
  teacherName: string,
  idList: number[],
): Promise<ICourse[] | string> => {
  const resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/query-lesson/${tokens.studentId}/${tokens.turnId}`,
    {
      method: "POST",
      headers: {
        Authorization: cookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        turnId: tokens.turnId,
        studentId: tokens.studentId,
        semesterId,
        pageNo: 1,
        pageSize: 20,
        courseNameOrCode: courseName,
        lessonNameOrCode: lessonName,
        teacherNameOrCode: teacherName,
        week: "",
        grade: "",
        departmentId: "",
        majorId: "",
        adminclassId: "",
        // 校区：
        // "": 全部
        // 2: 友谊校区
        // 3: 长安校区
        // 24: 太仓实习实践基地
        campusId: "",
        openDepartmentId: "",
        courseTypeId: "",
        coursePropertyId: "",
        canSelect: null,
        _canSelect: "",
        creditGte: null,
        creditLte: null,
        hasCount: null,
        ids: idList,
        substitutedCourseId: null,
        courseSubstitutePoolId: null,
        sortField: "course",
        sortType: "ASC",
      }),
    },
  );
  if (resp.status !== 200) {
    return "请求课程列表失败";
  }

  const res: IResponse<ICoursesResp> = await resp.json();

  return res.data.lessons;
};
