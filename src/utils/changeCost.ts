import { IResponse, IToken } from "../data/interface";

interface CostResp {
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

export const changeCost = async (
  courseId: number,
  cost: number,
  tokens: IToken,
  cookie: string,
) => {
  const pre = await fetch(
    "https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/update-virtualcost",
    {
      method: "POST",
      headers: {
        Authorization: cookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonAssoc: courseId,
        virtualCost: cost,
        studentAssoc: tokens.studentId,
        courseSelectTurnAssoc: tokens.turnId,
      }),
    },
  );
  if (pre.status !== 200)
    return "请求修改意愿值失败";

  const res: IResponse<string> = await pre.json();

  const resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/update-virtualcost/${tokens.studentId}/${res.data}`,
    { headers: { Authorization: cookie } },
  );
  if (resp.status !== 200)
    return "获取意愿值状态失败";

  const data: IResponse<CostResp> = await resp.json();

  if (data.data.success)
    return true;

  return data.data.errorMessage!.textZh;
};
