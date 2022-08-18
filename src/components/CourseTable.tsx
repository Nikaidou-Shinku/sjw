import { For } from "solid-js";
import { Table, Tbody, Th, Thead, Tr } from "@hope-ui/solid";
import { ICourseSummary } from "../data/interface";
import { CourseLine } from "./CourseLine";

interface ICourseTableProps {
  courses: ICourseSummary[];
  numList: {
    [id: number]: number;
  };
  changeCost: (courseId: number, cost: number) => void;
  dropCourse: (courseId: number) => void;
}

export const CourseTable = (props: ICourseTableProps) => {
  return (
    <Table striped="odd" highlightOnHover>
      <Thead>
        <Tr>
          <Th>课程名称</Th>
          <Th>课程班号</Th>
          <Th>授课教师</Th>
          <Th>选课人数</Th>
          <Th>意愿值</Th>
          <Th>操作</Th>
        </Tr>
      </Thead>
      <Tbody>
        <For each={props.courses}>
          {(item) => (
            <CourseLine
              course={item}
              numList={props.numList}
              changeCost={props.changeCost}
              dropCourse={props.dropCourse}
            />
          )}
        </For>
      </Tbody>
    </Table>
  );
};
