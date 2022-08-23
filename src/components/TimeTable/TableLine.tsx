import { createMemo, For } from "solid-js";
import { Box } from "@hope-ui/solid";
import { IEachLine } from ".";

const colorMap = {
  1: "rgba(0, 255, 0, 0.1)",
  2: "rgba(0, 255, 0, 0.25)",
  3: "rgba(0, 255, 0, 0.1)",
  4: "rgba(0, 255, 0, 0.25)",
  5: "rgba(255, 0, 0, 0.1)",
  6: "rgba(255, 0, 0, 0.25)",
  7: "rgba(0, 0, 255, 0.1)",
  8: "rgba(0, 0, 255, 0.25)",
  9: "rgba(0, 0, 255, 0.1)",
  10: "rgba(0, 0, 255, 0.25)",
  11: "rgba(255, 255, 0, 0.1)",
  12: "rgba(255, 255, 0, 0.25)",
  13: "rgba(255, 255, 0, 0.1)",
};

const parseWeekday = (courses: IEachLine[]) => {
  let res: IEachLine[][] = [];
  for (let i = 0; i < 7; ++ i)
    res.push([]);

  courses.forEach((item) => {
    res[item.schedule.weekday - 1].push(item);
  });

  return res;
};

interface ITableLineProps {
  index: number;
  line: IEachLine[];
}

export const TableLine = (props: ITableLineProps) => {
  const courseWeekday = createMemo(() => parseWeekday(props.line));

  return (
    <tr style={{ "background-color": colorMap[props.index as keyof typeof colorMap] }}>
      <td style={{ "text-align": "center" }}>
        <Box mr="$1">{props.index}</Box>
      </td>
      <For each={courseWeekday()}>
        {(item) => (
          <td>
            <For each={item}>
              {(course) => (
                <Box
                  textAlign="center"
                  border="1px solid rgba(0, 0, 0, 0.5)"
                  backgroundColor="rgba(0, 0, 0, 0.1)"
                >
                  {course.name}
                </Box>
              )}
            </For>
          </td>
        )}
      </For>
    </tr>
  );
};
