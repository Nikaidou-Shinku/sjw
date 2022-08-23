import { createMemo, For } from "solid-js";
import { Box, css } from "@hope-ui/solid";
import { ICourseSummary } from "../../data/interface";
import { ISchedule } from "../../data/interface/selected";
import { TableLine } from "./TableLine";

export interface IEachLine {
  name: string;
  schedule: ISchedule;
}

const parseCourses = (courses: ICourseSummary[]): IEachLine[][] => {
  let res: IEachLine[][] = [];
  for (let i = 0; i < 13; ++ i)
    res.push([]);

  courses.forEach((course) => {
    course.schedules.forEach((item) => {
      for (let i = item.startUnit - 1; i < item.endUnit; ++ i) {
        res[i].push({
          name: course.name,
          schedule: item,
        });
      }
    });
  });

  return res;
};

interface ITimeTableProps {
  selected: ICourseSummary[];
}

const tableStyles = css({
  "th": {
    "text-align": "center",
  },
  "thead > tr": {
    color: "black",
    "background-color": "rgba(255, 255, 255, 0.4) !important",
  },
});

export const TimeTable = (props: ITimeTableProps) => {
  const courseUnits = createMemo(() => parseCourses(props.selected));

  return (
    <Box
      flex={1}
      height="100%"
      overflowY="scroll"
    >
      <table class={tableStyles()}>
        <thead>
          <tr>
            <th style={{ width: "2%" }} />
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
            <th>星期六</th>
            <th>星期日</th>
          </tr>
        </thead>
        <tbody>
          <For each={courseUnits()}>
            {(line, i) => <TableLine index={i() + 1} line={line} />}
          </For>
        </tbody>
      </table>
    </Box>
  );
};
