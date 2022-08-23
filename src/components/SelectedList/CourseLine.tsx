import { createMemo, createSignal } from "solid-js";
import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Td,
  Tr,
} from "@hope-ui/solid";
import { ICourseSummary } from "../../data/interface";
import { DropButton } from "..";

interface ICourseLineProps {
  index: number;
  course: ICourseSummary;
  numList: { [id: number]: number };
  changeCost: (courseId: number, cost: number) => void;
  dropCourse: (courseId: number) => void;
}

export const CourseLine = (props: ICourseLineProps) => {
  const num = createMemo(() => props.numList[props.course.id] ?? 0);
  const isNumOverflow = createMemo(() => num() > props.course.maxNum);
  const numColor = createMemo(() => isNumOverflow() ? "red" : "green");

  const isOnlineCourse = props.course.dateTimePlace === null;
  const isMorning = !isOnlineCourse && props.course.dateTimePlace.includes("第一节");

  const [cost, setCost] = createSignal(props.course.cost);

  return (
    <Tr style={{ "background-color": `rgba(255, 255, 255, ${props.index % 2 == 0 ? "0.75" : "0.33"})` }}>
      <Td>
        <span>{props.course.name}</span>
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
      <Td><span>{props.course.teacher}</span></Td>
      <Td>
        <span style={{ color: numColor() }}>
          {`${num()} / ${props.course.maxNum}`}
          {isNumOverflow() && ` (+${num() - props.course.maxNum})`}
        </span>
      </Td>
      <Td>
        <span>{props.course.cost}</span>
        {props.course.pinned ? (
          <Badge
            colorScheme="success"
            ml="$1"
          >
            已选中
          </Badge>
        ) : (
          <Popover>
            <PopoverTrigger
              as={Button}
              size="xs"
              ml="$1"
              variant="subtle"
            >
              修改
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                您要修改成多少意愿值呢？
              </PopoverHeader>
              <PopoverBody>
                <Input
                  required
                  size="xs"
                  value={cost()}
                  onInput={(e: any) => setCost(e.target.value)} // 这个 any 摆烂了
                  width="auto"
                />
                <Button
                  size="xs"
                  onClick={() => props.changeCost(props.course.id, cost())}
                  ml="$2"
                >
                  确定
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Td>
      <Td>
        <DropButton
          id={props.course.id}
          pinned={props.course.pinned}
          dropCourse={props.dropCourse}
        />
      </Td>
    </Tr>
  );
};
