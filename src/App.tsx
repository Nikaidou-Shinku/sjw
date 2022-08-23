import { createResource, Show } from "solid-js";
import { IBaseData } from "./data/interface";
import { init } from "./utils";
import { Empty, Loading } from "./components";
import { Home } from "./Home";

export const App = () => {
  const [base] = createResource(init);

  return (
    <Show
      when={!base.loading}
      fallback={<Loading />}
    >
      <Show
        when={typeof base() !== "string"}
        fallback={(
          <Empty
            title="啊哦…"
            content={base() as string}
          />
        )}
      >
        <Home base={base() as IBaseData} />
      </Show>
    </Show>
  );
};
