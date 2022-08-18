import { createEffect, createSignal } from "solid-js";
import { notificationService } from "@hope-ui/solid";
import { ICourseSummary, IStatus } from "./data/interface";
import { changeCost, fetchNumber, fetchSelected, fetchStatus, getCookie, getTokens } from "./utils";
import { CourseTable, Empty, Loading } from "./components";
import { dropCourse } from "./utils/dropCourse";

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

  const [status, setStatus] = createSignal<IStatus>({
    nowCredit: 0,
    maxCredit: 0,
    nowCost: 0,
    maxCost: 0,
  });
  const [selected, setSelected] = createSignal<ICourseSummary[]>([]);
  const [numList, setNumList] = createSignal<{ [id: number]: number }>({});

  fetchStatus(tokens, cookie).then((res) => setStatus(res));
  fetchSelected(tokens, cookie).then((res) => setSelected(res));
  createEffect(() => fetchNumber(selected(), cookie).then((res) => setNumList(res)));
  setInterval(() => fetchNumber(selected(), cookie).then((res) => setNumList(res)), 2000);

  const funChangeCost = (courseId: number, cost: number) => {
    changeCost(courseId, cost, tokens, cookie).then((res) => {
      if (typeof res === "boolean") {
        notificationService.show({
          status: "success",
          title: "成功",
          description: "修改意愿值成功！",
        });
      } else {
        notificationService.show({
          status: "danger",
          title: "失败",
          description: res,
        });
      }
      fetchStatus(tokens, cookie).then((res) => setStatus(res));
      fetchSelected(tokens, cookie).then((res) => setSelected(res));
    });
  };

  const funDropCourse = (courseId: number) => {
    dropCourse(courseId, tokens, cookie).then((res) => {
      if (typeof res === "boolean") {
        notificationService.show({
          status: "success",
          title: "成功",
          description: "退课成功！",
        });
      } else {
        notificationService.show({
          status: "danger",
          title: "失败",
          description: res,
        });
      }
      fetchStatus(tokens, cookie).then((res) => setStatus(res));
      fetchSelected(tokens, cookie).then((res) => setSelected(res));
    });
  };

  return (
    <>
      {selected().length === 0 ? <Loading /> : (
        <div
          style={{
            height: "80vh",
            "overflow-y": "scroll",
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "10px 0",
              "justify-content": "space-evenly",
            }}
          >
            <span>{`已选学分：${status().nowCredit} / ${status().maxCredit}`}</span>
            <span>{`已用意愿值：${status().nowCost} / ${status().maxCost}`}</span>
          </div>
          <CourseTable
            courses={selected()}
            numList={numList()}
            changeCost={funChangeCost}
            dropCourse={funDropCourse}
          />
        </div>
      )}
    </>
  );
};
