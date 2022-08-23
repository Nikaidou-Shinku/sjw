import { IResponse, IToken } from "../data/interface";

interface IMetaResp {
  packCourseSelect: boolean;
  retakeDisallow: boolean;
  retakeExclusiveAllow: boolean;
  substituteCourseRetake: boolean;
  retakePassedDisallow: boolean;
  conflictAgreeNotAttend: boolean;
  turn: {
    id: number;
    bizTypeAssoc: number;
    semesterAssoc: number;
    turnMode: {
      enablePreSelect: boolean;
      enableDelayRelease: boolean;
      enableVirtualWallet: boolean;
      showCount: boolean;
      enableStudentPreset: boolean;
      showMidtermRetake: boolean;
    };
    turnTab: {
      showPlanTab: boolean;
      planTabName: string;
      showPublicCourseTab: boolean;
      publicCourseTabName: string;
      showAcrossMajorTab: boolean;
      acrossMajorTabName: string | null;
      showRetakeTab: boolean;
      retakeTabName: string | null;
      showAllCourseTab: boolean;
      showSelectedTab: boolean;
    };
    name: string;
    bulletin: string;
    topCourseSpecificFlags: string[];
    transient: boolean;
  };
  bizTypeId: number;
  semester: {
    id: number;
    nameZh: string;
    nameEn: string;
    season: string;
  };
  timeTableLayoutId: number;
  campusId: number;
  semesterAmountUpperLimit: boolean;
  semesterCreditUpperLimit: boolean;
  totalAmountUpperLimit: boolean;
  totalCreditUpperLimit: boolean;
  semesterCourseTypeAmountUpperLimit: boolean;
  semesterCourseTypeCreditUpperLimit: boolean;
  totalCourseTypeAmountUpperLimit: boolean;
  totalCourseTypeCreditUpperLimit: boolean;
  unSignedPermission: boolean;
  programCompletionPreview: boolean;
  programCompletionPreviewUrl: string;
  showRetakeCount: boolean;
  semesterCourseFlagAmountUpperLimit: boolean;
  semesterCourseFlagCreditUpperLimit: boolean;
  totalCourseFlagAmountUpperLimit: boolean;
  totalCourseFlagCreditUpperLimit: boolean;
}

export const fetchMeta = async (tokens: IToken, cookie: string) => {
  const resp = await fetch(
    `https://jwxt.nwpu.edu.cn/course-selection-api/api/v1/student/course-select/${tokens.studentId}/turn/${tokens.turnId}/select`,
    { headers: { Authorization: cookie } },
  );
  if (resp.status !== 200) {
    return "获取基本信息失败，请刷新重试！";
  }
  const res: IResponse<IMetaResp> = await resp.json();
  return res.data;
};
