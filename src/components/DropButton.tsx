import { Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody } from "@hope-ui/solid";

interface IDropButton {
  id: number;
  pinned: boolean;
  dropCourse: (courseId: number) => void;
}

export const DropButton = (props: IDropButton) => {
  return (
    <Popover>
      <PopoverTrigger
        as={Button}
        size="xs"
        variant="subtle"
        colorScheme={props.pinned ? "danger" : "warning"}
      >
        退课
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <div>
            <span>您真的要退课吗？</span>
            {props.pinned && (
              <>
                <br />
                <span style={{ color: "red" }}>
                  注意：该课程当前为已选中状态！
                </span>
              </>
            )}
          </div>
        </PopoverHeader>
        <PopoverBody>
          <Button
            size="xs"
            onClick={() => props.dropCourse(props.id)}
          >
            确定
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
