import path from "node:path";
import { defineConfig, PluginOption } from "vite";

const Tampermonkey = (): PluginOption => {
  const headers = `
// ==UserScript==
// @name         Sucking JWXT
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  翱翔教务系统实用脚本
// @author       yurzhang
// @match        https://jwxt.nwpu.edu.cn/course-selection/*
// @icon         https://uis.nwpu.edu.cn/cas/themes/nwpu/favicon.ico
// @grant        unsafeWindow
// ==/UserScript==
  `.trim();

  return {
    name: "tampermonkey-header",
    apply: "build",
    enforce: "post",
    generateBundle: (_options, bundle) => {
      const [, target] = Object.entries(bundle).find(([name]) => name.includes("user.js")) ?? [];
      if (!target || target.type !== "chunk") return;
      target.code = `${headers}\n\n${target.code}`;
    },
  };
};

export default defineConfig({
  plugins: [Tampermonkey()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "userscript",
      fileName: (format) => `sjw.${format}.user.js`,
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
