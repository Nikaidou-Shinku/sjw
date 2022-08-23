import { createSignal, For, onCleanup } from "solid-js";
import { Table, Thead, Tr, Th, Tbody, css, Box } from "@hope-ui/solid";
import { IBaseData, ICourseSummary, INumber } from "../../data/interface";
import { fetchNumber } from "../../utils";
import { CourseLine } from "./CourseLine";

const tableStyles = css({
  "thead > tr": {
    "background-color": "rgba(255, 255, 255, 0.8) !important",
  },
});

interface ISelectedListProps {
  base: IBaseData;
  courses: ICourseSummary[];
  changeCost: (courseId: number, cost: number) => void;
  dropCourse: (courseId: number) => void;
}

export const SelectedList = (props: ISelectedListProps) => {
  const [numList, setNumList] = createSignal<INumber>({});

  const updateNumber = () => fetchNumber(props.courses, props.base.cookie).then((res) => setNumList(res));

  const numTimer = setInterval(updateNumber, 2000);
  onCleanup(() => clearInterval(numTimer));

  return (
    <Box height="100%" overflowY="scroll">
      <Table class={tableStyles()} dense>
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
                numList={numList()}
                changeCost={props.changeCost}
                dropCourse={props.dropCourse}
              />
            )}
          </For>
        </Tbody>
      </Table>
    </Box>
  );
};
