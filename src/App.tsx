import { createEffect, createMemo, createSignal, For } from "solid-js";
import { Badge, Button, Spinner, Table, Tbody, Th, Thead, Tr } from "@hope-ui/solid";
import { ICourseSummary } from "./data/interface";
import { fetchNumber, fetchSelected, getCookie, getTokens } from "./utils";
import { Empty } from "./components";

const Loading = () => (
  <div
    style={{
      "margin-top": "20px",
      "text-align": "center",
    }}
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="$neutral4"
      color="$info10"
      size="xl"
    />
  </div>
);

export const App = () => {
  const tokens = getTokens();
  if (tokens === null) {
    return (
      <Empty
        title="啊哦…"
        content="获取 Tokens 失败，请检查 URL 或刷新重试！"
      />
    );
  }

  const cookie = getCookie();
  if (cookie === null) {
    return (
      <Empty
        title="啊哦…"
        content="获取 Cookie 失败，请刷新重试！"
      />
    );
  }

  const [selected, setSelected] = createSignal<ICourseSummary[]>([]);
  const [numList, setNumList] = createSignal<{ [id: number]: number }>({});

  fetchSelected(tokens, cookie).then((res) => setSelected(res));
  createEffect(() => fetchNumber(selected(), cookie).then((res) => setNumList(res)));
  setInterval(() => fetchNumber(selected(), cookie).then((res) => setNumList(res)), 2000);

  return (
    <>
      {selected().length === 0 ? <Loading /> : (
        <Table striped="odd" highlightOnHover>
          <Thead>
            <Tr>
              <Th>课程名称</Th>
              <Th>授课教师</Th>
              <Th>选课人数</Th>
              <Th>意愿值</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            <For each={selected()}>
              {(item) => {
                const num = createMemo(() => numList()[item.id]);
                const numColor = createMemo(() => num() > item.maxNum ? "red" : "green");
                const isMorning = item.dateTimePlace.includes("第一节");

                return (
                  <Tr>
                    <Th>
                      <span>{item.name}</span>
                      {isMorning && (
                        <Badge
                          colorScheme="danger"
                          ml="$2"
                        >
                          早八
                        </Badge>
                      )}
                    </Th>
                    <Th>
                      <span>{item.teacher}</span>
                    </Th>
                    <Th>
                      <span style={{ color: numColor() }}>
                        {`${numList()[item.id]} / ${item.maxNum}`}
                      </span>
                    </Th>
                    <Th>
                      <span>{item.cost}</span>
                      <Button size="xs" ml="$2">修改</Button>
                    </Th>
                    <Th>
                      <Button size="xs">退课</Button>
                    </Th>
                  </Tr>
                );
              }}
            </For>
          </Tbody>
        </Table>
      )}
    </>
  );
};
