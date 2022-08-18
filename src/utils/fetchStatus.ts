import { IResponse, IStatus, IToken } from "../data/interface";

interface IStatusResp {
  semesterCreditUpperLimit: number;
  semesterCreditActual: number;
  totalCreditUpperLimit: number | null;
  totalCreditActual: number | null;
  semesterAmountUpperLimit: number | null;
  semesterAmountActual: number | null;
  totalAmountUpperLimit: number | null;
  totalAmountActual: number | null;
  virtualCostTotal: number;
  virtualCostSpent: number;
  courseTypeAmountLimits: string[];
  courseTypeCreditsLimits: {
    courseTypeName: string;
    creditUpperLimit: number;
    creditActual: number;
  }[];
  courseTypeTotalAmountLimits: string[];
  courseTypeTotalCreditsLimits: string[];
  courseSpecificFlagCreditLimits: string[];
  courseSpecificFlagTotalCreditLimits: string[];
  courseSpecificFlagAmountLimits: {
    courseSpecificFlag: string;
    amountUpperLimit: number;
    amountActual: number;
  }[];
  courseSpecificFlagTotalAmountLimits: string[];
}

export const fetchStatus = async (tokens: IToken, cookie: string) => {
  const resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/status/${tokens.turnId}/${tokens.studentId}`,
    { headers: { Authorization: cookie } },
  );
  const res: IResponse<IStatusResp> = await resp.json();
  return {
    nowCredit: res.data.semesterCreditActual,
    maxCredit: res.data.semesterCreditUpperLimit,
    nowCost: res.data.virtualCostSpent,
    maxCost: res.data.virtualCostTotal,
  } as IStatus;
};
