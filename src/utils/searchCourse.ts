import { ITinyCourse, IToken } from "../data/interface";

// TODO: replace it with Fuse.js
export const searchCourse = (
  tokens: IToken,
  courseName: string,
  lessonName: string,
  teacherName: string,
): ITinyCourse[] | string => {
  const data = localStorage.getItem(`cs-simplestLessons-${tokens.studentId}-${tokens.turnId}`);
  if (data === null) {
    return "从 localStorage 获取课程列表失败";
  }
  const all: ITinyCourse[] = JSON.parse(data);
  const res = all.filter((course) => {
    if (courseName === "" && lessonName === "" && teacherName === "") {
      return true;
    }

    if (courseName !== "") {
      if (course.courseName.includes(courseName))
        return true;
      if (course.courseCode.includes(courseName))
        return true;
    }

    if (lessonName !== "") {
      if (course.lessonName.includes(lessonName))
        return true;
      if (course.lessonCode.includes(lessonName))
        return true;
    }

    if (teacherName !== "") {
      if (course.teacherName.includes(teacherName))
        return true;
    }

    return false;
  });
  return res;
};
