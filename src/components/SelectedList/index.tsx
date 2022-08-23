import { For } from "solid-js";
import { Table, Thead, Tr, Th, Tbody, css, Box } from "@hope-ui/solid";
import { ICourseSummary } from "../../data/interface";
import { CourseLine } from "./CourseLine";

interface ISelectedListProps {
  courses: ICourseSummary[];
  numList: {
    [id: number]: number;
  };
  changeCost: (courseId: number, cost: number) => void;
  dropCourse: (courseId: number) => void;
}

const tableStyles = css({
  "thead > tr": {
    "background-color": "rgba(255, 255, 255, 0.8) !important",
  },
});

export const SelectedList = (props: ISelectedListProps) => (
  <Box height="100%" overflowY="scroll">
    <Table class={tableStyles()}>
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
          {(item, i) => (
            <CourseLine
              index={i() + 1}
              course={item}
              numList={props.numList}
              changeCost={props.changeCost}
              dropCourse={props.dropCourse}
            />
          )}
        </For>
      </Tbody>
    </Table>
  </Box>
);
