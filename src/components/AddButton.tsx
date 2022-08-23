import { createSignal } from "solid-js";
import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Input } from "@hope-ui/solid";

interface IAddButton {
  id: number;
  addCourse: (courseId: number, cost: number) => void;
}

export const AddButton = (props: IAddButton) => {
  const [cost, setCost] = createSignal(0);

  return (
    <Popover>
      <PopoverTrigger
        as={Button}
        size="xs"
        variant="subtle"
      >
        选课
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          您打算使用多少意愿值呢？
        </PopoverHeader>
        <PopoverBody>
          <Input
            required
            size="xs"
            value={cost()}
            onInput={(e: any) => setCost(e.target.value)}
            width="auto"
          />
          <Button
            size="xs"
            onClick={() => props.addCourse(props.id, cost())}
            ml="$2"
          >
            确定
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
