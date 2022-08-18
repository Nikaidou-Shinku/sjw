import { IResponse, IToken } from "../data/interface";

interface IPreDropResp {
  id: string;
  requestId: string;
  exception: string | null;
  errorMessage: {
    text: string;
    textEn: string;
    textZh: string;
  } | null;
  success: boolean;
  result: {
    [id: number]: string | null;
  };
}

interface IDropResp {
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

export const dropCourse = async (courseId: number, tokens: IToken, cookie: string) => {
  const pre = await fetch(
    "https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/drop-predicate",
    {
      method: "POST",
      headers: {
        Authorization: cookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentAssoc: tokens.studentId,
        courseSelectTurnAssoc: tokens.turnId,
        lessonAssocSet: [courseId],
      }),
    },
  );
  if (pre.status !== 200)
    return "预退课请求失败";

  const pre_res: IResponse<string> = await pre.json();

  const pre_resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/predicate-response/${tokens.studentId}/${pre_res.data}`,
    { headers: { Authorization: cookie } },
  );
  if (pre_resp.status !== 200)
    return "获取预退课状态失败";

  const pre_data: IResponse<IPreDropResp> = await pre_resp.json();
  if (!pre_data.data.success)
    return pre_data.data.errorMessage!.textZh;

  const resp = await fetch(
    "https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/drop-request",
    {
      method: "POST",
      headers: {
        Authorization: cookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentAssoc: tokens.studentId,
        courseSelectTurnAssoc: tokens.turnId,
        lessonAssocs: [courseId],
        coursePackAssoc: null, // I didn't know what this is :(
      }),
    },
  );
  if (resp.status !== 200)
    return "请求退课失败";

  const res: IResponse<string> = await resp.json();

  const data_resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/add-drop-response/${tokens.studentId}/${res.data}`,
    { headers: { Authorization: cookie } },
  );
  if (data_resp.status !== 200)
    return "获取退课状态失败";

  const data: IResponse<IDropResp> = await data_resp.json();
  if (data.data.success)
    return true;

  return data.data.errorMessage!.textZh;
};
