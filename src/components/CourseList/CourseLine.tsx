import { Badge, Td, Tr } from "@hope-ui/solid";
import { createMemo, Show } from "solid-js";
import { ICourse, ICourseSummary, INumber } from "../../data/interface";
import { AddButton, DropButton } from "..";

interface ITeacher {
  id: number;
  nameZh: string;
  nameEn: string | null;
}

const parseTeacher = (teachers: ITeacher[]): string => {
  let res = "";
  teachers.forEach((teacher) => res += `${teacher.nameZh}, `);
  if (teachers.length > 0)
    res = res.substring(0, res.length - 2);
  return res;
};

const getStatus = (course: ICourse, selected: ICourseSummary[]) => {
  const item = selected.find((item) => item.id === course.id);
  if (typeof item === "undefined")
    return "NotSelected";
  if (item.pinned)
    return "Pinned";
  return "Selected";
};

interface ICourseLineProps {
  index: number;
  course: ICourse;
  selected: ICourseSummary[];
  numList: INumber;
  dropCourse: (courseId: number) => void;
  addCourse: (courseId: number, cost: number) => void;
}

export const CourseLine = (props: ICourseLineProps) => {
  const teachers = createMemo(() => parseTeacher(props.course.teachers));
  const num = createMemo(() => props.numList[props.course.id] ?? 0);
  const isNumOverflow = createMemo(() => num() > props.course.limitCount);
  const numColor = createMemo(() => isNumOverflow() ? "red" : "green");

  const isOnlineCourse = props.course.dateTimePlace.textZh === null;
  const isMorning = !isOnlineCourse && props.course.dateTimePlace.textZh.includes("第一节");

  const status = createMemo(() => getStatus(props.course, props.selected));

  return (
    <Tr style={{ "background-color": `rgba(255, 255, 255, ${props.index % 2 == 0 ? "0.75" : "0.33"})` }}>
      <Td>
        <span>{props.course.course.nameZh}</span>
        {isOnlineCourse && (
          <Badge
            colorScheme="info"
            ml="$1"
          >
            网课
          </Badge>
        )}
        {isMorning && (
          <Badge
            colorScheme="danger"
            ml="$1"
          >
            早八
          </Badge>
        )}
      </Td>
      <Td><span>{props.course.code}</span></Td>
      <Td><span>{teachers()}</span></Td>
      <Td>基本信息</Td>
      <Td>
        <span style={{ color: numColor() }}>
          {`${num()} / ${props.course.limitCount}`}
          {isNumOverflow() && ` (+${num() - props.course.limitCount})`}
        </span>
      </Td>
      <Td>
        <Show
          when={status() !== "NotSelected"}
          fallback={(
            <AddButton
              id={props.course.id}
              addCourse={props.addCourse}
            />
          )}
        >
          <DropButton
            id={props.course.id}
            pinned={status() === "Pinned"}
            dropCourse={props.dropCourse}
          />
        </Show>
      </Td>
    </Tr>
  );
};
