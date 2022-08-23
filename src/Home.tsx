import { createEffect, createSignal, Show } from "solid-js";
import { Container, Flex, Heading, notificationService, Tab, TabList, TabPanel, Tabs } from "@hope-ui/solid";
import { IBaseData, ICourseSummary, INumber, IStatus } from "./data/interface";
import { changeCost, dropCourse, fetchNumber, fetchSelected, fetchStatus } from "./utils";
import { CourseList, CreditAndCost, SelectedList, TimeTable } from "./components";

interface IHomeProps {
  base: IBaseData;
}

export const Home = (props: IHomeProps) => {
  const [status, setStatus] = createSignal<IStatus | null>(null);
  const [selected, setSelected] = createSignal<ICourseSummary[] | null>(null);
  const [numList, setNumList] = createSignal<INumber>({});

  const updateSelectedCourses = () => {
    fetchStatus(props.base.tokens, props.base.cookie).then((res) => setStatus(res));
    fetchSelected(props.base.tokens, props.base.cookie).then((res) => setSelected(res));
  };
  const updateNumber = () => {
    const courses = selected();
    if (courses !== null) {
      fetchNumber(courses, props.base.cookie).then((res) => setNumList(res));
    }
  };

  updateSelectedCourses();
  createEffect(updateNumber);
  setInterval(updateNumber, 2000);

  const funChangeCost = (courseId: number, cost: number) => {
    changeCost(courseId, cost, props.base.tokens, props.base.cookie).then((res) => {
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
      updateSelectedCourses();
    });
  };

  const funDropCourse = (courseId: number) => {
    dropCourse(courseId, props.base.tokens, props.base.cookie).then((res) => {
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
      updateSelectedCourses();
    });
  };

  return (
    <Container
      bg="$whiteAlpha11"
      mt="50px"
      height="calc(100vh - 100px)"
      padding="20px"
    >
      <div style={{ display: "flex", "align-items": "center" }}>
        <Heading fontSize="24px">{props.base.title}</Heading>
        <Show when={status() !== null}>
          <CreditAndCost status={status() as IStatus} />
        </Show>
      </div>
      <Flex mt="$5" height="750px">
        <Show
          when={selected() !== null}
          fallback={<div>正在加载课表……</div>}
        >
          <TimeTable selected={selected() as ICourseSummary[]} />
          <Tabs flex={1} height="100%" alignment="center">
            <TabList>
              <Tab>已选课程</Tab>
              <Tab>全部课程</Tab>
            </TabList>
            <TabPanel height="calc(100% - 41px)" padding={0}>
              <SelectedList
                courses={selected() as ICourseSummary[]}
                numList={numList()}
                changeCost={funChangeCost}
                dropCourse={funDropCourse}
              />
            </TabPanel>
            <TabPanel>
              <CourseList />
            </TabPanel>
          </Tabs>
        </Show>
      </Flex>
    </Container>
  );
};
