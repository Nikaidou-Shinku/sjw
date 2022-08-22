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
  Th,
  Tr,
} from "@hope-ui/solid";
import { ICourseSummary } from "../data/interface";

interface ICourseLineProps {
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
    <Tr>
      <Th>
        <span>{props.course.name}</span>
        {isOnlineCourse && (
          <Badge
            colorScheme="info"
            ml="$2"
          >
            网课
          </Badge>
        )}
        {isMorning && (
          <Badge
            colorScheme="danger"
            ml="$2"
          >
            早八
          </Badge>
        )}
      </Th>
      <Th><span>{props.course.code}</span></Th>
      <Th><span>{props.course.teacher}</span></Th>
      <Th>
        <span style={{ color: numColor() }}>
          {`${num()} / ${props.course.maxNum}`}
          {isNumOverflow() && ` (+${num() - props.course.maxNum})`}
        </span>
      </Th>
      <Th>
        <span>{props.course.cost}</span>
        {props.course.pinned ? (
          <Badge
            colorScheme="success"
            ml="$2"
          >
            已选中
          </Badge>
        ) : (
          <Popover>
            <PopoverTrigger
              as={Button}
              size="xs"
              ml="$2"
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
                  onInput={(event: any) => setCost(event.target.value)} // 这个 any 摆烂了
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
      </Th>
      <Th>
        <Button
          size="xs"
          onClick={() => props.dropCourse(props.course.id)}
        >
          退课
        </Button>
      </Th>
    </Tr>
  );
};
