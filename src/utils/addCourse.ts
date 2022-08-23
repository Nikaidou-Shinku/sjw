import { IResponse, IToken } from "../data/interface";

interface IAddResp {
  id: string;
  requestId: string;
  exception: string | null;
  errorMessage: {
    text: string;
    textEn: string;
    textZh: string;
  } | null;
  success: boolean;
  resend: boolean;
}

export const addCourse = async (
  tokens: IToken,
  cookie: string,
  courseId: number,
  cost: number,
) => {
  const pre = await fetch(
    "https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/add-request",
    {
      method: "POST",
      headers: {
        Authorization: cookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentAssoc: tokens.studentId,
        courseSelectTurnAssoc: tokens.turnId,
        requestMiddleDtos: [{
          lessonAssoc: courseId,
          virtualCost: cost,
        }],
        coursePackAssoc: null,
      }),
    },
  );
  if (pre.status !== 200)
    return "请求选课失败";

  const res: IResponse<string> = await pre.json();

  const resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/add-drop-response/${tokens.studentId}/${res.data}`,
    { headers: { Authorization: cookie } },
  );
  if (resp.status !== 200)
    return "获取选课状态失败";

  const data: IResponse<IAddResp> = await resp.json();

  if (data.data.success)
    return true;

  return data.data.errorMessage!.textZh;
};
