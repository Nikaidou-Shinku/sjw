import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { Box, css, Flex, Input, notificationService, Table, Tbody, Th, Thead, Tr } from "@hope-ui/solid";
import { IBaseData, ICourse, ICourseSummary, INumber } from "../../data/interface";
import { fetchCourses, fetchNumber, searchCourse } from "../../utils";
import { CourseLine } from "./CourseLine";

const tableStyles = css({
  "thead > tr": {
    "background-color": "rgba(255, 255, 255, 0.8) !important",
  },
});

interface ICourseListProps {
  base: IBaseData;
  selected: ICourseSummary[];
  dropCourse: (courseId: number) => void;
  addCourse: (courseId: number, cost: number) => void;
}

export const CourseList = (props: ICourseListProps) => {
  const [courses, setCourses] = createSignal<ICourse[] | null>(null);
  const [numList, setNumList] = createSignal<INumber>({});

  const updateNumber = () => {
    const list = courses();
    if (list !== null) {
      fetchNumber(list, props.base.cookie).then((res) => setNumList(res));
    }
  };

  const numTimer = setInterval(updateNumber, 2000);
  onCleanup(() => clearInterval(numTimer));

  const funFetchCourses = (
    courseName: string,
    lessonName: string,
    teacherName: string,
  ) => {
    const res = searchCourse(
      props.base.tokens,
      courseName,
      lessonName,
      teacherName,
    );
    if (typeof res === "string") {
      notificationService.show({
        status: "danger",
        title: "失败",
        description: res,
      });
      setCourses([]);
    } else {
      const idList = res.map((item) => item.id);
      fetchCourses(
        props.base.tokens,
        props.base.cookie,
        props.base.semeId,
        "",
        "",
        "",
        idList,
      ).then((res) => {
        if (typeof res === "string") {
          notificationService.show({
            status: "danger",
            title: "失败",
            description: res,
          });
          setCourses([]);
        } else {
          setCourses(res);
        }
      });
    }
  };

  onMount(() => funFetchCourses("", "", ""));

  const [courseKey, setCourseKey] = createSignal("");
  const [lessonKey, setLessonKey] = createSignal("");
  const [teacherKey, setTeacherKey] = createSignal("");

  const onSearch = () => {
    setCourses(null);
    funFetchCourses(courseKey(), lessonKey(), teacherKey());
  };

  return (
    <Box height="100%" overflowY="scroll">
      <Flex backgroundColor="rgba(255, 255, 255, 0.8)">
        <Input
          size="sm"
          placeholder="课程名或代码"
          value={courseKey()}
          onInput={(e: any) => setCourseKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <Input
          size="sm"
          placeholder="班级代码"
          value={lessonKey()}
          onInput={(e: any) => setLessonKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <Input
          size="sm"
          placeholder="教师姓名"
          value={teacherKey()}
          onInput={(e: any) => setTeacherKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </Flex>
      <Show
        when={courses() !== null}
        fallback={<Box>加载中……</Box>}
      >
        <Table class={tableStyles()} dense>
          <Thead>
            <Tr>
              <Th>课程名称</Th>
              <Th>课程班号</Th>
              <Th>授课教师</Th>
              <Th>基本信息</Th>
              <Th>选课人数</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            <For each={courses()}>
              {(item, i) => (
                <CourseLine
                  index={i() + 1}
                  course={item}
                  selected={props.selected}
                  numList={numList()}
                  dropCourse={props.dropCourse}
                  addCourse={props.addCourse}
                />
              )}
            </For>
          </Tbody>
        </Table>
      </Show>
    </Box>
  );
};
