import { render } from "solid-js/web";
import { HopeProvider } from "@hope-ui/solid";
import { App } from "./App";

const main = () => {
  const DOM = unsafeWindow.document.getElementById("selected-lesson");
  if (DOM === null) {
    alert("挂载 DOM 失败，请刷新重试！");
    return;
  }

  const root = unsafeWindow.document.createElement("div");
  DOM.before(root);
  DOM.remove();
  render(() => <HopeProvider><App /></HopeProvider>, root);
};

if (!unsafeWindow.location.href.includes("token="))
  setTimeout(main, 1000);
