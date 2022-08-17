export const getDOM = () => {
  // @ts-ignore
  let dom: Element = unsafeWindow.document.getElementsByClassName("selected-table-wrap")[0];
  dom = dom.firstChild as HTMLElement;
  dom = dom.children[2];
  dom = dom.firstChild as HTMLElement;
  dom = dom.children[1];

  return dom;
};
