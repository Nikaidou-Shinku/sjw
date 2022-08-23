import { render } from "solid-js/web";
import { HopeProvider, NotificationsProvider } from "@hope-ui/solid";
import { App } from "./App";

const main = () => {
  const DOM = unsafeWindow.document.getElementById("app");
  if (DOM === null) {
    alert("挂载 DOM 失败，请刷新重试！");
    return;
  }

  GM_addStyle("body { background: center/cover url(https://cdn.luogu.com.cn/upload/image_hosting/4xm8x361.png); }");

  const root = unsafeWindow.document.createElement("div");
  DOM.before(root);
  DOM.remove();
  render(() => (
    <HopeProvider>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </HopeProvider>
  ), root);
};

if (!unsafeWindow.location.href.includes("token="))
  main();
